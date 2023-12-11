import { useContext, useEffect } from "react";
import { AuthContext } from "../../App";
import { Route, Routes, useNavigate } from "react-router-dom";
import UploadProduct from "./upload";
import TotalProduct from "./total-product";
import { Link } from "react-router-dom";

function Admin() {
  const { setUser } = useContext(AuthContext);
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
    <section className="bg-shades-100">
      <div className="py-16 px-3 xs:px-6 max-w-[1120px] mx-auto flex max-md:flex-col-reverse items-start gap-8">
        <div className="w-full space-y-6">
          <Routes>
            <Route path="/" element={<TotalProduct />} />
            <Route path="/upload-product" element={<UploadProduct />} />
            <Route path="/deliveries" element={<>Total Upload</>} />
          </Routes>
        </div>
        <div className="w-full md:max-w-[300px]">
          <div className="bg-white p-4 w-full">
            <h2 className="text-xl font-semibold">Administration</h2>
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/admin">All Products</Link>
              <Link to="/admin/upload-product">Upload Product</Link>
              <Link to="/admin/deliveries">Deliveries</Link>
            </div>
          </div>
          <div
            onClick={() => {
              localStorage.removeItem("user_id");
              setUser(null);
              navigate("/");
            }}
            className="bg-primary hover:bg-secondary duration-300 text-white px-6 pt-1 pb-2 rounded block  text-center w-full sm:w-fit ml-auto mt-3 cursor-pointer"
          >
            Log out
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
