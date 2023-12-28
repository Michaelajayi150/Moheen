import { NoCart } from "../../assets";
import { AuthContext } from "../../App";
import { db } from "../../middleware/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deliveryTax } from "../../assets/data";
import CartItem from "../../components/cart";
import CartLocation from "../../components/cart/cartLocation";
import { usePaystackPayment } from "react-paystack";
import Preloader from "../../components/cart/preloader";

function CartPage() {
  const [carts, setCarts] = useState([]);
  const [status, setStatus] = useState("pending");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const { cart, user, setUser } = useContext(AuthContext);
  const info =
    JSON.parse(sessionStorage.getItem("moheen-shop-checkout-details")) || null;
  const navigate = useNavigate();

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("moheen-shop-user-id"));

    if (isUser === null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let subtotal = 0;
    let delivery = 0;
    let deliveryDestination = [];

    carts.forEach((item) => {
      const total = item.paid
        ? 0
        : (item?.size
            ? item.sizes[item.size].discount
              ? item.sizes[item.size].discount
              : item.sizes[item.size]?.price
            : item.discount
            ? item.discount
            : item.price) * item.quantity;

      subtotal += total; // set the total amount

      if (item.delivery) {
        // Check if cart details state is the same
        if (!deliveryDestination.includes(item?.delivery?.state)) {
          deliveryTax.forEach((deliverer) => {
            if (
              item?.delivery?.delivery_location === deliverer.state &&
              item?.paid === false
            ) {
              delivery += deliverer.fee;
              deliveryDestination.push(deliverer.state);
            }
          });
        }
      }
    });

    setTotalAmount(subtotal);
    setDeliveryAmount(delivery);
  }, [carts]);

  async function deleteCart(index) {
    setLoading(true);
    let newCarts = Array.from(carts);
    newCarts.splice(index, 1);

    setCarts(newCarts);
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setDoc(doc.ref, { cart: newCarts }, { merge: true })
        .then(() => {
          toast.success("Item has been deleted from cart", {
            containerId: index,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error. try again", { containerId: index });
          setLoading(false);
        });
    });
  }

  async function updateCart(index, name, value) {
    setLoading(true);

    const newCarts = carts.map((cart, id) => {
      if (id === index) {
        return { ...cart, [name]: value };
      }
      return cart;
    });

    const q = query(collection(db, "users"), where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setDoc(doc.ref, { cart: newCarts }, { merge: true })
        .then(() => {
          toast.success(
            name !== "paid"
              ? "Item has been updated from cart"
              : "Your payment have been received, you will be contacted shortly"
          );

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);

          if (name === "paid") {
            toast.success(
              "Your payment have been received, please refresh to update cart"
            );
          } else {
            toast.error("Error. try again");
          }

          setLoading(false);
        });
    });

    setCarts(newCarts);
  }

  useEffect(() => {
    setLoading(true);
    setCarts([]);

    cart.forEach(async (item) => {
      const docRef = doc(db, item.type, item.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCarts((prev) => [...prev, { ...docSnap.data(), ...item }]);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      setLoading(false);
    });
  }, [cart]);

  const paymentKey = import.meta.env.VITE_CLIENT_PAYSTACK_API_KEY;

  const initializePayment = usePaystackPayment({
    publicKey: paymentKey,
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: (totalAmount + deliveryAmount) * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: "NGN",
  });

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    setLoading(true);
    checkoutAll();
  };

  const checkoutAll = async () => {
    const newCarts = carts.map((cart) => {
      if (cart.paid === false) {
        return {
          ...cart,
          paid: true,
          amountPaid:
            (cart.discount ? cart.discount : cart.price) * cart.quantity,
        };
      }
      return cart;
    });

    const q = query(collection(db, "users"), where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setDoc(doc.ref, { cart: newCarts }, { merge: true })
        .then(() => {
          toast.success(
            "Your payment have been received, you will be contacted shortly"
          );

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.success(
            "Your payment have been received, please refresh to update cart"
          );

          setLoading(false);
        });
    });

    setCarts(newCarts);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast.error("User cancelled payment");
  };

  return (
    <section className="bg-shades-100 pt-8 pb-16 xs:py-16 px-3 xs:px-6 space-y-8">
      <div className="max-w-[1120px] mx-auto flex flex-col gap-3">
        <div className="bg-white p-4 xs:p-8 w-full">
          <div className="flex flex-wrap gap-8 justify-between">
            <div>
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="space-y-3 mt-2">
                <div className="flex justify-between items-center gap-4">
                  <h3>Name:</h3>
                  <span>
                    {info?.firstName
                      ? `${info.firstName} ${info.lastName}`
                      : "Not Set"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <div className="space-y-3 mt-2">
                {info?.delivery_location ? (
                  <>
                    {info?.address && `${info.address}, `}
                    <br />
                    {info.delivery_location}, Nigeria
                  </>
                ) : (
                  "Not Set"
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="space-y-3 mt-2">
                <div className="flex justify-between items-center gap-4">
                  <h3>E-mail:</h3>
                  <span className="max-w-[18ch] xs:max-w-full truncate">
                    {info?.email
                      ? info.email
                      : user && user?.email && user?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <h3>Phone:</h3>
                  <span>{info?.phone ? info.phone : "Not Set"}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              localStorage.removeItem("moheen-shop-user-id");
              sessionStorage.removeItem("moheen-shop-checkout-details");
              setUser(null);
              navigate("/");
            }}
            className="bg-red-500 hover:bg-red-700 duration-300 text-white px-6 pt-2 pb-3 rounded block text-center w-full sm:w-fit ml-auto mt-4 cursor-pointer"
          >
            Log out
          </div>
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto flex max-md:flex-col items-start gap-8">
        <div className="w-full space-y-3">
          <div className="flex justify-between gap-3 items-start">
            <h2 className="text-xl font-semibold mb-4">Cart</h2>
            <select
              className="p-2 border border-neutral cursor-pointer"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="on-going">Ongoing</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div className="bg-white relative">
            <Preloader modal={loading} />
            {carts.filter((cart) => cart.status === status).length <= 0 ? (
              <div className="flex max-sm:flex-col items-center gap-6 p-8">
                <div className="w-full">
                  <img src={NoCart} alt="no item" />
                </div>
                <div className="w-full max-sm:text-center">
                  <h2 className="text-2xl sm:text-xl font-semibold">
                    Your Cart is empty
                  </h2>
                  <p className="text-sm text-neutral">Shop today deals</p>
                  <Link
                    to="/products"
                    className="bg-primary hover:bg-secondary duration-300 text-white px-6 pt-1 pb-2 rounded block w-fit mt-6 max-sm:mx-auto"
                  >
                    Get a product
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 pl-4 pr-6 py-4">
                {carts
                  .filter((cart) => cart.status === status)
                  .map((item, id) => (
                    <div
                      key={id}
                      className={
                        id <
                        carts.filter((cart) => cart.status === status).length -
                          1
                          ? "border-b border-shades-200 pb-6"
                          : ""
                      }
                    >
                      <div className="w-full flex max-sm:flex-col md:flex-row sm:items-stretch gap-6 text-gray-400 mb-3">
                        <CartItem
                          item={item}
                          deleteCart={() => deleteCart(id)}
                          updateCart={(name, value) =>
                            updateCart(id, name, value)
                          }
                        />
                      </div>
                      <CartLocation
                        {...item.delivery}
                        status={item?.status}
                        paid={item?.paid}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
          <p className="max-w-lg text-sm mt-6">
            The price and availability of items at Moheen Collections are
            subject to change. The Cart is a temporary place to store a list of
            your items and reflects each item&apos;s most recent price.
            <br />
            <br />
            Do you have a gift card or promotional code? We&apos;ll ask you to
            enter your claim code when it&apos;s time to pay.
          </p>
        </div>

        <div className="w-full md:max-w-[300px] space-y-4">
          <h2 className="text-xl font-semibold">Summary</h2>
          <div className="bg-white p-4 w-full space-y-3">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>₦ {totalAmount.toLocaleString("en-US")}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Estimated Shipping</span>
              <span>
                {deliveryAmount === 0
                  ? "-"
                  : `₦ ${deliveryAmount.toLocaleString("en-US")}`}
              </span>
            </div>

            <div className="flex justify-between items-center border-y border-neutral py-2">
              <span>Total</span>
              <span>
                ₦ {(totalAmount + deliveryAmount).toLocaleString("en-US")}
              </span>
            </div>
          </div>

          <div
            onClick={() => initializePayment(onSuccess, onClose)}
            className="bg-neutral hover:bg-secondary duration-300 text-white px-6 pt-4 pb-5 rounded-full block  text-center w-full cursor-pointer"
          >
            Checkout
          </div>

          <Link
            to="/products?type="
            className="bg-shades-200 hover:bg-secondary duration-300 text-white px-6 pt-4 pb-5 rounded-full block  text-center w-full cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <ToastContainer limit={1} />
    </section>
  );
}

export default CartPage;
