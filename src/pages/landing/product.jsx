import { Link } from "react-router-dom";
import ProductCategory from "../../components/products";

function ProductSection() {
  return (
    <section id="products" className="py-16 px-6 max-w-[1120px] mx-auto">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-semibold">Products</h2>
        <p className="text-lg text-shades-200">Get all you need from here</p>
      </div>

      <ProductCategory category="decoration" name="home decoration" max={4} />

      <Link
        to="/products"
        className="uppercase block bg-secondary border border-white text-white hover:bg-white hover:border-secondary hover:text-secondary font-semibold cursor-pointer px-6 pt-2 pb-3 rounded w-fit mx-auto mt-10"
      >
        view more
      </Link>
    </section>
  );
}

export default ProductSection;
