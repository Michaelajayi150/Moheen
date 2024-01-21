/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../middleware/firebase";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DeliveryItem from "./deliveryItem";
import Preloader from "../../../components/preloader";

function Delivery() {
  const [carts, setCarts] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const cartsRef = query(collection(db, "carts"), where("paid", "==", true));

  async function getDoc() {
    await getDocs(cartsRef)
      .then((res) =>
        res.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const cart = doc.data();
          setCarts((currentCarts) => [...currentCarts, cart]);
        })
      )
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  }

  useEffect(() => {
    getDoc();
  }, []);

  const tableHeader = [
    { name: "Transaction ID", value: "id" },
    { name: "Username", value: "fullname" },
    { name: "Contact Mail", value: "email" },
    { name: "Price (₦)", value: "price" },
    { name: "Status", value: "status" },
    { name: "Action", value: "ellipsis" },
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

      <Preloader modal={loading} />
      {carts.length >= 1 ? (
        <div className="w-full mx-auto bg-white shadow-md text-sm text-gray-500 rounded-md">
          <div className="flex whitespace-nowrap overflow-x-auto max-h-[60vh] overflow-y-auto [&>*:nth-child(2)]:text-primary-600">
            {tableHeader.map((theads) => (
              <div className="flex-1" key={theads.value}>
                <div className="py-3 px-4 border-b-2">{theads.name}</div>
                {carts.map(
                  (cart, id) =>
                    cart.status.includes(filter) &&
                    cart?.delivery?.address?.toLowerCase().match(search) && (
                      <div
                        key={cart.name + id}
                        className="p-4 capitalize border-b-2 border-gray-200"
                      >
                        <DeliveryItem id={theads.value} cart={cart} />
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        "No item ordered"
      )}
      <ToastContainer limit={1} />
    </div>
  );
}

export default Delivery;
