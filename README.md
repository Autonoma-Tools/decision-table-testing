# What Is Decision Table Testing? 12 Rules to 8

A shipping-cost function built from a three-condition decision table (weight class, destination, membership tier) and the eight-case parameterised test that checks it, one case per surviving rule after collapsing dont-care conditions.

> Companion code for the Autonoma blog post: **[What Is Decision Table Testing? 12 Rules to 8](https://getautonoma.com/blog/decision-table-testing)**

## Requirements

Node 18 or newer. Jest is the only dependency, and it is a dev dependency.

## Quickstart

```bash
git clone https://github.com/Autonoma-Tools/decision-table-testing.git
cd decision-table-testing
npm install --save-dev jest
npx jest
```

You should see one test suite pass with 8 passing tests, one per surviving rule of the reduced decision table.

## What the table encodes

Three conditions drive the price. Weight class is Standard at 20 kg or less and Overweight above that. Destination is either domestic or international. Membership tier is free, plus, or premium.

Domestic parcels cost 8 at Standard weight and 16 at Overweight. International parcels cost 24 at Standard weight and 50 at Overweight. A free member pays those rates unchanged. A plus member takes 50 percent off, but only domestically, so internationally a plus member pays exactly what a free member pays. A premium member ships domestically for nothing and pays a flat 18 internationally no matter what the parcel weighs.

Two weight classes times two destinations times three tiers is 12 rules. Four pairs of those rules merge, because in each pair one condition cannot change the outcome, and the merged condition is marked as a dont-care. Weight is the dont-care condition twice: a premium member pays 0 domestically and a flat 18 internationally at any parcel weight. Tier is the dont-care condition twice: the plus discount is domestic only, so on an international parcel a plus member pays exactly the free rate. Four merged rules plus the four domestic free and plus rules that carry over untouched leaves 8 surviving rules. The test file has one case for each, labelled C1 through C8 in table order, where C1 through C4 are the carried-over rules and C5 through C8 are the merged ones.

## Project structure

```
decision-table-testing/
├── README.md
├── LICENSE
├── package.json
└── src/
    ├── shippingCost.js
    └── shippingCost.test.js
```

`src/shippingCost.js` holds the function under test and has no runtime dependencies. `src/shippingCost.test.js` holds the parameterised Jest suite.

## A note on boundaries

No test case in this repo uses a weight of exactly 20 kg. The boundary between Standard and Overweight is a boundary-value concern, not a decision-table one, and mixing the two techniques in one suite hides which technique found which bug. Decision table testing covers the combinations of conditions; boundary value analysis covers the edges of each condition's range.

## About

This repository is maintained by [Autonoma](https://getautonoma.com) as reference material for the linked blog post. Autonoma builds autonomous AI agents that plan, execute, and maintain end-to-end tests directly from your codebase.

If something here is wrong, out of date, or unclear, please [open an issue](https://github.com/Autonoma-Tools/decision-table-testing/issues/new).

## License

Released under the [MIT License](./LICENSE), copyright 2026 Autonoma Labs.
