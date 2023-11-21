import Header from "./layout/header";
import Footer from "./layout/footer";
import LandingPage from "./pages/landing";
import ProductPage from "./pages/product";

import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign from "./pages/sign";
import { db } from "./middleware/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import CartPage from "./pages/cart";

export const CartContext = createContext();
export const AuthContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUserID] = useState(null);
  const [option, setOption] = useState("");

  async function getCart(id) {
    const q = query(collection(db, "users"), where("uid", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      setCart(data.cart);
    });
  }

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user_id")) || null;

    if (isUser !== null) {
      setUserID(isUser);
      getCart(isUser.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUser = (value) => {
    localStorage.setItem("user_id", JSON.stringify(value));
    setUserID(value);
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{ user, setUser, option, setOption, cart, setCart }}
      >
        <Header />
        {option && <Sign />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
export default App;
