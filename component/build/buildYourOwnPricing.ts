import type { StackBreadSize } from "@/component/stacks/stackSizes";

/** Single source of truth for Build Your Own Stack pricing (PKR). */
export const BYO_STACK_PRICES: Record<StackBreadSize, number> = {
  "6 Inches": 599,
  "Foot Long": 1059,
};

/** Single source of truth for Build Your Own Wrap pricing (PKR). */
export const BYO_WRAP_PRICE = 499;

/** Single source of truth for Stack Your Chips (Build Your Own Lays) pricing (PKR). */
export const BYO_CHIPS_PRICE = 349;

/** Single source of truth for Ready-Made Wrap pricing (PKR). */
export const READY_MADE_WRAP_PRICE = 449;

export function getByoStackPrice(size: StackBreadSize): number {
  return BYO_STACK_PRICES[size];
}

export function getByoStackStartingPrice(): number {
  return BYO_STACK_PRICES["6 Inches"];
}

export function getByoWrapPrice(): number {
  return BYO_WRAP_PRICE;
}

export function getByoChipsPrice(): number {
  return BYO_CHIPS_PRICE;
}

export function getReadyMadeWrapPrice(): number {
  return READY_MADE_WRAP_PRICE;
}

export function formatByoPrice(price: number): string {
  return `Rs ${price.toLocaleString()}`;
}

export function formatByoStackPriceFrom(): string {
  return `From ${formatByoPrice(getByoStackStartingPrice())}`;
}
