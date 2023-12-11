import { IoMdTrash } from "react-icons/io";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
function ListCard({ theads, product, deleteProduct, setDeleted }) {
  const DeletePrompt = () => (
    <div className="normal-case flex flex-col gap-3">
      Are you sure you want to delete this product?
      <button
        className="px-4 py-2 bg-red-400 hover:bg-hero-600 text-white"
        onClick={deleteProduct}
      >
        Delete
      </button>
    </div>
  );

  return theads.name === "Sizes" ? (
    product?.sizes ? (
      product.sizes.map((size, i) => (
        <span key={size.size + size.price}>
          {size.size} {i < product.sizes.length - 1 && ", "}
        </span>
      ))
    ) : (
      <div className="text-gray-100 text-opacity-0">NIL</div>
    )
  ) : theads.name === "Status" ? (
    <span className="flex items-center gap-1">
      {product[theads.id]}{" "}
      <IoMdTrash
        onClick={() => {
          toast(<DeletePrompt />, {
            onClose: () => setDeleted(),
          });
        }}
        className="cursor-pointer hover:text-red-600"
      />
    </span>
  ) : product[theads.id] === undefined ? (
    <div className="text-gray-100 text-opacity-0">NIL</div>
  ) : (
    product[theads.id]
  );
}

export default ListCard;
