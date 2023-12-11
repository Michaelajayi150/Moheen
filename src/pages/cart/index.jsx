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
import { toast } from "react-toastify";
import { deliveryTax } from "../../assets/data";

function CartPage() {
  const [carts, setCarts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [deleted, setDelete] = useState(null);
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
            if (item?.delivery?.state === deliverer.state) {
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
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error. try again", { containerId: index });
        });
    });
  }

  async function updateCart(index, name, value) {
    const newCarts = carts.map((cart, id) => {
      if (id === index) {
        return { ...cart, [name]: parseInt(value) };
      }
      return cart;
    });

    setCarts(newCarts);
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setDoc(doc.ref, { cart: newCarts }, { merge: true })
        .then(() => {
          toast.success("Item has been deleted from cart");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error. try again");
        });
    });
  }

  useEffect(() => {
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
    });
  }, [cart]);

  return (
    <section className="bg-shades-100 pt-8 pb-16 xs:py-16 px-3 xs:px-6 space-y-8">
      <div className="max-w-[1120px] mx-auto flex flex-col gap-3">
        <div className="bg-white p-4 xs:p-8 w-full flex flex-wrap gap-8 justify-between">
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
              {info?.state ? (
                <>
                  {`${info.address}${info?.city && `, ${info.city}`}`}
                  <br />
                  {`${info.state}, Nigeria`}
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
                  {info?.email ? info.email : "Not Set"}
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
          className="bg-red-500 hover:bg-red-700 duration-300 text-white px-6 pt-3 pb-4 rounded block  text-center w-full sm:w-fit ml-auto mt-3 cursor-pointer"
        >
          Log out
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto flex max-md:flex-col items-start gap-8">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Cart</h2>
          <div className="bg-white">
            {carts.length <= 0 ? (
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
                {carts.map((item, id) => (
                  <div
                    key={id}
                    className={`w-full flex max-sm:flex-col md:flex-row sm:items-stretch gap-6 ${
                      id < carts.length - 1
                        ? "border-b border-shades-200 pb-6"
                        : ""
                    } text-gray-400`}
                  >
                    <div className="sm:max-w-[200px] max-h-[250px] overflow-hidden">
                      <img
                        className="w-full object-bottom h-full"
                        src={item.image}
                        alt={`${item.name} from Moheen Store`}
                      />
                    </div>
                    <div className="w-full">
                      <div className="text-black flex items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold capitalize">
                          {item.name}
                        </h3>

                        <p className="text-sm text-neutral">
                          ₦{" "}
                          {item?.size
                            ? (item.sizes[item.size]?.discount
                                ? item.sizes[item.size]?.discount *
                                  item.quantity
                                : item.sizes[item.size]?.price * item.quantity
                              ).toLocaleString("en-US")
                            : (item.discount
                                ? item.discount * item.quantity
                                : item.price * item.quantity
                              ).toLocaleString("en-US")}
                        </p>
                      </div>

                      <div className="relative pb-1">
                        <h4 className="capitalize">{item.type}</h4>
                        {item.tags.map((tag, id) => (
                          <span key={tag + id}>
                            {tag}
                            {id < item.tags.length - 1 && "/"}
                          </span>
                        ))}
                        <p className="text-sm">{item.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.sizes && (
                          <div className="flex items-center gap-2">
                            <label htmlFor={`size_${id}`}>Size</label>
                            <select
                              id={`size_${id}`}
                              onChange={(e) =>
                                updateCart(id, "size", e.target.value)
                              }
                              className="pl-2 py-1 text-center"
                            >
                              {item.sizes.map((option, i) => (
                                <option
                                  key={option.size}
                                  selected={i === item.size}
                                  value={i}
                                >
                                  {option.size}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <label htmlFor={`quantity_${id}`}>Quantity</label>
                          <select
                            id={`quantity_${id}`}
                            onChange={(e) =>
                              updateCart(id, "quantity", e.target.value)
                            }
                            value={item.quantity}
                            className="pl-2 py-1 text-center"
                          >
                            {new Array(10).fill().map((_, i) => (
                              <option key={`${id} ${i}`} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {!item.paid && (
                        <>
                          <p
                            onClick={() => setDelete(id)}
                            className="pt-3 w-fit text-sm underline underline-offset-[6px] cursor-pointer"
                          >
                            Remove
                          </p>
                          {deleted === id && (
                            <p className="text-sm pt-3">
                              Do you really want to delete?{" "}
                              <span
                                className="text-red-500 cursor-pointer underline underline-offset-[6px]"
                                onClick={() => deleteCart(id)}
                              >
                                yes
                              </span>{" "}
                              /{" "}
                              <span
                                className="text-green-500 cursor-pointer underline underline-offset-[6px]"
                                onClick={() => setDelete(null)}
                              >
                                no
                              </span>
                            </p>
                          )}
                        </>
                      )}
                    </div>
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

          <div className="bg-neutral hover:bg-secondary duration-300 text-white px-6 pt-4 pb-5 rounded-full block  text-center w-full cursor-pointer">
            Checkout
          </div>

          <Link
            to="/products"
            className="bg-shades-200 hover:bg-secondary duration-300 text-white px-6 pt-4 pb-5 rounded-full block  text-center w-full cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
