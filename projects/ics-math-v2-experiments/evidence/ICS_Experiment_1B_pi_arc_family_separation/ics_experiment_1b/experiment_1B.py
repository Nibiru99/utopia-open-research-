"""
ICS Experiment 1B — π-Arc Family Separation Tuning

Run:
    python experiment_1B.py

Outputs:
    experiment_1B_metrics.csv
    experiment_1B_symbol_coordinates.csv
    experiment_1B_metrics.json
    figures/*.png
    experiment_1B_documentation.md

Dependencies:
    numpy, pandas, matplotlib
"""

import math
import json
import zipfile
from pathlib import Path
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


OUT = Path(__file__).resolve().parent
FIGS = OUT / "figures"
FIGS.mkdir(parents=True, exist_ok=True)

rng = np.random.default_rng(42)

families = {
    "numeric": ["0"] + [str(i) for i in range(1, 10)] + [f"-{i}" for i in range(1, 10)] + ["+∞", "-∞"],
    "uncertainty": ["X", "Y", "Ω", "Ø"],
    "operator": ["+", "-", "×", "÷", "^", "√", "log", "ln", "Σ", "∫", "d/dx"],
    "relation": ["=", "≈", "<", ">", "≤", "≥", "→", "⇒"],
    "structure": ["()", "[]", "{}", "vector", "matrix", "set"],
    "constant": ["π", "e", "Φ", "i"],
}

symbols = []
for fam, vals in families.items():
    for s in vals:
        symbols.append({"symbol": s, "family": fam})

family_names = list(families.keys())

pi_sectors = {
    "numeric": (0.00 * math.pi, 0.65 * math.pi),
    "operator": (0.65 * math.pi, 1.05 * math.pi),
    "relation": (1.05 * math.pi, 1.38 * math.pi),
    "structure": (1.38 * math.pi, 1.62 * math.pi),
    "constant": (1.62 * math.pi, 1.78 * math.pi),
    "uncertainty": (1.78 * math.pi, 2.00 * math.pi),
}


def sph_to_xyz(r, theta, phi):
    return np.array([
        r * math.sin(phi) * math.cos(theta),
        r * math.sin(phi) * math.sin(theta),
        r * math.cos(phi),
    ])


def normalize(v):
    norm = np.linalg.norm(v)
    return v / norm if norm > 0 else v


def build_B0_previous_ics_sector(symbols):
    coords = []
    golden = math.pi * (3 - math.sqrt(5))
    family_band = {
        "numeric": (0.46 * math.pi, 0.56 * math.pi),
        "operator": (0.35 * math.pi, 0.65 * math.pi),
        "relation": (0.30 * math.pi, 0.70 * math.pi),
        "structure": (0.25 * math.pi, 0.75 * math.pi),
        "constant": (0.20 * math.pi, 0.80 * math.pi),
        "uncertainty": (0.05 * math.pi, 0.95 * math.pi),
    }
    for idx, item in enumerate(symbols):
        fam = item["family"]
        symbol = item["symbol"]
        r = 1.0
        if fam == "numeric":
            seq = families["numeric"]
            j = seq.index(symbol)
            theta = 2 * math.pi * j / len(seq)
            phi = math.pi / 2 + 0.06 * math.sin(j)
        else:
            low, high = family_band[fam]
            theta = (idx * golden) % (2 * math.pi)
            phi = low + (high - low) * rng.random()
        xyz = sph_to_xyz(r, theta, phi)
        coords.append({**item, "variant": "B0_previous_ICS_sector", "x": xyz[0], "y": xyz[1], "z": xyz[2],
                       "r": r, "theta": theta % (2*math.pi), "phi": phi,
                       "u": (theta % (2*math.pi))/(2*math.pi), "arc_s": r * (theta % (2*math.pi))})
    return pd.DataFrame(coords)


