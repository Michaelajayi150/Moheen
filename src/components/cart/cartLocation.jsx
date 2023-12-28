/* eslint-disable react/prop-types */

function CartLocation({ address, delivery_location, status, paid }) {
  return (
    <div className="flex justify-between items-start w-full flex-wrap gap-6">
      <div>
        <h4>Shipping</h4>
        <p className="font-light text-sm">
          {`${address && `${address}, `}${delivery_location}, Nigeria`}
        </p>
      </div>

      <div className="flex justify-between items-start gap-2">
        <div
          className={`${
            status === "delivered"
              ? "bg-green-500"
              : status === "on-going"
              ? "bg-primary"
              : "bg-red-600"
          } capitalize inline bg-opacity-50 text-white text-xs py-2 px-4 rounded-3xl cursor-default`}
        >
          {status}
        </div>
        <div
          className={`${
            paid ? "bg-green-500" : "bg-red-600"
          } capitalize inline bg-opacity-50 text-white text-xs py-2 px-4 rounded-3xl cursor-default`}
        >
          {paid ? "Paid" : "Not paid"}
        </div>
      </div>
    </div>
  );
}

export default CartLocation;
