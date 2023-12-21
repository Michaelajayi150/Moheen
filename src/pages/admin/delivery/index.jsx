/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../middleware/firebase";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DeliveryItem from "./deliveryItem";
import DeliveryDetails from "./deliveryDetails";
import Preloader from "../../../components/cart/preloader";

function Delivery() {
  const [carts, setCarts] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const citiesRef = collection(db, "users");

  async function getDoc() {
    const querySnapshot = await getDocs(citiesRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const user = doc.data();
      const carts = user.cart;

      if (carts.length >= 1) {
        carts.forEach((cart) => {
          if (cart.paid) {
            setCarts((prev) => [...prev, { ...cart, uid: user?.uid }]);
          }
        });
      }

      setLoading(false);
    });
  }

  useEffect(() => {
    getDoc();
  }, []);

  const tableHeader = [
    "id",
    "fullname",
    "email",
    "price",
    "status",
    "ellipsis",
  ];

  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-3 mb-6 items-center flex-wrap">
        <h2 className="text-xl font-semibold">Latest Orders</h2>

        <div className="flex gap-2 items-center flex-wrap">
          <input
            placeholder="Search for an address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-1.5 outline-none focus:border-[1.5px] border border-primary rounded"
          />

          <select
            className="p-2 border border-neutral cursor-pointer"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="on-going">Ongoing</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="w-[calc(100vw_-_24px)] xs:w-[calc(100vw_-_48px)] md:w-[calc(100vw_-_312px)] md:max-w-[calc(1120px_-_312px)] mx-auto bg-white shadow-md text-sm text-gray-500 rounded-md">
        <Preloader modal={loading} />
        <div className="flex whitespace-nowrap overflow-x-auto max-h-[60vh] overflow-y-auto [&>*:nth-child(2)]:text-primary-600">
          {tableHeader.map((theads) => (
            <div className={theads === "ellipsis" ? "" : "flex-1"} key={theads}>
              {carts.length >= 1
                ? carts.map(
                    (cart, id) =>
                      cart.status.includes(filter) &&
                      cart?.delivery.address.toLowerCase().match(search) && (
                        <div
                          key={cart.name + id}
                          className="p-4 capitalize border-b-2 border-gray-200"
                        >
                          <DeliveryItem
                            id={theads}
                            cart={cart}
                            popAddress={() => setModal(id)}
                          />
                          {modal === id && (
                            <div className="fixed w-full h-screen top-0 left-0">
                              <div
                                className="absolute w-full h-full bg-black bg-opacity-10 cursor-pointer"
                                onClick={() => setModal(null)}
                              />
                              <div className="absolute bg-white w-1/2 min-w-[280px] xs:min-w-[320px] [max-w-[600px] left-1/4 top-1/4 rounded p-6">
                                <DeliveryDetails
                                  {...cart?.delivery}
                                  {...cart}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )
                  )
                : "No item uploaded yet"}
            </div>
          ))}
        </div>
        <ToastContainer limit={1} />
      </div>
    </div>
  );
}

export default Delivery;
