import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../middleware/firebase";
import { categories } from "../../../assets/data";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import ImageUpload from "./imageUpload";
import MultiplePricing from "./multiplePricing";
import Preloader from "../../../components/preloader";
import TagSelection from "./tagSelection";
import ColorSelection from "./colorSelection";
import { IoIosCloudUpload, IoMdTrash } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import ImageContainer from "./imageContainer";

function UploadProduct() {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [product, setProduct] = useState({
    description: "",
    images: [],
    name: "",
    sizes: [],
    tags: [],
    type: "home accessories",
    colors: [],
  });

  const { type, id } = useParams();
  const navigate = useNavigate();

  const getDocument = async (id, type) => {
    if (type && id !== "") {
      const docRef = doc(db, type, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
        setEditing(true);
      } else {
        // docSnap.data() will be undefined in this case
        setEditing(false);
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    getDocument(id, type);
  }, [id, type]);

  const validateForm = () => {
    let error = [];
    const errorRef = document.getElementById("uploadError");

    const formStore = Object.keys(product);

    formStore.forEach((id) => {
      const value = product[id];
      switch (id) {
        case "tags":
        case "discount":
          if (value === 0 || value.length <= 0) delete product[id];
          break;
        default:
          if (value === "") {
            errorRef.style.color = "#F11010";
            errorRef.style.display = "block";
            errorRef.innerHTML = "Fill all the required field please";
            error.push(true);
          }
      }
    });

    return error.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorRef = document.getElementById("uploadError");
    const isValidate = validateForm();

    if (isValidate >= 1) {
      return;
    }

    setLoading(true);
    errorRef.style.display = "none";

    try {
      await addDoc(collection(db, product.type), {
        ...product,
        status: "Published",
      }).then(() => navigate("/admin"));
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    setLoading(true);

    try {
      await deleteDoc(doc(db, type, id)).then(() => navigate("/admin"));

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    const errorRef = document.getElementById("uploadError");
    const isValidate = validateForm();

    if (isValidate >= 1) {
      return;
    }

    setLoading(true);
    errorRef.style.display = "none";

    try {
      const docRef = doc(db, type, id);
      await updateDoc(docRef, { ...product }).then(() => navigate("/admin"));

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white max-w-4xl mx-auto relative">
      <Preloader modal={loading} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4 p-4 sm:p-8"
      >
        <div className="flex flex-col gap-2 w-full xs:col-span-2">
          <label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
            type="text"
            id="name"
            placeholder="Name of product"
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, name: e.target.value }))
            }
            onInput={(e) =>
              setProduct((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        {/* Description  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md h-[130px] overflow-visible"
            type="text"
            id="description"
            placeholder="A description of the product, what it does and its attribute"
            value={product.description}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            onInput={(e) =>
              setProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        {/* Others */}
        <div className="flex gap-4 w-full max-sm:flex-col">
          <div className="flex flex-col gap-2">
            <label htmlFor="type">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              className="p-2 border border-neutral cursor-pointer"
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              {categories.map((category) => (
                <option value={category.target} key={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <TagSelection setProduct={setProduct} tags={product.tags} />
        </div>

        <ColorSelection setProduct={setProduct} colors={product.colors} />

        {/* Image */}
        <div className="flex flex-col gap-3">
          <ImageUpload setProduct={setProduct} />

          <div className="flex gap-2 w-full">
            {product.images.length >= 1 &&
              product.images.map((image, id) => (
                <ImageContainer
                  key={image}
                  image={image}
                  deleteImage={() =>
                    setProduct((currentProduct) => ({
                      ...currentProduct,
                      images: currentProduct.images.filter((_, i) => i !== id),
                    }))
                  }
                />
              ))}
          </div>
        </div>

        <div className="w-full space-y-2">
          <div>Pricing</div>
          <MultiplePricing
            setProduct={setProduct}
            sizeCollection={product.sizes}
          />
        </div>

        <label id="uploadError" className="hidden"></label>
        {editing ? (
          <div className="flex gap-4 justify-center ma max-xs:gap-2 mt-3">
            <div
              onClick={() => saveChanges()}
              className="text-green-500 hover:bg-green-500 hover:bg-opacity-70 hover:text-white duration-500 px-6 pb-3 pt-2 rounded w-full sm:w-fit cursor-pointer border flex gap-1 items-center justify-center"
            >
              <CiEdit size="1.2rem" /> Update
            </div>

            <div
              onClick={() => deleteProduct()}
              className="text-red-500 hover:bg-red-500 hover:text-white duration-500 px-6 py-2 rounded w-full sm:w-fit cursor-pointer border flex gap-1 items-center justify-center"
            >
              <IoMdTrash size="1.2rem" /> Delete
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="outline-0 border text-primary hover:bg-opacity-40 hover:text-white hover:bg-primary duration-500 px-6 py-3 rounded w-full sm:w-fit mx-auto mt-3 cursor-pointer flex items-center gap-1 justify-center"
          >
            <IoIosCloudUpload size="1.2rem" /> Upload Product
          </button>
        )}
      </form>
    </div>
  );
}

export default UploadProduct;
