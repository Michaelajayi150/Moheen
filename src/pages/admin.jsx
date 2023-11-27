import { AuthContext } from "../App";
import { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { pngIcon } from "../assets";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../middleware/firebase";

function Admin() {
  const wrapperRef = useRef(null);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    tags: [],
    description: "",
    discount: 0,
    type: "decoration",
    image: "",
  });
  const [file, setFile] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  const categories = [
    { name: "Home Decoration", target: "decoration" },
    { name: "Toilet Accessories", target: "toiletries" },
    { name: "Towels", target: "towels" },
    { name: "Beddings and accessories", target: "bedding" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user_id"));

    if (isUser === null) {
      navigate("/");
      return;
    } else {
      if (isUser?.email !== "moheenadmin@gmail.com") {
        navigate("/cart");
        return;
      }
    }
  }, [navigate]);

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
      try {
        await addDoc(collection(db, product.type), product);
        errorRef.style.display = "none";
        setProduct({
          name: "",
          price: 0,
          tags: {},
          description: "",
          discount: 0,
          type: "decoration",
          image: "",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="bg-shades-100">
      <div className="py-16 px-6 max-w-[1120px] mx-auto flex max-md:flex-col-reverse items-start gap-8">
        <div className="w-full space-y-6">
          <div className="bg-white">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-4 p-8"
            >
              <div className="grid grid-cols-2 w-full gap-4">
                <div className="flex flex-col gap-2 w-full">
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
              <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="Discount">Discount (%)</label>
                  <input
                    className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md"
                    type="number"
                    id="Discount"
                    min={0}
                    max={99}
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
                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="type">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
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

                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="type">Tags</label>
                  <select
                    className="p-2 border border-neutral cursor-pointer"
                    onChange={(e) =>
                      setProduct((prev) => ({ ...prev, tags: e.target.value }))
                    }
                  >
                    {categories.map((category) => (
                      <option value={category.target} key={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                          className="invisible absolute outline-0 border-0"
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

export default Admin;
