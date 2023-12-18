/* eslint-disable react/prop-types */
import { useState } from "react";

function CartItem({ deleteCart, updateCart, item }) {
  const [deleted, setDelete] = useState(false);

  return (
    <>
      <div className="sm:max-w-[200px] max-h-[250px] overflow-hidden">
        <img
          className="w-full object-bottom h-full"
          src={item.image}
          alt={`${item.name} from Moheen Store`}
        />
      </div>
      <div className="w-full">
        <div className="text-black flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold capitalize">{item.name}</h3>

          <p className="text-sm text-neutral">
            ₦{" "}
            {item?.size
              ? (item.sizes[item.size]?.discount
                  ? item.sizes[item.size]?.discount * item.quantity
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
              <label htmlFor={`size_${item.id}`}>Size</label>
              <select
                disabled={item.paid}
                id={`size_${item.id}`}
                onChange={(e) => updateCart("size", e.target.value)}
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
            <label htmlFor={`quantity_${item.id}`}>Quantity</label>
            <select
              disabled={item.paid}
              id={`quantity_${item.id}`}
              onChange={(e) => updateCart("quantity", e.target.value)}
              value={item.quantity}
              className="pl-2 py-1 text-center"
            >
              {new Array(10).fill().map((_, i) => (
                <option key={`${item.id} ${i}`} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!item.paid && (
          <>
            <p
              onClick={() => setDelete(true)}
              className="pt-3 w-fit text-sm underline underline-offset-[6px] cursor-pointer"
            >
              Remove
            </p>
            {deleted && (
              <p className="text-sm pt-3">
                Do you really want to delete?{" "}
                <span
                  className="text-red-500 cursor-pointer underline underline-offset-[6px]"
                  onClick={deleteCart}
                >
                  yes
                </span>{" "}
                /{" "}
                <span
                  className="text-green-500 cursor-pointer underline underline-offset-[6px]"
                  onClick={() => setDelete(false)}
                >
                  no
                </span>
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default CartItem;
