import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../middleware/firebase";
import { categories } from "../../../assets/data";
import ListCard from "./listCard";
import { ToastContainer } from "react-toastify";
import Preloader from "../../../components/cart/preloader";

function TotalProduct() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [deleted, setDeleted] = useState();
  const [loading, setLoading] = useState(false);

  const tableHeader = [
    { name: "Name", id: "name" },
    { name: "Type", id: "type" },
    { name: "Price (₦)", id: "price" },
    { name: "Discount (₦)", id: "discount" },
    {
      name: "Sizes",
      id: "sizes",
    },
    { name: "Status", id: "status" },
  ];

  const fetchPost = async (category) => {
    setLoading(true);
    await getDocs(collection(db, category))
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const isAvailable = products.some((product) => product.id === doc.id);
          setLoading(false);

          if (!isAvailable) {
            let data = doc.data;
            if (data.status) {
              setProducts((prev) => [...prev, { id: doc.id, ...doc.data() }]);
            } else {
              setProducts((prev) => [
                ...prev,
                { id: doc.id, ...doc.data(), status: "Published" },
              ]);
            }
          }
        })
      )
      .catch((err) => {
        console.log(err);
        setProducts([]);
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    categories.forEach((item) => {
      fetchPost(item.target);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (type, id, index) => {
    try {
      await deleteDoc(doc(db, type, id));

      setDeleted("");
      let productList = Array.from(products);
      productList.splice(index, 1);
      setProducts(productList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center justify-between w-full">
        <select
          className="p-2 border border-neutral cursor-pointer"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option value={category.target} key={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <p>
          {products.filter((product) => product.type.includes(filter)).length}{" "}
          items displayed
        </p>
      </div>

      <div className="w-[calc(100vw_-_24px)] xs:w-[calc(100vw_-_48px)] md:max-w-[calc(1120px_-_312px)] mx-auto bg-white shadow-md text-sm text-gray-500 rounded-md relative">
        <Preloader modal={loading} />
        <div className="flex whitespace-nowrap overflow-x-auto max-h-[60vh] overflow-y-auto [&>*:nth-child(2)]:text-primary-600">
          {tableHeader.map((theads) => (
            <div className="flex-1" key={theads.name}>
              <div className="p-4 uppercase text-gray-900 border-b-2 border-r-2 border-gray-200">
                {theads.name}
              </div>

              <div className="[&>*:nth-child(even)]:bg-gray-100 border-b-2 border-r-2 border-gray-200">
                {products.length >= 1
                  ? products.map(
                      (product, id) =>
                        product.type.includes(filter) && (
                          <div
                            key={product.name + id}
                            className={`${
                              deleted === id ? "!bg-red-400 text-white" : ""
                            } p-4 capitalize`}
                          >
                            <ListCard
                              theads={theads}
                              product={product}
                              deleteProduct={() =>
                                handleDelete(product.type, product.id, id)
                              }
                              setDeleted={() =>
                                deleted === id ? setDeleted("") : setDeleted(id)
                              }
                            />
                          </div>
                        )
                    )
                  : "No item uploaded yet"}
              </div>
            </div>
          ))}
        </div>
        <ToastContainer limit={1} />
      </div>
    </section>
  );
}

export default TotalProduct;
