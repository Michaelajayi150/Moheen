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
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function CartPage() {
  const [carts, setCarts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user_id"));

    if (isUser === null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteCart(index) {
    let newCarts = Array.from(carts);
    newCarts.splice(index, 1);

    console.log(index, newCarts);

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

  useEffect(() => {
    cart.forEach(async (item) => {
      const docRef = doc(db, item.type, item.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data();
        const amount = data.discount
          ? data.price * item.quantity -
            (data.discount / 100) * (data.price * item.quantity)
          : data.price * item.quantity;

        setTotalAmount((prev) => prev + amount);
        setCarts((prev) => [...prev, { ...docSnap.data(), ...item }]);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }, [cart]);

  return (
    <section className="bg-shades-100">
      <div className="py-16 px-6 max-w-[1120px] mx-auto flex max-md:flex-col-reverse items-start gap-8">
        <div className="w-full space-y-6">
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
                    className="w-full flex max-sm:flex-col sm:items-stretch gap-6 border-b border-shades-200 pb-6"
                  >
                    <div className="w-full">
                      <img
                        className="h-full"
                        src={item.image}
                        alt={`${item.name} from Moheen Store`}
                      />
                    </div>
                    <div className="w-full space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                          {item.tags.map((tag, id) => (
                            <div
                              className="bg-shades-100 px-2 pb-1"
                              key={tag + id}
                            >
                              {tag}
                            </div>
                          ))}
                        </div>

                        <div
                          onClick={() => deleteCart(id)}
                          className="text-red-600 cursor-pointer"
                        >
                          <MdDelete />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>

                        <div className="product-description relative pb-3">
                          <h4>Description</h4>
                          <p className="text-sm">{item.description}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral">
                            {item.discount && (
                              <del>₦ {item.price.toLocaleString("en-US")}</del>
                            )}{" "}
                            ₦{" "}
                            {item.discount
                              ? (
                                  item.price -
                                  (item.discount / 100) * item.price
                                ).toLocaleString("en-US")
                              : item.price.toLocaleString("en-US")}
                          </span>
                          <span className="text-sm text-neutral">
                            X{item.quantity}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral">Total</span>
                          <span className="text-sm text-neutral">
                            {item.discount && (
                              <del>
                                ₦{" "}
                                {(item.price * item.quantity).toLocaleString(
                                  "en-US"
                                )}
                              </del>
                            )}{" "}
                            ₦{" "}
                            {item.discount
                              ? (
                                  item.price * item.quantity -
                                  (item.discount / 100) *
                                    (item.price * item.quantity)
                                ).toLocaleString("en-US")
                              : (item.price * item.quantity).toLocaleString(
                                  "en-US"
                                )}
                          </span>
                        </div>
                      </div>
                      <div className="bg-primary hover:bg-secondary duration-300 text-white px-6 pt-1 pb-2 rounded block text-center sm:w-fit mt-6 ml-auto cursor-pointer">
                        Pay now
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral">Total</span>
                  <span className="text-sm text-neutral">
                    ₦ {totalAmount.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="bg-primary hover:bg-secondary duration-300 text-white px-6 pt-1 pb-2 rounded block  text-center w-full sm:w-fit ml-auto cursor-pointer">
                  Pay all
                </div>
              </div>
            )}
          </div>
          <p className="max-w-lg text-sm">
            The price and availability of items at Moheen Collections are
            subject to change. The Cart is a temporary place to store a list of
            your items and reflects each item&apos;s most recent price.
            <br />
            <br />
            Do you have a gift card or promotional code? We&apos;ll ask you to
            enter your claim code when it&apos;s time to pay.
          </p>
        </div>

        <div className="w-full md:max-w-[300px]">
          <div className="bg-white p-4 w-full">
            <h2 className="text-xl font-semibold">Profile</h2>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center gap-4">
                <h3>Mail:</h3>
                <span className="max-w-[20ch] xs:max-w-full md:max-w-[20ch] truncate">
                  {user?.email ? user.email : "Not Set"}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <h3>Address:</h3>
                <span className="max-w-[20ch] xs:max-w-full md:max-w-[20ch] truncate">
                  {user?.address ? user.address : "Not Set"}
                </span>
              </div>
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

export default CartPage;
