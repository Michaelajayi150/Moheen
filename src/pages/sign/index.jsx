import { MdClose } from "react-icons/md";
import Login from "./login";
import Register from "./register";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { Logo } from "../../assets";

function Sign() {
  const { option, setOption } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted");
  };

  return (
    <div className="opacity-100 scale-100 visible fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        onClick={() => setOption("")}
        className="absolute bg-neutral opacity-70 w-full h-full cursor-pointer"
      />
      <div className="relative z-10 rounded-md border-b-2 border-secondary overflow-hidden w-10/12 sm:w-11/12 md:w-8/12 md:max-w-[400px] py-16 min-w-[300px] mx-auto bg-white flex flex-col gap-2  px-8">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-3 justify-center"
        >
          {option === "login" ? (
            <Login setOption={setOption} />
          ) : (
            <Register setOption={setOption} />
          )}
        </form>
        <div
          onClick={() => setOption(false)}
          className="absolute top-2 right-2 w-6 h-6 cursor-pointer rounded-full flex items-center justify-center bg-shades-200 bg-opacity-50"
        >
          <MdClose />
        </div>
      </div>
    </div>
  );
}

export default Sign;
