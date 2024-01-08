import { pngIcon } from "../../assets";
import { db } from "../../middleware/firebase";
import { RiDeleteBinLine } from "react-icons/ri";
import CreatableSelect from "react-select/creatable";
import { addDoc, collection } from "firebase/firestore";
import { useState, useRef } from "react";
import Preloader from "../../components/preloader";
import { categories } from "../../assets/data";

function UploadProduct() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ size: "", price: 0, discount: 0 });
  const wrapperRef = useRef(null);
  const [product, setProduct] = useState({
    description: "",
    discount: 0,
    image: "",
    name: "",
    price: 0,
    sizes: [],
    tags: [],
    type: "decoration",
  });
  const [file, setFile] = useState(null);

  const url = "https://api.cloudinary.com/v1_1/drrcyvvvq/image/upload";

  const onFileDrop = async (e) => {
    const image = e.target.files[0];
    setFile({
      image: image,
      started: true,
      percent: 0,
      message: "Uploading...",
    });

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "knc86bdn");

    try {
      const response = await fetch(
        url,
        {
          method: "POST",
          body: formData,
        },
        {
          onUploadProgress: (event) => {
            setFile((prev) => ({ ...prev, percent: event.progress * 100 }));
          },
        }
      );

      const result = await response.json();
      setFile({
        image: image,
        started: false,
      });
      setProduct((prev) => ({ ...prev, image: result.url }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setProduct((prev) => ({
          ...prev,
          tags: [
            ...prev.tags,
            {
              label: inputValue,
              value: inputValue,
            },
          ],
        }));
        setInputValue("");
        event.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    if (error.length >= 1) {
      return;
    } else {
      setLoading(true);

      try {
        await addDoc(collection(db, product.type), {
          ...product,
          status: "Published",
        });
        errorRef.style.display = "none";
        setProduct({
          name: "",
          price: 0,
          tags: {},
          description: "",
          discount: 0,
          type: "decoration",
          image: "",
          sizes: [],
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  const addItem = () => {
    if (size.price !== 0 || size.discount !== 0 || size.size !== "") {
      setProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
      setSize({ size: "", price: 0, discount: 0 });
    }
  };

  const removeItem = (index) => {
    let collection = product.sizes;
    collection.splice(index, 1);

    setProduct((prev) => ({ ...prev, sizes: collection }));
  };

  return (
    <div className="bg-white">
      <Preloader modal={loading} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4 p-4 sm:p-8"
      >
        <div className="grid xs:grid-cols-3 w-full gap-4">
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
          <div className="flex flex-col gap-2">
            <label htmlFor="price">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
              type="number"
              id="price"
              placeholder="Price of product"
              value={product.price}
              min={0}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  price: parseInt(e.target.value),
                }))
              }
              onInput={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  price: parseInt(e.target.value),
                }))
              }
            />
          </div>
        </div>

        {/* Others */}
        <div className="grid xs:grid-cols-3 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="Discount">Discount</label>
            <input
              className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
              type="number"
              id="Discount"
              min={0}
              placeholder="Discount on product"
              value={product?.discount}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  discount: parseInt(e.target.value),
                }))
              }
              onInput={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  discount: parseInt(e.target.value),
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 xs:col-span-2">
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

          <div className="flex flex-col gap-2 xs:col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-2">
            <label htmlFor="type">Tags</label>
            <CreatableSelect
              components={{
                DropdownIndicator: null,
              }}
              inputValue={inputValue}
              isClearable
              isMulti
              menuIsOpen={false}
              onChange={(newValue) =>
                setProduct((prev) => ({ ...prev, tags: newValue }))
              }
              onInputChange={(newValue) => setInputValue(newValue)}
              onKeyDown={handleKeyDown}
              placeholder="Type something and press enter..."
              className="overflow-hidden"
              value={product.tags}
            />
          </div>
        </div>

        <div className="grid xs:grid-cols-3 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5 items-end gap-4">
          <div className="flex flex-col gap-2 xs:col-span-2">
            <label htmlFor="Size">Size</label>
            <input
              className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
              type="text"
              id="Size"
              placeholder="Type in a size"
              value={size?.size}
              onChange={(e) =>
                setSize((prev) => ({
                  ...prev,
                  size: e.target.value,
                }))
              }
              onInput={(e) =>
                setSize((prev) => ({
                  ...prev,
                  size: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price</label>
            <input
              className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
              type="number"
              id="price"
              placeholder="Price of product"
              value={size.price}
              min={0}
              onChange={(e) =>
                setSize((prev) => ({
                  ...prev,
                  price: parseInt(e.target.value),
                }))
              }
              onInput={(e) =>
                setSize((prev) => ({
                  ...prev,
                  price: parseInt(e.target.value),
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="Discount">Discount</label>
            <input
              className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
              type="number"
              id="Discount"
              min={0}
              placeholder="Discount on product"
              value={size?.discount}
              onChange={(e) =>
                setSize((prev) => ({
                  ...prev,
                  discount: parseInt(e.target.value),
                }))
              }
              onInput={(e) =>
                setSize((prev) => ({
                  ...prev,
                  discount: parseInt(e.target.value),
                }))
              }
            />
          </div>

          <div
            onClick={() => addItem()}
            className="bg-neutral duration-300 text-white px-3 rounded-md pt-2 pb-3 block text-center w-full cursor-pointer"
          >
            Add
          </div>
        </div>

        <div className="space-y-2">
          {product.sizes.map((collection, id) => (
            <div
              key={collection.size}
              className="grid xs:grid-cols-3 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5 items-end gap-4"
            >
              <input
                className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
                type="text"
                value={collection.size}
                readOnly
              />

              <input
                className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
                type="number"
                value={collection.price}
                readOnly
              />

              <input
                className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
                type="number"
                value={collection.discount}
                readOnly
              />

              <div
                onClick={() => removeItem(id)}
                className="bg-red-500 duration-300 text-white px-6 rounded-md pt-2 pb-3 block text-center w-fit cursor-pointer"
              >
                -
              </div>
            </div>
          ))}
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

        {/* Image */}
        <div className="space-y-3">
          <p
            className="cursor-pointer"
            onClick={() => wrapperRef.current.click()}
          >
            Cover Image <span className="text-red-500">*</span>
          </p>
          <div
            id="upload"
            className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between gap-4"
          >
            {file === null ? (
              <div
                onClick={() => wrapperRef.current.click()}
                className="border-2 border-dashed min-h-[300px] cursor-pointer flex flex-col items-center justify-center gap-3 px-4 text-center w-full"
              >
                <h3 className="text-xl font-semibold">Upload Image</h3>
                <div className="relative">
                  File can exist as a PNG or JPEG.{" "}
                  <span className="text-secondary">Upload here</span>
                  <input
                    type="file"
                    value=""
                    ref={wrapperRef}
                    accept="image/*"
                    className="invisible absolute -left-full top-0 outline-0 border-0"
                    onChange={onFileDrop}
                  />
                  <p className="text-primary-200 text-xs mt-2 opacity-60">
                    (Maximum file size is 2MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 c min-w-[200px]">
                <p className="font-semibold">Preview</p>
                {file.started ? (
                  <div className="relative flex gap-2 w-full">
                    <img
                      className="h-[35px] object-contain"
                      src={pngIcon}
                      alt={file.image.name}
                    />
                    <div className="space-y-2 w-full text-xs">
                      {/* displaying file name, progress bar and file size in Bytes */}
                      <p className="truncate max-w-[170px] sm:max-w-[15ch] md:max-w-full lg:max-w-[15ch]">
                        {file.image.name}
                      </p>
                      {file.started && (
                        <progress
                          className="h-1 w-full"
                          max={100}
                          value={file.percent}
                        ></progress>
                      )}
                      {file.message && file.message}
                    </div>

                    <RiDeleteBinLine
                      onClick={() => setFile(null)}
                      size="1rem"
                      className="text-error-500 cursor-pointer"
                    />
                  </div>
                ) : (
                  <img src={product.image} alt={product.name} />
                )}
              </div>
            )}
          </div>
          <label id="uploadError" className="hidden"></label>
        </div>

        <button
          type="submit"
          className="outline-0 border-0 bg-secondary hover:bg-primary duration-300 text-white px-6 pb-3 pt-2 rounded block text-center uppercase w-full sm:w-fit mx-auto mt-3 cursor-pointer"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default UploadProduct;
