import { useEffect, useRef, useState } from "react";
import ProductCategory from "../../components/products";
import { categories } from "../../assets/data";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function ProductPage() {
  const sectionRef = useRef(null);
  const location = useLocation();

  // Get a specific query parameter
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search).get("type");
    setFilter(params);
    window.scrollTo({
      top: sectionRef.current.offsetTop,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <>
      <section
        id="products"
        ref={sectionRef}
        className="py-16 px-6 max-w-[1120px] mx-auto space-y-4"
      >
        <select
          className="p-2 border border-neutral cursor-pointer"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option
              selected={filter === category.target}
              value={category.target}
              key={category.name}
            >
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

        <ToastContainer className="text-xs" limit={1} />
      </section>
    </>
  );
}

export default ProductPage;
