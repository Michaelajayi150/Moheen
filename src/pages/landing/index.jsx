import Contact from "./contact";
import HeroSection from "./hero";
import AboutSection from "./about";
import ReviewSection from "./review";
import ProductSection from "./product";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <ReviewSection />
      <Contact />
    </>
  );
}

export default LandingPage;
