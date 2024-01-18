import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Delivery from "./delivery";
import UploadProduct from "./upload";
import TotalProduct from "./total-product";
import DeliveryDetails from "./delivery/deliveryDetails";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("moheen-shop-user-id"));

    if (isUser === null) {
      navigate("/");
      return;
    } else {
      if (isUser?.email !== "moheenadmin@gmail.com") {
        navigate("/cart");
        return;
      }
    }
  }, [navigate]);

  return (
    <section className="bg-shades-100 min-h-[65vh]">
      <div className="py-16 px-3 xs:px-6 max-w-[1120px] mx-auto flex max-md:flex-col-reverse items-start gap-8">
        <div className="w-full space-y-6">
          <Routes>
            <Route path="/" element={<TotalProduct />} />
            <Route
              path="/uploadProduct/:type/:id"
              element={<UploadProduct />}
            />
            <Route path="/deliveries" element={<Delivery />} />
            <Route path="/deliveries/view" element={<DeliveryDetails />} />
          </Routes>
        </div>
      </div>
    </section>
  );
}

export default Admin;
