import {
  getByoStackStartingPrice,
  getByoWrapPrice,
} from "@/component/build/buildYourOwnPricing";
import type { StackBreadSize } from "./stackSizes";
import { STACK_BREAD_SIZE_IDS } from "./stackSizes";

/** Single source of truth for stack bread pricing (PKR). */
export const STACK_BREAD_PRICES: Record<StackBreadSize, number> = {
  "6 Inches": 549,
  "Foot Long": 999,
};

export function getStackBreadPrice(size: StackBreadSize): number {
  return STACK_BREAD_PRICES[size];
}

export function isStackBreadSize(
  size: string | undefined,
): size is StackBreadSize {
  return (
    size !== undefined &&
    (STACK_BREAD_SIZE_IDS as readonly string[]).includes(size)
  );
}

export function getStackStartingPrice(): number {
  return STACK_BREAD_PRICES["6 Inches"];
}

export function formatStackPrice(price: number): string {
  return `Rs ${price.toLocaleString()}`;
}

export function formatStackPriceFrom(): string {
  return `From ${formatStackPrice(getStackStartingPrice())}`;
}

interface PriceableProduct {
  id: string;
  category: string;
  price: number;
  sizes?: { label: string; price: number; image?: string }[];
}

/** Resolves the unit price stored on a cart line item. */
export function resolveCartItemPrice(
  product: PriceableProduct,
  size?: string,
): number {
  if (size && isStackBreadSize(size) && product.category === "stacks") {
    return getStackBreadPrice(size);
  }

  if (size && product.sizes) {
    const sizeOpt = product.sizes.find((s) => s.label === size);
    if (sizeOpt) return sizeOpt.price;
  }

  return product.price;
}

/** List/card price before size is chosen. */
export function getProductListPrice(product: PriceableProduct): {
  amount: number;
  showFromPrefix: boolean;
} {
  if (product.id === "byo-stack") {
    return { amount: getByoStackStartingPrice(), showFromPrefix: true };
  }
  if (product.id === "byo-wrap") {
    return { amount: getByoWrapPrice(), showFromPrefix: false };
  }
  if (product.category === "stacks") {
    return { amount: getStackStartingPrice(), showFromPrefix: true };
  }
  return { amount: product.price, showFromPrefix: false };
}