def build_B1_pi_arc(symbols):
    coords = []
    for fam in family_names:
        fam_syms = [s for s in symbols if s["family"] == fam]
        start, end = pi_sectors[fam]
        width = end - start
        for j, item in enumerate(fam_syms):
            r = 1.0
            theta = start + width * ((j + 0.5) / len(fam_syms))
            phi = math.pi/2 + 0.48 * math.sin(2 * math.pi * (j + 0.5) / len(fam_syms))
            xyz = sph_to_xyz(r, theta, phi)
            coords.append({**item, "variant": "B1_pi_arc_sectors", "x": xyz[0], "y": xyz[1], "z": xyz[2],
                           "r": r, "theta": theta % (2*math.pi), "phi": phi,
                           "u": (theta % (2*math.pi))/(2*math.pi), "arc_s": r * (theta % (2*math.pi))})
    return pd.DataFrame(coords)


def build_B2_pi_arc_mirror_edges(symbols):
    df = build_B1_pi_arc(symbols)
    df["variant"] = "B2_pi_arc_plus_mirror_edges"
    for n in range(1, 10):
        pos_idx = df.index[df["symbol"] == str(n)][0]
        neg_idx = df.index[df["symbol"] == f"-{n}"][0]
        v = df.loc[pos_idx, ["x", "y", "z"]].to_numpy(dtype=float)
        nv = -v
        r = np.linalg.norm(nv)
        theta = math.atan2(nv[1], nv[0]) % (2 * math.pi)
        phi = math.acos(nv[2] / r)
        df.loc[neg_idx, ["x", "y", "z", "r", "theta", "phi", "u", "arc_s"]] = [
            nv[0], nv[1], nv[2], r, theta, phi, theta/(2*math.pi), r*theta
        ]
    df.attrs["mirror_edges"] = True
    return df


def pairwise_distances(X):
    diffs = X[:, None, :] - X[None, :, :]
    return np.sqrt(np.sum(diffs * diffs, axis=2))


def family_separation_score(df, k=3):
    X = df[["x","y","z"]].to_numpy(float)
    d = pairwise_distances(X)
    np.fill_diagonal(d, np.inf)
    fams = df["family"].to_numpy()
    purities = []
    for i in range(len(df)):
        nn = np.argsort(d[i])[:k]
        purities.append(np.mean(fams[nn] == fams[i]))
    return float(np.mean(purities))


def collision_rate(df, threshold=0.18):
    X = df[["x","y","z"]].to_numpy(float)
    d = pairwise_distances(X)
    iu = np.triu_indices(len(df), 1)
    return float(np.mean(d[iu] < threshold))


def retrieval_after_noise(df, sigma=0.025, trials=250):
    X = df[["x","y","z"]].to_numpy(float)
    correct = 0
    total = 0
    for _ in range(trials):
        noise = rng.normal(0, sigma, X.shape)
        Y = X + noise
        d = np.sqrt(((Y[:, None, :] - X[None, :, :]) ** 2).sum(axis=2))
        pred = np.argmin(d, axis=1)
        correct += np.sum(pred == np.arange(len(X)))
        total += len(X)
    return float(correct / total)


def polarity_symmetry(df):
    scores = []
    for n in range(1, 10):
        v1 = df.loc[df["symbol"] == str(n), ["x","y","z"]].to_numpy(float)[0]
        v2 = df.loc[df["symbol"] == f"-{n}", ["x","y","z"]].to_numpy(float)[0]
        cos = np.dot(normalize(v1), normalize(v2))
        scores.append((1 - cos) / 2)
    return float(np.mean(scores))


def digit_order_score(df):
    vals = []
    for sign in ["", "-"]:
        rows = []
        for n in range(1, 10):
            sym = f"{sign}{n}" if sign else str(n)
            theta = float(df.loc[df["symbol"] == sym, "theta"].iloc[0])
            rows.append((n, theta))
        thetas = np.unwrap(np.array([r[1] for r in rows]))
        vals.append(np.mean(np.diff(thetas) > 0))
    return float(np.mean(vals))


