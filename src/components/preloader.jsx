/* eslint-disable react/prop-types */
function Preloader({ modal }) {
  return (
    modal && (
      <div className="fixed w-full h-full -top-6 left-0 z-[10001]">
        <div className="absolute w-full h-full bg-black bg-opacity-80 cursor-pointer top-0 left-0" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="lds-hourglass"></div>
        </div>
      </div>
    )
  );
}

export default Preloader;
