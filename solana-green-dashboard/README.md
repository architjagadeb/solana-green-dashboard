# Solana Green Dashboard

An Earth Day themed, single-page dashboard that visualizes Solana's energy and CO2 efficiency compared with Ethereum and Bitcoin.

## Features

- Earth Day UI theme with glassmorphism cards and animated accents
- Key metric cards with animated counters
- Energy comparison chart on logarithmic scale
- CO2 comparison horizontal chart
- Live TPS line chart from Solana RPC (`getRecentPerformanceSamples`)
- Live CO2 savings counter vs Bitcoin (per 1,000,000 transactions)
- Rotating Solana sustainability fun facts

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- [Chart.js CDN](https://cdn.jsdelivr.net/npm/chart.js)

No frameworks, npm packages, or build tools are required.

## Run Locally

1. Open the `solana-green-dashboard` folder.
2. Double-click `index.html` (or open it in any modern browser).

That's it.

## Data Sources

- Solana public RPC endpoint: `https://api.mainnet-beta.solana.com`
- JSON-RPC method: `getRecentPerformanceSamples`
- Static comparison values for energy and CO2 are based on known public sustainability estimates

If the RPC call fails, the app uses fallback mock TPS values so the UI remains functional.

## Project Structure

```text
solana-green-dashboard/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── charts.js
│   └── solana.js
├── assets/
│   └── icons/
│       ├── leaf.svg
│       ├── lightning.svg
│       └── globe.svg
└── README.md
```
