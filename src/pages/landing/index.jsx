import Contact from "./contact";
import AboutSection from "./about";
import ReviewSection from "./review";
import ProductSection from "./product";

function LandingPage() {
  return (
    <>
      <AboutSection />
      <ProductSection />
      <ReviewSection />
      <Contact />
    </>
  );
}

export default LandingPage;
