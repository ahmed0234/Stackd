export type FriesId = "full-stackd-fries" | "chilli-cheese-fries" | "plain-fries";

/** Single source of truth for Fries pricing (PKR). */
export const FRIES_PRICES: Record<FriesId, number> = {
  "plain-fries": 199,
  "chilli-cheese-fries": 399,
  "full-stackd-fries": 549,
};

export function getFriesPrice(id: FriesId): number {
  return FRIES_PRICES[id];
}
