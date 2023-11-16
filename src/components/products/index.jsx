import ProductCard from "./productCard";
import { dummyData } from "../../assets/data";

function ProductSection() {
  return (
    <section
      id="products"
      className="min-h-[60vh] py-16 px-6 max-w-[1120px] mx-auto"
    >
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-semibold">Products</h2>
        <p className="text-lg text-shades-200">Get all you need from here</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-6 mt-10">
        {dummyData.map((product, id) => (
          <ProductCard key={id + product.name} {...product} />
        ))}
      </div>
      <div className="uppercase bg-secondary border border-white text-white hover:bg-white hover:border-secondary hover:text-secondary font-semibold cursor-pointer px-6 pt-2 pb-3 rounded w-fit mx-auto mt-10">
        view more
      </div>
    </section>
  );
}

export default ProductSection;
