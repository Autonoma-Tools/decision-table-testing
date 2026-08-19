'use strict';

// Condition 1: weight class. Standard is 20 kg or less, Overweight is above it.
const STANDARD_WEIGHT_LIMIT_KG = 20;

// Condition 2 and 3 collapse into these rate tables.
const DOMESTIC_BASE_RATE = { standard: 8, overweight: 16 };
const INTERNATIONAL_BASE_RATE = { standard: 24, overweight: 50 };

// A premium member ships domestically for free and pays a flat rate abroad,
// which is why weight is a dont-care condition on those two rules.
const PREMIUM_DOMESTIC_RATE = 0;
const PREMIUM_INTERNATIONAL_FLAT_RATE = 18;

const DESTINATIONS = ['domestic', 'international'];
const TIERS = ['free', 'plus', 'premium'];

function weightClassOf(weightKg) {
  return weightKg <= STANDARD_WEIGHT_LIMIT_KG ? 'standard' : 'overweight';
}

/**
 * Shipping cost for one parcel, derived from a three-condition decision table.
 *
 * @param {object} order
 * @param {number} order.weightKg      Parcel weight in kilograms.
 * @param {'domestic'|'international'} order.destination
 * @param {'free'|'plus'|'premium'} order.tier  Membership tier of the sender.
 * @returns {number} Cost in whole currency units.
 */
function calculateShippingCost({ weightKg, destination, tier }) {
  if (typeof weightKg !== 'number' || !Number.isFinite(weightKg)) {
    throw new TypeError('weightKg must be a finite number');
  }
  if (weightKg <= 0) {
    throw new RangeError('weightKg must be greater than 0');
  }
  if (!DESTINATIONS.includes(destination)) {
    throw new RangeError(`destination must be one of: ${DESTINATIONS.join(', ')}`);
  }
  if (!TIERS.includes(tier)) {
    throw new RangeError(`tier must be one of: ${TIERS.join(', ')}`);
  }

  const weightClass = weightClassOf(weightKg);

  if (destination === 'domestic') {
    if (tier === 'premium') {
      return PREMIUM_DOMESTIC_RATE;
    }
    const base = DOMESTIC_BASE_RATE[weightClass];
    return tier === 'plus' ? base / 2 : base;
  }

  // International. The plus discount is domestic only, so plus pays the free rate.
  if (tier === 'premium') {
    return PREMIUM_INTERNATIONAL_FLAT_RATE;
  }
  return INTERNATIONAL_BASE_RATE[weightClass];
}

module.exports = { calculateShippingCost, STANDARD_WEIGHT_LIMIT_KG };
