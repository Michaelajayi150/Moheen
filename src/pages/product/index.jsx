import { useState } from "react";
import ProductCategory from "../../components/products";
import HeroSection from "./hero";
import { categories } from "../../assets/data";

function ProductPage() {
  const [filter, setFilter] = useState("");

  return (
    <>
      <HeroSection />
      <section
        id="products"
        className="py-16 px-6 max-w-[1120px] mx-auto space-y-4"
      >
        <select
          className="p-2 border border-neutral cursor-pointer"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option value={category.target} key={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {categories.map(
          (category, id) =>
            category.target.includes(filter) && (
              <ProductCategory
                key={category.name + id}
                category={category.target}
                name={category.name}
              />
            )
        )}
      </section>
    </>
  );
}

export default ProductPage;
