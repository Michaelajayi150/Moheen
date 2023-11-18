import { useState } from "react";
import ProductCategory from "../../components/products";
import HeroSection from "./hero";

function ProductPage() {
  const [filter, setFilter] = useState("");

  const categories = [
    { name: "Home Decoration", target: "decoration" },
    { name: "Toilet Accessories", target: "toiletries" },
    { name: "Towels", target: "towels" },
    { name: "Beddings and accessories", target: "bedding" },
  ];

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
