'use strict';

const { calculateShippingCost } = require('./shippingCost');

// One case per surviving rule of the reduced decision table. The full table is
// 2 weight classes x 2 destinations x 3 tiers = 12 rules. Four pairs of those
// rules merge, because in each pair one condition cannot change the outcome, so
// 8 rules survive.
//
// Weight is the dont-care condition where a premium member pays the same at any
// parcel weight: rules 3 and 9 merge into C5, rules 6 and 12 merge into C8.
//
// Tier is the dont-care condition on international parcels, where the
// domestic-only plus discount does not apply and a plus member pays the free
// rate: rules 4 and 5 merge into C6, rules 10 and 11 merge into C7.
//
// C1 through C4 are the four rules that carry over untouched (rules 1, 2, 7, 8).
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
