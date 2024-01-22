import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../middleware/firebase";
import { categories } from "../../../assets/data";
import { ToastContainer } from "react-toastify";
import Preloader from "../../../components/preloader";
import ProductCard from "../../../components/products/productCard";
import Pagination from "../../../components/pagination";

function TotalProduct() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const paginate = (pageNumber) => {
    window.scrollTo({ top: 45, left: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  const [currentProductCards, setCurrentProductCards] = useState([]);
  // Every thing Pagination

  useEffect(() => {
    const LastCardOfProducts = currentPage * cardsPerPage; // Get the last product in the page
    const FirstCardOfProducts = LastCardOfProducts - cardsPerPage; // Get the first product in the page

    const filteredSearch = products
      .filter(
        (product) =>
          product.type.includes(filter) &&
          product.name.toLowerCase().match(search)
      )
      .slice(FirstCardOfProducts, LastCardOfProducts);

    if (
      products.filter(
        (product) =>
          product.type.includes(filter) &&
          product.name.toLowerCase().match(search)
      ).length /
        8 <
      currentPage
    ) {
      setCurrentPage(1);
    }

    setCurrentProductCards(filteredSearch);
  }, [filter, search, products, currentPage]);

  const fetchPost = async (category) => {
    setLoading(true);

    await getDocs(collection(db, category))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const isAvailable = products.some((product) => product.id === doc.id);
          setLoading(false);

          if (!isAvailable) {
            setProducts((prev) => [...prev, { id: doc.id, ...doc.data() }]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
      });
    setLoading(false);
  };

  useEffect(() => {
    categories.forEach((item) => {
      fetchPost(item.target);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center justify-between w-full">
        <div className="flex gap-3 flex-1 max-xs:flex-col">
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

          <input
            placeholder="Search for a product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-1.5 outline-none focus:border-[1.5px] border border-primary rounded w-full max-w-[450px]"
          />
        </div>
        <p>
          {
            products.filter(
              (product) =>
                product.type.includes(filter) &&
                product.name.toLowerCase().match(search)
            ).length
          }{" "}
          items found
        </p>
      </div>

      <Preloader modal={loading} />

      {products.length >= 1 ? (
        <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
          {currentProductCards.map((product, id) => (
            <ProductCard admin key={id} {...product} />
          ))}
        </div>
      ) : (
        <p className="my-2">No item uploaded yet</p>
      )}

      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={
          products.filter(
            (product) =>
              product.type.includes(filter) &&
              product.name.toLowerCase().match(search)
          ).length
        }
        currentPage={currentPage}
        paginate={paginate}
      />

      <ToastContainer limit={1} />
    </section>
  );
}

export default TotalProduct;
