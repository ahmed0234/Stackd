"use client";

import type { ReactNode } from "react";
import type { StackBreadSize } from "./stackSizes";
import { getByoStackPrice } from "@/component/build/buildYourOwnPricing";
import { getStackBreadPrice } from "./stackPricing";

export type StackBreadSizeOption = {
  id: StackBreadSize;
  name: string;
  desc: string;
  length: string;
  price: number;
  icon: (color: string) => ReactNode;
};

function sixInchIcon(color: string) {
  return (
    <svg
      width="60"
      height="30"
      viewBox="0 0 60 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="5"
        width="56"
        height="20"
        rx="10"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      <line
        x1="16"
        y1="5"
        x2="16"
        y2="25"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <line
        x1="30"
        y1="5"
        x2="30"
        y2="25"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <line
        x1="44"
        y1="5"
        x2="44"
        y2="25"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

function footLongIcon(color: string) {
  return (
    <svg
      width="100"
      height="30"
      viewBox="0 0 100 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="5"
        width="96"
        height="20"
        rx="10"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      <line
        x1="20"
        y1="5"
        x2="20"
        y2="25"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <line
        x1="38"
        y1="5"
        x2="38"
        y2="25"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <line
        x1="56"
        y1="5"
        x2="56"
        y2="25"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <line
        x1="74"
        y1="5"
        x2="74"
        y2="25"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

export function createStackBreadSizeOptions(
  getPrice: (size: StackBreadSize) => number,
): StackBreadSizeOption[] {
  return [
    {
      id: "6 Inches",
      name: "6 Inches",
      desc: "Perfect snack size, split in half.",
      length: "6\" / ~15cm",
      price: getPrice("6 Inches"),
      icon: sixInchIcon,
    },
    {
      id: "Foot Long",
      name: "Foot Long",
      desc: "For the big hunger. The legendary 12-inch full size.",
      length: "12\" / ~30cm",
      price: getPrice("Foot Long"),
      icon: footLongIcon,
    },
  ];
}

/** Premade stack size options (menu / size modal). */
export const STACK_BREAD_SIZE_OPTIONS =
  createStackBreadSizeOptions(getStackBreadPrice);

/** Build Your Own stack size options (custom builder). */
export const BYO_BREAD_SIZE_OPTIONS =
  createStackBreadSizeOptions(getByoStackPrice);
