import { Link } from "react-router-dom";
import { backgroundImage } from "../../assets";

function HeroSection() {
  return (
    <section
      className="object-cover bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="min-h-[60vh] md:min-h-[70vh] lg:min-h-[85vh] py-16 px-6 max-w-[1120px] mx-auto flex flex-col gap-4 items-center justify-center text-white text-center">
        <h3 className="text-lg md:text-2xl">ENJOY YOUR SHOPPING WITH US!</h3>
        <h1 className="text-2xl md:text-4xl">SHOPPING AT MOHEEN COLLECTIONS</h1>
        <Link
          to="/products?type="
          className="uppercase bg-primary hover:bg-white hover:text-primary font-semibold cursor-pointer px-6 pt-2 pb-3 rounded"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
