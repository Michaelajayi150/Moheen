import ProductCard from "./productCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../middleware/firebase";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function ProductCategory({ category, name }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    setLoading(true);
    await getDocs(collection(db, category))
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const isAvailable = products.some((product) => product.id === doc.id);
          setLoading(false);

          if (!isAvailable) {
            setProducts((prev) => [...prev, { id: doc.id, ...doc.data() }]);
          }
        })
      )
      .catch((err) => {
        console.log(err);
        setProducts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="space-y-3">
      <h3 className="text-xl font-semibold capitalize">{name}</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-6 mt-10">
        {loading ? (
          Array.from({ length: 4 }).map((_, id) => (
            <div
              key={id}
              className="shadow-md rounded-md overflow-hidden w-full"
            >
              <div className="w-full bg-shades-200 h-[170px] opacity-40" />
              <div className="px-3 py-6 space-y-3">
                <div className="bg-shades-200 w-24 h-2 opacity-40" />
                <div className="bg-shades-200 w-16 h-2 opacity-40" />
              </div>
            </div>
          ))
        ) : products.length >= 1 ? (
          products.map((product, id) => (
            <ProductCard key={product.id + id} {...product} data={product} />
          ))
        ) : (
          <p>No item uploaded yet</p>
        )}
      </div>
    </section>
  );
}

export default ProductCategory;
