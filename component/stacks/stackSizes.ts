import type { CartItem } from "@/store/useCartStore";

export type StackBreadSize = "6 Inches" | "Foot Long";

export const STACK_BREAD_SIZE_IDS: StackBreadSize[] = ["6 Inches", "Foot Long"];

export function isPremadeStackProduct(
  id: string,
  category: string,
): boolean {
  return category === "stacks" && id !== "byo-stack";
}

export function stackCartKey(productId: string, size: StackBreadSize): string {
  return `${productId}::${size}`;
}

export function getPremadeStackCartKeys(productId: string): string[] {
  return [
    ...STACK_BREAD_SIZE_IDS.map((size) => stackCartKey(productId, size)),
    productId,
  ];
}

export function getPremadeStackTotalQuantity(
  cart: Record<string, CartItem>,
  productId: string,
): number {
  return getPremadeStackCartKeys(productId).reduce(
    (sum, key) => sum + (cart[key]?.quantity ?? 0),
    0,
  );
}

export function removeOnePremadeStack(
  cart: Record<string, CartItem>,
  productId: string,
  removeItem: (id: string, size?: string) => void,
): void {
  for (const size of [...STACK_BREAD_SIZE_IDS].reverse()) {
    const key = stackCartKey(productId, size);
    if (cart[key]?.quantity) {
      removeItem(productId, size);
      return;
    }
  }
  if (cart[productId]?.quantity) {
    removeItem(productId);
  }
}
