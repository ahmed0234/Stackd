import NewHero from "@/component/hero/NewHero";
import FeaturedShowcase from "@/component/menu/FeaturedShowcase";
import MealDeals from "@/component/menu/MealDeals";
import MenuSection from "@/component/menu/MenuSection";

export default function Page() {
  return (
    <main>
      <NewHero />
      <FeaturedShowcase />
      <MealDeals />
      <MenuSection />
    </main>
  );
}

