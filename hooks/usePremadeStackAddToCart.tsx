"use client";

import { useState, useCallback, useRef } from "react";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/component/menu/MenuSection";
import StackSizeSelectModal from "@/component/stacks/StackSizeSelectModal";
import {
  isPremadeStackProduct,
  type StackBreadSize,
} from "@/component/stacks/stackSizes";

export type PremadeStackAddedHandler = (
  product: Product,
  size?: StackBreadSize,
) => void;

export function usePremadeStackAddToCart(onAdded?: PremadeStackAddedHandler) {
  const addItem = useCartStore((state) => state.addItem);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const onAddedRef = useRef(onAdded);

  onAddedRef.current = onAdded;

  const closeSizeModal = useCallback(() => {
    setPendingProduct(null);
  }, []);

  const confirmSize = useCallback(
    (size: StackBreadSize) => {
      if (!pendingProduct) return;
      addItem(pendingProduct.id, size);
      onAddedRef.current?.(pendingProduct, size);
      setPendingProduct(null);
    },
    [addItem, pendingProduct],
  );

  const requestAddToCart = useCallback(
    (product: Product) => {
      if (isPremadeStackProduct(product.id, product.category)) {
        setPendingProduct(product);
        return;
      }
      addItem(product.id);
      onAddedRef.current?.(product);
    },
    [addItem],
  );

  const sizeModal = (
    <StackSizeSelectModal
      isOpen={pendingProduct !== null}
      product={pendingProduct}
      onClose={closeSizeModal}
      onSelectSize={confirmSize}
    />
  );

  return {
    requestAddToCart,
    sizeModal,
    isSizeModalOpen: pendingProduct !== null,
  };
}
