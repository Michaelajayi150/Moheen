import Header from "./layout/header";
import Footer from "./layout/footer";
import LandingPage from "./pages/landing";
import ProductPage from "./pages/product";

import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const CartContext = createContext();
export const AuthContext = createContext();

function App() {
  const [cart, setCart] = useState(0);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ setUser, user }}>
        <CartContext.Provider value={{ setCart, cart }}>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductPage />} />
          </Routes>
          <Footer />
        </CartContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
export default App;
