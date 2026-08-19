'use strict';

const { calculateShippingCost } = require('./shippingCost');

// One case per surviving rule of the reduced decision table. The full table is
// 2 weight classes x 2 destinations x 3 tiers = 12 rules; collapsing the two
// dont-care rules (C5 and C8, where weight does not affect the outcome) leaves 8.
const rules = [
  ['C1', 10, 'domestic', 'free', 8],
  ['C2', 10, 'domestic', 'plus', 4],
  ['C3', 25, 'domestic', 'free', 16],
  ['C4', 25, 'domestic', 'plus', 8],
  ['C5', 30, 'domestic', 'premium', 0],
  ['C6', 10, 'international', 'free', 24],
  ['C7', 25, 'international', 'free', 50],
  ['C8', 15, 'international', 'premium', 18],
];

describe('calculateShippingCost decision table', () => {
  test.each(rules)(
    '%s: %ikg %s %s costs %i',
    (rule, weightKg, destination, tier, expected) => {
      expect(calculateShippingCost({ weightKg, destination, tier })).toBe(expected);
    }
  );
});
