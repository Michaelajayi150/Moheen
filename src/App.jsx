import Header from "./layout/header";
import Footer from "./layout/footer";
import LandingPage from "./pages/landing";
import ProductPage from "./pages/product";

import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sign from "./pages/sign";
import { db } from "./middleware/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import CartPage from "./pages/cart";
import ScrollToTop from "./components/scrollToTop";
import Admin from "./pages/admin";

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

      if (data.details) {
        if (data.details !== null) {
          sessionStorage.setItem(
            "moheen-shop-checkout-details",
            JSON.stringify(data.details)
          );
        } else {
          sessionStorage.removeItem("moheen-shop-checkout-details");
        }
      } else {
        sessionStorage.removeItem("moheen-shop-checkout-details");
      }
    });
  }

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("moheen-shop-user-id"));

    if (isUser !== null) {
      setUserID(isUser);
      getCart(isUser.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUser = (value) => {
    localStorage.setItem("moheen-shop-user-id", JSON.stringify(value));
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
          <Route
            element={
              <>
                <ScrollToTop />
                <Outlet />
              </>
            }
          >
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductPage />} />
          </Route>
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
export default App;
