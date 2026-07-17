/**
 * rentflow-calculators
 * Zero-dependency rental property math: yield, cash flow, mortgage, ROI and
 * landlord-compliance formulas. Extracted from the calculators used at
 * https://coinsayfasi.github.io/rentflow/calculators/ (built for RentFlow,
 * a rent/tenant/lease management app: https://rentflow.tabserve.com.tr).
 *
 * All functions are pure (no I/O, no state) and take/return plain numbers.
 */

/** Gross & net rental yield (cap rate). */
function rentalYield({ price, monthlyRent, annualExpenses = 0 }) {
  if (!(price > 0) || !(monthlyRent > 0)) throw new Error("price and monthlyRent must be > 0");
  const grossYieldPct = (monthlyRent * 12 / price) * 100;
  const noi = monthlyRent * 12 - annualExpenses;
  const netYieldPct = (noi / price) * 100;
  return { grossYieldPct, noi, netYieldPct };
}

/** Monthly rental cash flow after expenses and mortgage payment. */
function cashFlow({ monthlyRent, monthlyExpenses = 0, monthlyMortgagePayment = 0 }) {
  return monthlyRent - monthlyExpenses - monthlyMortgagePayment;
}

/** Standard amortizing mortgage payment: M = P·r·(1+r)^n / ((1+r)^n − 1). */
function mortgagePayment({ principal, annualRatePct, months }) {
  if (!(principal > 0) || !(months > 0)) throw new Error("principal and months must be > 0");
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

/** Cash-on-cash return: annual pre-tax cash flow / total cash invested. */
function cashOnCashReturnPct({ annualCashFlow, cashInvested }) {
  if (!(cashInvested > 0)) throw new Error("cashInvested must be > 0");
  return (annualCashFlow / cashInvested) * 100;
}

/** Net operating income: annual rent income minus annual operating expenses (excludes debt service). */
function netOperatingIncome({ annualRentIncome, annualOperatingExpenses }) {
  return annualRentIncome - annualOperatingExpenses;
}

/** Gross rent multiplier: price / annual gross rent. Lower = cheaper relative to rent. */
function grossRentMultiplier({ price, annualGrossRent }) {
  if (!(annualGrossRent > 0)) throw new Error("annualGrossRent must be > 0");
  return price / annualGrossRent;
}

/** The "1% rule" screen: is monthly rent >= 1% of purchase price? */
function onePercentRule({ price, monthlyRent }) {
  if (!(price > 0)) throw new Error("price must be > 0");
  const ratioPct = (monthlyRent / price) * 100;
  return { ratioPct, passes: ratioPct >= 1 };
}

/** Percentage change from current to proposed rent, with optional legal cap check. */
function rentIncrease({ currentRent, proposedRent, capPct = null }) {
  if (!(currentRent > 0)) throw new Error("currentRent must be > 0");
  const increasePct = ((proposedRent - currentRent) / currentRent) * 100;
  const withinCap = capPct == null ? null : increasePct <= capPct;
  return { increasePct, withinCap };
}

/** Prorated rent for a partial month (daily rate × days occupied). */
function proratedRent({ monthlyRent, daysInMonth, daysOccupied }) {
  if (!(daysInMonth > 0)) throw new Error("daysInMonth must be > 0");
  return (monthlyRent / daysInMonth) * daysOccupied;
}

/** Late fee as a flat amount or percentage of rent (percentage takes precedence if both given). */
function lateFee({ monthlyRent, flatFee = null, percentOfRent = null }) {
  if (percentOfRent != null) return monthlyRent * (percentOfRent / 100);
  if (flatFee != null) return flatFee;
  throw new Error("provide flatFee or percentOfRent");
}

/** Security deposit as a multiple of monthly rent (e.g. 1.5 = one and a half months). */
function securityDeposit({ monthlyRent, monthsOfRent }) {
  return monthlyRent * monthsOfRent;
}

/** Rent-to-income ratio and the common "3x rent" affordability screen. */
function rentToIncome({ monthlyRent, monthlyGrossIncome }) {
  if (!(monthlyGrossIncome > 0)) throw new Error("monthlyGrossIncome must be > 0");
  const ratioPct = (monthlyRent / monthlyGrossIncome) * 100;
  return { ratioPct, passesThirtyPercentRule: ratioPct <= 30, passesThreeTimesRent: monthlyGrossIncome >= monthlyRent * 3 };
}

/** Vacancy rate over a period, and rent lost to vacancy. */
function vacancyRate({ unitsTotal, unitsVacant, monthlyRentPerUnit = null }) {
  if (!(unitsTotal > 0)) throw new Error("unitsTotal must be > 0");
  const ratePct = (unitsVacant / unitsTotal) * 100;
  const lostMonthlyRent = monthlyRentPerUnit == null ? null : unitsVacant * monthlyRentPerUnit;
  return { ratePct, lostMonthlyRent };
}

/** Operating expense ratio: annual operating expenses / annual gross income. */
function operatingExpenseRatio({ annualOperatingExpenses, annualGrossIncome }) {
  if (!(annualGrossIncome > 0)) throw new Error("annualGrossIncome must be > 0");
  return (annualOperatingExpenses / annualGrossIncome) * 100;
}

module.exports = {
  rentalYield,
  cashFlow,
  mortgagePayment,
  cashOnCashReturnPct,
  netOperatingIncome,
  grossRentMultiplier,
  onePercentRule,
  rentIncrease,
  proratedRent,
  lateFee,
  securityDeposit,
  rentToIncome,
  vacancyRate,
  operatingExpenseRatio,
};
