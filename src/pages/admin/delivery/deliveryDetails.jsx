import { collection, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../../middleware/firebase";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
function DeliveryDetails({
  firstName,
  lastName,
  phone,
  address,
  delivery_location,
  name,
  quantity,
  discount,
  price,
  status,
  uid,
  id,
  handleOrders,
}) {
  const handleUpdate = async (value) => {
    const q = query(collection(db, "users"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      data.cart = data.cart.map((cart) => {
        if (cart.id === id) {
          return { ...cart, status: value };
        }
        return cart;
      });

      setDoc(doc.ref, { cart: data.cart }, { merge: true })
        .then(() => {
          handleOrders(id, value);
          toast.success("Item has been successfully updated to user cart");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error. try again");
        });
    });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg uppercase">Customer Info</h3>
      <div className="flex justify-between gap-y-3 gap-x-6 flex-wrap">
        <div>
          <p>Name</p>
          {firstName + " " + lastName}
        </div>

        <div>
          <p>Phone</p>
          {phone}
        </div>

        <div>
          <p>Address</p>
          {address}
        </div>

        <div>
          <p>Delivery Location</p>
          {delivery_location}
        </div>
      </div>

      <h3 className="text-lg uppercase">Product Ordered</h3>
      <div className="flex justify-between gap-3">
        <div>
          <p>Name</p>
          {name}
        </div>

        <div className="text-center">
          <p>Quantity</p>
          {quantity}
        </div>

        <div className="text-center">
          <p>Amount Paid</p>
          {(discount ? discount : price) * quantity}
        </div>

        <div className="text-center">
          <p>Status</p>
          {status}
        </div>
      </div>
      {status !== "delivered" ? (
        <select
          onChange={(e) => handleUpdate(e.target.value)}
          className="border p-2 outline-none ml-auto block"
        >
          <option value="" hidden>
            Change status
          </option>
          {status === "pending" && <option value="on-going">On-going</option>}
          <option value="delivered">Delivered</option>
        </select>
      ) : (
        <span className="bg-green-600 block ml-auto text-green-700 bg-opacity-20 w-fit py-2 text-xs px-4 gap-1 rounded-full">
          Delivered
        </span>
      )}
    </div>
  );
}

export default DeliveryDetails;
