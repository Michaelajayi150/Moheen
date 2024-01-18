/* eslint-disable react/prop-types */
import { useState } from "react";

function MultiplePricing({ setProduct, sizeCollection }) {
  const [size, setSize] = useState({ size: "", price: 0, discount: 0 });

  const addItem = () => {
    if (size.price !== 0 && size.discount !== 0 && size.size !== "") {
      setProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
      setSize({ size: "", price: 0, discount: 0 });
    }
  };

  const removeItem = (index) => {
    let collection = sizeCollection;
    collection.splice(index, 1);

    setProduct((prev) => ({ ...prev, sizes: collection }));
  };

  return (
    <>
      <div className="grid xs:grid-cols-5 items-end gap-2 sm:gap-3 md:gap-4">
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
          +
        </div>
      </div>

      <div className="space-y-2">
        {sizeCollection.map((collection, id) => (
          <div
            key={collection.size}
            className="grid xs:grid-cols-5 items-end gap-2 sm:gap-3 md:gap-4"
          >
            <input
              className="px-4 py-2 outline-0 border focus:border-[1.5px] border-primary rounded-md xs:col-span-2"
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
              className="bg-red-500 duration-300 text-white px-3 rounded-md pt-2 pb-3 block text-center w-full cursor-pointer"
            >
              -
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MultiplePricing;
