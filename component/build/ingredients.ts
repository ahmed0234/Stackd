export interface BunOption {
  id: string;
  name: string;
  size: "Full" | "Half";
  type: "White" | "Brown";
  image: string;
  description: string;
}

export interface ProteinOption {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface VeggieOption {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface CheeseOption {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface SauceOption {
  id: string;
  name: string;
  image: string;
  intensity: "Mild" | "Medium" | "High";
  flavor: string;
  description: string;
}

export const BUNS: BunOption[] = [
  {
    id: "bun-full-white",
    name: "12 Inch White  Bun",
    size: "Full",
    type: "White",
    image: "/BuildYourStack/Buns/1ft/WHITE.png",
    description: "Freshly baked classic white wheat loaf, crusty outside, soft inside.",
  },
  {
    id: "bun-full-brown",
    name: "12 Inch Whole Brown Bun",
    size: "Full",
    type: "Brown",
    image: "/BuildYourStack/Buns/1ft/BROWN.png",
    description: "Rich whole wheat artisan bread, toasted to perfection.",
  },
  {
    id: "bun-half-white",
    name: "6 Inch White Bun",
    size: "Half",
    type: "White",
    image: "/BuildYourStack/Buns/6inch/wHITE.png",
    description: "Classic white wheat half-loaf, toasted with garlic butter.",
  },
  {
    id: "bun-half-brown",
    name: "6 Inch Whole Brown Bun",
    size: "Half",
    type: "Brown",
    image: "/BuildYourStack/Buns/6inch/BROWN.png",
    description: "Toasted whole wheat half-loaf, wholesome and delicious.",
  },
];

export const PROTEINS: ProteinOption[] = [
  {
    id: "protein-beef-smash",
    name: "Smashed Beef Strips",
    image: "/BuildYourStack/Beef/BeefTrips.png",
    description: "Tender, seasoned beef strips seared on a screaming hot flat top grill.",
  },
  {
    id: "protein-chicken-grilled",
    name: "Flame Grilled Chicken",
    image: "/BuildYourStack/Chicken/gRILLED.png",
    description: "Succulent, marinated chicken breast chunks grilled over open flames.",
  },
  {
    id: "protein-chicken-smoked",
    name: "Smoked Chicken",
    image: "/BuildYourStack/Chicken/sMOKED CHICKEN.png",
    description: "Slow hardwood smoked chicken breast strips with a deep, savory aroma.",
  },
  {
    id: "protein-chicken-spicy",
    name: "Spicy Crispy Chicken",
    image: "/BuildYourStack/Chicken/sPICY CHICKEN.png",
    description: "Golden, hand-breaded chicken tenders tossed in a spicy rub.",
  },
  {
    id: "protein-tuna",
    name: "Premium Flaked Tuna",
    image: "/BuildYourStack/Beef/Tuna.png",
    description: "Gourmet flaky tuna mix prepared fresh with signature light mayo.",
  },
];

export const VEGGIES: VeggieOption[] = [
  {
    id: "veg-lettuce",
    name: "Crisp Lettuce",
    image: "/BuildYourStack/FreshVeggies/Lettuce.png",
    description: "Cool, shredded iceberg lettuce.",
  },
  {
    id: "veg-tomato",
    name: "Fresh Tomato",
    image: "/BuildYourStack/FreshVeggies/Tomato.png",
    description: "Juicy, ripe red tomato slices.",
  },
  {
    id: "veg-onion",
    name: "Sweet Onions",
    image: "/BuildYourStack/FreshVeggies/Onions.png",
    description: "Freshly sliced sharp red onion rings.",
  },
  {
    id: "veg-pickle",
    name: "Dill Pickles",
    image: "/BuildYourStack/FreshVeggies/Pickles.png",
    description: "Tangy, brined dill pickles.",
  },
  {
    id: "veg-jalapeno",
    name: "Fire Jalapenos",
    image: "/BuildYourStack/FreshVeggies/Jalapeno.png",
    description: "Sizzling hot, sliced green jalapeños.",
  },
  {
    id: "veg-caramelized",
    name: "Caramelized Onions",
    image: "/BuildYourStack/FreshVeggies/Caramalized.png",
    description: "Sweet, slow-cooked caramelized onions.",
  },
  {
    id: "veg-olives",
    name: "Black Olives",
    image: "/BuildYourStack/FreshVeggies/Olives.png",
    description: "Sliced, savory Spanish black olives.",
  },
  {
    id: "veg-corn",
    name: "Sweet Corn",
    image: "/BuildYourStack/FreshVeggies/Corm.png",
    description: "Sweet, juicy golden corn kernels.",
  },
  {
    id: "veg-cabbage",
    name: "Crunchy Cabbage",
    image: "/BuildYourStack/FreshVeggies/Cabbage.png",
    description: "Shredded fresh crunchy cabbage slaw.",
  },
  {
    id: "veg-capsicum",
    name: "Bell Peppers",
    image: "/BuildYourStack/FreshVeggies/Capcigum.png",
    description: "Crispy sliced sweet bell peppers.",
  },
];

export const CHEESES: CheeseOption[] = [
  {
    id: "cheese-cheddar",
    name: "Cheddar Cheese Slices",
    image: "/BuildYourStack/Cheese/CheseSlices.png",
    description: "Creamy, rich sliced cheddar cheese.",
  },
  {
    id: "cheese-shredded",
    name: "Shredded Cheddar",
    image: "/BuildYourStack/Cheese/ShrededCheese.png",
    description: "Melty combination of shredded cheddar and mozzarella.",
  },
];

export const SAUCES: SauceOption[] = [
  {
    id: "sauce-stackd",
    name: "STACKD Special Sauce",
    image: "/BuildYourStack/Sauces/StacdSauce.png",
    intensity: "Mild",
    flavor: "Tangy & Savory Cream",
    description: "Our signature blend of herbs, spices, and premium cream.",
  },
  {
    id: "sauce-garlic",
    name: "Garlic Mayo Sauce",
    image: "/BuildYourStack/Sauces/GarlicSauce.png",
    intensity: "Mild",
    flavor: "Garlic Cream",
    description: "Creamy whipped mayonnaise infused with rich roasted garlic.",
  },
  {
    id: "sauce-smokey",
    name: "Smokey BBQ Mayo",
    image: "/BuildYourStack/Sauces/SmokeyMayo.png",
    intensity: "Medium",
    flavor: "Sweet & Smokey BBQ",
    description: "A perfect blend of sweet hickory BBQ and smokey mayonnaise.",
  },
  {
    id: "sauce-dynamite",
    name: "Dynamite Spicy Sauce",
    image: "/BuildYourStack/Sauces/Dynamitesauce.png",
    intensity: "High",
    flavor: "Fiery Chili Punch",
    description: "Sweet chili combined with spicy pepper spices for a explosive finish.",
  },
];
