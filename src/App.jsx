import { useState } from "react";
import Header from "./layout/header";
import HeroSection from "./components/hero";
import AboutSection from "./components/about";
import ProductSection from "./components/products";
import ReviewSection from "./components/review";
import Contact from "./components/contact";
import Footer from "./layout/footer";

import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState(0);

  return (
    <BrowserRouter>
      <Header cart={cart} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <AboutSection />
              <ProductSection changeCart={setCart} />
              <ReviewSection />
              <Contact />
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
