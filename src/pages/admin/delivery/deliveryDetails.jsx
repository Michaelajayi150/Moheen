import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../middleware/firebase";
// import { toast } from "react-toastify";
import { IoMdCalendar, IoMdCard, IoMdPerson } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Preloader from "../../../components/preloader";
import { ToastContainer, toast } from "react-toastify";

/* eslint-disable react/prop-types */
function DeliveryDetails() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get a specific query parameter
  const [transaction, setTransaction] = useState({
    amountPaid: 0,
    delivery: {
      address: "",
      color: "",
      date: new Date(),
      delivery_location: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
    id: "",
    name: "",
    paid: "",
    pid: "",
    quantity: 0,
    size: 0,
    status: "",
    type: "",
    uid: "",
  });

  const getDocumentByTransactionID = async (id) => {
    setLoading(true);

    if (id !== "") {
      const docRef = doc(db, "carts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoading(false);
        setTransaction(docSnap.data());
      } else {
        navigate("/admin");
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search).get("deliveryId");
    getDocumentByTransactionID(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleStatusChange = async (value) => {
    setLoading(true);

    const docRef = doc(db, "carts", transaction.id);
    await updateDoc(docRef, { status: value })
      .then(() => {
        toast.success("Item has been successfully updated to user cart");
        setTransaction((currentTransaction) => ({
          ...currentTransaction,
          status: value,
        }));
      })
      .catch(() => toast.error("Error. try again"));

    setLoading(false);
  };

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var year = new Date().getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Order details</h2>

      <div className="space-y-2 bg-white shadow-xl p-6 rounded-xl">
        <Preloader modal={loading} />
        <div className="flex justify-between items-center border-b-2 pb-5">
          <div className="flex gap-2">
            <IoMdCalendar size="2.5rem" />
            <span className="text-sm">
              <span className="font-semibold">
                {timeConverter(transaction.delivery.date)}
              </span>
              <br />
              <p className="text-shades-200 uppercase max-w-[15ch] truncate">
                #ID {transaction.id}
              </p>
            </span>
          </div>

          {transaction.status !== "delivered" ? (
            <select
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border p-2 outline-none ml-auto block"
            >
              <option value="" hidden>
                Change status
              </option>
              <option value="pending">Pending</option>
              <option value="on-going">On-going</option>

              <option value="delivered">Delivered</option>
            </select>
          ) : (
            <span className="bg-green-600 block ml-auto text-green-700 bg-opacity-20 w-fit py-2 text-xs px-4 gap-1 rounded-full">
              Delivered
            </span>
          )}
        </div>

        <div className="flex justify-between gap-y-3 gap-x-6 flex-wrap py-3 border-b-2 pb-5">
          <div className="flex gap-3">
            <div className="bg-primary bg-opacity-30 w-12 h-12 text-primary rounded-full flex items-center justify-center">
              <IoMdPerson size="2.2rem" />
            </div>
            <div className="text-sm">
              <p className="text-base font-semibold">Customer</p>

              <p>
                {transaction.delivery.firstName +
                  " " +
                  transaction.delivery.lastName}
              </p>
              <p>{transaction.delivery.email}</p>
              <p>{transaction.delivery.phone}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-primary bg-opacity-30 w-12 h-12 text-primary rounded-full flex items-center justify-center">
              <IoMdCard size="2rem" />
            </div>
            <div className="text-sm">
              <p className="text-base font-semibold">Payment</p>

              <p>Type: Paystack</p>
              <p>
                Transaction:{" "}
                <span
                  className={
                    transaction.paid ? "text-green-500" : "text-red-500"
                  }
                >
                  {transaction.paid ? "Successful" : "Not successful"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-primary bg-opacity-30 w-12 h-12 text-primary rounded-full flex items-center justify-center">
              <FiMapPin size="1.8rem" />
            </div>
            <div className="text-sm">
              <p className="text-base font-semibold">Deliver to</p>

              <p>City: {transaction.delivery.delivery_location}</p>
              <p>Address: {transaction.delivery.address}</p>
            </div>
          </div>
        </div>

        <h3 className="text-lg uppercase pb-2 border-b-2">Product Ordered</h3>
        <div className="flex justify-between">
          <div className="flex-1">
            <p className="border-b-2 px-3 pb-2">Product</p>
            <span className="px-3 py-2 block">{transaction.name}</span>
          </div>

          <div className="flex-1">
            <p className="border-b-2 px-3 pb-2">Quantity</p>
            <span className="px-3 py-2 block">{transaction.quantity}</span>
          </div>

          <div className="flex-1">
            <p className="border-b-2 px-3 pb-2">Price Paid</p>
            <span className="px-3 py-2 block">
              ₦ {transaction.amountPaid.toLocaleString("en-US")}
            </span>
          </div>

          <div className="flex-1 capitalize">
            <p className="border-b-2 px-3 pb-2">Status</p>
            <span className="px-3 py-2 block">{transaction.status}</span>
          </div>

          <div className="flex-1">
            <p className="border-b-2 px-3 pb-2">Color</p>
            <p
              className="w-12 h-5 border mt-2 ml-3"
              style={{ backgroundColor: transaction.delivery.color }}
            />
          </div>
        </div>
        <ToastContainer limit={1} />
      </div>
    </>
  );
}

export default DeliveryDetails;