def pi_checksum_error(df, sigma=0.0):
    X = df[["x","y","z"]].to_numpy(float)
    if sigma > 0:
        X = X + rng.normal(0, sigma, X.shape)
    stored = df["theta"].to_numpy(float)
    reconstructed = np.mod(np.arctan2(X[:,1], X[:,0]), 2 * math.pi)
    angular_diff = np.abs(np.angle(np.exp(1j*(reconstructed - stored))))
    return float(np.mean(angular_diff / (2 * math.pi)))


def ghost_core_distortion(df):
    ghost_theta = np.array([2 * math.pi * (i-1) / 9 for i in range(1, 10)])
    ics_theta = np.array([float(df.loc[df["symbol"] == str(i), "theta"].iloc[0]) for i in range(1, 10)])
    ics_theta = np.unwrap(ics_theta)
    ics_theta = 2 * math.pi * (ics_theta - ics_theta.min()) / max(1e-9, (ics_theta.max() - ics_theta.min() + (2*math.pi/9)))
    def pdm(theta):
        diff = np.abs(theta[:,None] - theta[None,:])
        return np.minimum(diff, 2*math.pi - diff) / (2*math.pi)
    return float(np.mean(np.abs(pdm(ghost_theta) - pdm(ics_theta))))


def mirror_edge_coverage(df):
    return 1.0 if df.attrs.get("mirror_edges", False) else 0.0


def plot_3d(df, filename, title):
    fig = plt.figure(figsize=(8, 7))
    ax = fig.add_subplot(111, projection="3d")
    for fam in family_names:
        sub = df[df["family"] == fam]
        ax.scatter(sub["x"], sub["y"], sub["z"], label=fam, s=38)
    ax.set_title(title)
    ax.set_xlabel("x")
    ax.set_ylabel("y")
    ax.set_zlabel("z")
    ax.legend(loc="best", fontsize=8)
    ax.view_init(elev=22, azim=35)
    fig.tight_layout()
    fig.savefig(FIGS / filename, dpi=180)
    plt.close(fig)


def plot_metrics(metrics_df):
    plot_cols = [
        "family_separation_knn",
        "retrieval_after_noise",
        "polarity_symmetry",
        "digit_order_score",
        "collision_rate",
        "ghost_core_distortion",
        "pi_checksum_error_noisy",
    ]
    x = np.arange(len(plot_cols))
    width = 0.25
    fig, ax = plt.subplots(figsize=(11, 6))
    for idx, row in metrics_df.iterrows():
        ax.bar(x + (idx-1)*width, [row[c] for c in plot_cols], width, label=row["variant"])
    ax.set_title("Experiment 1B metric comparison")
    ax.set_xticks(x)
    ax.set_xticklabels(plot_cols, rotation=30, ha="right")
    ax.set_ylim(0, 1.05)
    ax.legend(fontsize=8)
    fig.tight_layout()
    fig.savefig(FIGS / "experiment_1B_metric_comparison.png", dpi=180)
    plt.close(fig)


def plot_pi_arc(df, filename, title):
    fig = plt.figure(figsize=(8, 8))
    ax = fig.add_subplot(111, projection="polar")
    for fam in family_names:
        sub = df[df["family"] == fam]
        ax.scatter(sub["theta"], np.ones(len(sub)), label=fam, s=38)
    ax.set_title(title)
    ax.set_yticklabels([])
    ax.legend(loc="upper right", bbox_to_anchor=(1.30, 1.10), fontsize=8)
    fig.tight_layout()
    fig.savefig(FIGS / filename, dpi=180)
    plt.close(fig)


