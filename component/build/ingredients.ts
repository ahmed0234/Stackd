export interface BunOption {
  id: string;
  name: string;
  size: "Full" | "Half";
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

export interface BreadOption {
  id: string;
  name: string;
  image6Inch: string;
  imageFootLong: string;
  description: string;
}

export interface ChipsOption {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const CHIPS_OPTIONS: ChipsOption[] = [
  {
    id: "chips-salted",
    name: "Salted Lays Chips",
    image: "/Lays/layspng.webp",
    description: "Crispy, golden-sliced Salted Lays potato chips base.",
  },
];

export const BREADS: BreadOption[] = [
  {
    id: "bread-oregano",
    name: "Oregano Bread",
    image6Inch: "/BuildYourStack/Buns/6inch/OreganoBread.webp",
    imageFootLong: "/BuildYourStack/Buns/1ft/OreganoBread.webp",
    description:
      "Freshly baked classic Oregano bread, herb-crusted outside, soft inside.",
  },
  {
    id: "bread-white",
    name: "White Bread",
    image6Inch: "/BuildYourStack/Buns/6inch/wHITE.webp",
    imageFootLong: "/BuildYourStack/Buns/1ft/WHITE.webp",
    description:
      "Freshly baked classic White bread, soft, fluffy, and toasted to perfection.",
  },
];

export const PROTEINS: ProteinOption[] = [
  {
    id: "protein-chicken-fajita",
    name: "Chicken Fajita",
    image: "/BuildYourStack/Chicken/ChickenFajita.webp",
    description:
      "Sizzling Mexican-style grilled chicken fajita strips with bell peppers and spices.",
  },
  {
    id: "protein-chicken-peri",
    name: "Chicken Peri Peri",
    image: "/BuildYourStack/Chicken/ChickenPeriPeri.webp",
    description:
      "Fiery, tangy peri-peri marinated chicken grilled to smoky perfection.",
  },
  {
    id: "protein-zinger-strips",
    name: "Zinger Strips",
    image: "/BuildYourStack/Chicken/zingerstrips.webp",
    description:
      "Crispy, golden-fried spicy zinger tenders for a perfect crunch.",
  },
  {
    id: "protein-chicken-tikka",
    name: "Chicken Tikka",
    image: "/BuildYourStack/Chicken/ChickenTikka.webp",
    description:
      "Traditional clay-oven style marinated spicy tikka chicken chunks.",
  },
  {
    id: "protein-chicken-mughlai",
    name: "Mughlai Chicken",
    image: "/BuildYourStack/Chicken/Mughlai.webp",
    description:
      "Rich, aromatic Mughlai-style marinated chicken, slow-cooked in traditional spices.",
  },
  {
    id: "protein-chicken-grilled",
    name: "Grilled Chicken",
    image: "/BuildYourStack/Chicken/grillee.webp",
    description:
      "Juicy, tender flame-grilled chicken breast seared to smoky perfection.",
  },
  {
    id: "protein-pepperoni",
    name: "Pepperoni",
    image: "/BuildYourStack/Chicken/pepperoni.webp",
    description:
      "Spicy and savory cured Pepperoni slices, loaded with rich flavor.",
  },
];

export const VEGGIES: VeggieOption[] = [
  {
    id: "veg-lettuce",
    name: "Crisp Lettuce",
    image: "/BuildYourStack/FreshVeggies/Lettuce.webp",
    description: "Cool, shredded iceberg lettuce.",
  },
  {
    id: "veg-tomato",
    name: "Fresh Tomato",
    image: "/BuildYourStack/FreshVeggies/Tomato.webp",
    description: "Juicy, ripe red tomato slices.",
  },
  {
    id: "veg-onion",
    name: "Sweet Onions",
    image: "/BuildYourStack/FreshVeggies/Onions.webp",
    description: "Freshly sliced sharp red onion rings.",
  },
  {
    id: "veg-pickle",
    name: "Dill Pickles",
    image: "/BuildYourStack/FreshVeggies/Pickles.webp",
    description: "Tangy, brined dill pickles.",
  },
  {
    id: "veg-jalapeno",
    name: "Fire Jalapenos",
    image: "/BuildYourStack/FreshVeggies/Jalapeno.webp",
    description: "Sizzling hot, sliced green jalapeños.",
  },
  {
    id: "veg-caramelized",
    name: "Caramelized Onions",
    image: "/BuildYourStack/FreshVeggies/Caramalized.webp",
    description: "Sweet, slow-cooked caramelized onions.",
  },
  {
    id: "veg-olives",
    name: "Black Olives",
    image: "/BuildYourStack/FreshVeggies/Olives.webp",
    description: "Sliced, savory Spanish black olives.",
  },
  {
    id: "veg-corn",
    name: "Sweet Corn",
    image: "/BuildYourStack/FreshVeggies/Corm.webp",
    description: "Sweet, juicy golden corn kernels.",
  },
  {
    id: "veg-capsicum",
    name: "Bell Peppers",
    image: "/BuildYourStack/FreshVeggies/Capcigum.webp",
    description: "Crispy sliced sweet bell peppers.",
  },
];

export const CHEESES: CheeseOption[] = [
  {
    id: "cheese-slices",
    name: "Cheese Slices",
    image: "/BuildYourStack/Cheese/CheseSlices.webp",
    description: "Creamy, rich sliced cheese layer.",
  },
  {
    id: "cheese-nachos",
    name: "Nachos Cheese Sauce",
    image: "/BuildYourStack/Cheese/Nachoscheesesauce.webp",
    description: "Warm, rich, and velvety nachos cheese sauce.",
  },
];


export const SAUCES: SauceOption[] = [
  {
    id: "sauce-bbq",
    name: "Barbecue Sauce",
    image: "/BuildYourStack/Sauces/BBQ.webp",
    intensity: "Mild",
    flavor: "Smoky & Sweet",
    description: "Classic deep-smoked sweet BBQ sauce with molasses notes.",
  },
  {
    id: "sauce-buffalo",
    name: "Buffalo Sauce",
    image: "/BuildYourStack/Sauces/Buffalo.webp",
    intensity: "High",
    flavor: "Tangy & Fiery",
    description:
      "Zesty buffalo pepper sauce with a sharp, buttery heat finish.",
  },
  {
    id: "sauce-chipotle",
    name: "Chipotle Sauce",
    image: "/BuildYourStack/Sauces/Chipotle.webp",
    intensity: "Medium",
    flavor: "Smoked Chili Cream",
    description: "Creamy, smoky chipotle pepper sauce with a warm kick.",
  },
  {
    id: "sauce-mustard",
    name: "Mustard",
    image: "/BuildYourStack/Sauces/Mustard.webp",
    intensity: "Medium",
    flavor: "Sharp & Zesty",
    description: "Classic bold yellow mustard for a pungent tang.",
  },
  {
    id: "sauce-garlic-mayo",
    name: "Garlic Mayo",
    image: "/BuildYourStack/Sauces/GarlicMayo.webp",
    intensity: "Mild",
    flavor: "Garlic Herb Cream",
    description: "Creamy whipped mayonnaise infused with rich roasted garlic.",
  },
  {
    id: "sauce-honey-mustard",
    name: "Honey Mustard",
    image: "/BuildYourStack/Sauces/Honey Mustard.webp",
    intensity: "Mild",
    flavor: "Sweet & Tangy",
    description: "Perfect harmony of sweet honey and mild ground mustard.",
  },
  {
    id: "sauce-ketchup",
    name: "Tomato Ketchup",
    image: "/BuildYourStack/Sauces/Ketchup.webp",
    intensity: "Mild",
    flavor: "Rich Tomato",
    description: "Traditional sweet and tangy tomato ketchup.",
  },

  {
    id: "sauce-thousand",
    name: "Thousand Island",
    image: "/BuildYourStack/Sauces/Thousand.webp",
    intensity: "Mild",
    flavor: "Creamy Pickle Relish",
    description: "Sweet, creamy dressing with minced pickles and secret herbs.",
  },
];
