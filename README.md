# rentflow-calculators

Zero-dependency JavaScript formulas for rental property math: rental yield / cap rate,
cash flow, mortgage payments, cash-on-cash return, NOI, gross rent multiplier, the
"1% rule", rent increase %, prorated rent, late fees, security deposits, rent-to-income,
vacancy rate and operating expense ratio.

Pure functions, no dependencies, works in Node or the browser.

## Install

```bash
npm install rentflow-calculators
```

## Usage

```js
const { rentalYield, cashFlow, mortgagePayment } = require("rentflow-calculators");

rentalYield({ price: 300000, monthlyRent: 1800, annualExpenses: 4000 });
// => { grossYieldPct: 7.2, noi: 17600, netYieldPct: 5.87 }

cashFlow({ monthlyRent: 1800, monthlyExpenses: 300, monthlyMortgagePayment: 1100 });
// => 400

mortgagePayment({ principal: 240000, annualRatePct: 6.5, months: 360 });
// => 1516.96
```

See [`src/index.js`](./src/index.js) for the full list of functions and their inputs —
every function is documented with a one-line JSDoc comment above it.

## Why this exists

These are the same formulas used in the free calculators at
[rentflow.tabserve.com.tr](https://rentflow.tabserve.com.tr) and
[coinsayfasi.github.io/rentflow/calculators](https://coinsayfasi.github.io/rentflow/calculators/),
extracted into a small standalone library in case they're useful to anyone building
their own real-estate tooling.

If you're a landlord looking for an app (not just formulas) to track rent, tenants,
leases, expenses and maintenance — check out
**[RentFlow](https://rentflow.tabserve.com.tr)** (iOS & Android, free to start).

## From the same team

- [awesome-turkiye-gezi](https://github.com/coinsayfasi/awesome-turkiye-gezi) — curated Türkiye travel guides
- [awesome-carry-on-packing](https://github.com/coinsayfasi/awesome-carry-on-packing) — carry-on packing lists for 70+ destinations

## License

MIT