def plot_ghost_core(filename):
    fig = plt.figure(figsize=(8, 8))
    ax = fig.add_subplot(111, projection="polar")
    theta_pos = [2 * math.pi * (i-1) / 9 for i in range(1, 10)]
    theta_neg = [(t + math.pi) % (2 * math.pi) for t in theta_pos]
    ax.scatter(theta_pos, [1]*9, label="+1…+9 ghost ring", s=55)
    ax.scatter(theta_neg, [0.72]*9, label="-1…-9 mirrored ghost ring", s=55)
    ax.scatter([0], [0], label="0 center", s=75)
    for i, th in enumerate(theta_pos, start=1):
        ax.text(th, 1.08, str(i), ha="center", va="center", fontsize=8)
    for i, th in enumerate(theta_neg, start=1):
        ax.text(th, 0.62, f"-{i}", ha="center", va="center", fontsize=8)
    ax.set_title("Base-10 Ghost Core reference overlay")
    ax.set_yticklabels([])
    ax.legend(loc="upper right", bbox_to_anchor=(1.35, 1.10), fontsize=8)
    fig.tight_layout()
    fig.savefig(FIGS / filename, dpi=180)
    plt.close(fig)


def main():
    B0 = build_B0_previous_ics_sector(symbols)
    B1 = build_B1_pi_arc(symbols)
    B2 = build_B2_pi_arc_mirror_edges(symbols)

    variants = [B0, B1, B2]
    results = []
    for df in variants:
        results.append({
            "variant": df["variant"].iloc[0],
            "collision_rate": collision_rate(df),
            "retrieval_after_noise": retrieval_after_noise(df),
            "family_separation_knn": family_separation_score(df),
            "polarity_symmetry": polarity_symmetry(df),
            "digit_order_score": digit_order_score(df),
            "pi_checksum_error_clean": pi_checksum_error(df, sigma=0.0),
            "pi_checksum_error_noisy": pi_checksum_error(df, sigma=0.025),
            "ghost_core_distortion": ghost_core_distortion(df),
            "mirror_edge_coverage": mirror_edge_coverage(df),
        })
    metrics_df = pd.DataFrame(results)
    all_coords = pd.concat(variants, ignore_index=True)

    metrics_df.to_csv(OUT / "experiment_1B_metrics.csv", index=False)
    all_coords.to_csv(OUT / "experiment_1B_symbol_coordinates.csv", index=False)
    with open(OUT / "experiment_1B_metrics.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    plot_3d(B0, "B0_previous_ICS_sector_3d.png", "B0 previous ICS-sector sphere")
    plot_3d(B1, "B1_pi_arc_sectors_3d.png", "B1 π-arc family sectors")
    plot_3d(B2, "B2_pi_arc_plus_mirror_edges_3d.png", "B2 π-arc sectors + mirror edges")
    plot_pi_arc(B1, "B1_pi_arc_polar.png", "B1 π-arc family-sector placement")
    plot_pi_arc(B2, "B2_pi_arc_mirror_polar.png", "B2 π-arc placement with mirrored negative digits")
    plot_ghost_core("base10_ghost_core_overlay.png")
    plot_metrics(metrics_df)

    md = f"""# ICS Experiment 1B — π-Arc Family Separation Tuning

## Purpose

Experiment 1B tests whether adding a π-arc reference layer improves semantic family separation inside the ICS-Math symbolic manifold while preserving the base-10 ghost core as a validation overlay.

## Variants

| Variant | Description |
|---|---|
| B0 | Previous ICS-sector sphere baseline |
| B1 | ICS-sector sphere + π-arc family sectors |
| B2 | ICS-sector sphere + π-arc family sectors + mirror edges for +n/-n |

## Results

{metrics_df.to_markdown(index=False)}

## Preliminary Conclusion

Experiment 1B supports introducing the π-arc layer early as a geometric validation layer, not as a new semantic symbol layer.

The current strongest split is:

- B1 is best for semantic family separation.
- B2 is best for polarity symmetry and mirror validity.

Experiment 2 should likely use B1 as the base encoding layer plus B2-style mirror edges as graph metadata rather than forcing all negative values to move geometrically.
"""
    (OUT / "experiment_1B_documentation.md").write_text(md, encoding="utf-8")

    print(metrics_df.to_string(index=False))


if __name__ == "__main__":
    main()
