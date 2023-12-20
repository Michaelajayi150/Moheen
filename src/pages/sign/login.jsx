import { AuthContext } from "../../App";
import { useContext, useState } from "react";
import { auth } from "../../middleware/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Preloader from "../../components/preloader";

function Login() {
  const { setUser, setOption } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [modal, setModal] = useState(false);

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validator = (name, value) => {
    let isEmailValid;

    if (name === "email") {
      isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        ? true
        : false;
    }

    switch (name) {
      case "email":
        if (!isEmailValid) {
          setError((prev) => ({ ...prev, email: "Email is invalid" }));
        } else {
          setError((prev) => ({ ...prev, email: "" }));
        }
        break;
      case "password":
        if (value.length <= 6) {
          setError((prev) => ({ ...prev, password: "Password is too short" }));
        } else {
          setError((prev) => ({ ...prev, password: "" }));
        }
        break;
      default:
        if (value === "") {
          setError((prev) => ({ ...prev, [name]: "Cannot be empty" }));
        } else {
          setError((prev) => ({ ...prev, [name]: "" }));
        }
        break;
    }
  };

  const onSubmit = async (e) => {
    setError({
      email: "",
      password: "",
    });
    e.preventDefault();

    const isEmailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ? true
      : false;

    if (!isEmailValid) {
      setError((prev) => ({ ...prev, email: "Email is invalid" }));
      return;
    } else if (password.length <= 6) {
      setError((prev) => ({ ...prev, password: "Password is too short" }));
      return;
    }

    setDisabled(true);
    setModal(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        setDisabled(false);
        setModal(false);
        setOption("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          setError((prev) => ({ ...prev, password: "Wrong password" }));
        } else if (errorCode === "auth/user-not-found") {
          setError((prev) => ({ ...prev, email: "User not found" }));
        } else {
          console.log(errorCode);
          console.log(errorMessage);
        }
        setModal(false);
        setDisabled(false);
        // ..
      });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col gap-3 justify-center"
    >
      <Preloader modal={modal} />
      <div className="flex flex-col gap-2">
        <label htmlFor="email1">Email</label>
        <input
          type="email"
          id="email1"
          value={email}
          placeholder="Your Email"
          onChange={(e) => {
            validator("email", e.target.value);
            setEmail(e.target.value);
          }}
          onInput={(e) => {
            validator("email", e.target.value);
            setEmail(e.target.value);
          }}
          className="px-4 py-3 border-[1.5px] outline-0 focus:border-2 border-primary rounded-md"
        />
        {error.email && (
          <p className="text-red-600 text-xs font-semibold">{error.email}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Your Password"
          onChange={(e) => {
            validator("password", e.target.value);
            setPassword(e.target.value);
          }}
          onInput={(e) => {
            validator("password", e.target.value);
            setPassword(e.target.value);
          }}
          className="px-4 py-3 border-[1.5px] outline-0 focus:border-2 border-primary rounded-md"
        />
        {error.password && (
          <p className="text-red-600 text-xs font-semibold">{error.password}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="uppercase w-fit bg-primary border-2 border-white hover:bg-white hover:text-primary hover:border-primary font-semibold cursor-pointer px-6 pt-2 pb-3 rounded outline-0 text-white"
      >
        Login
      </button>

      <div className="flex items-center gap-1">
        Don&apos;t have an account?
        <div
          onClick={() => setOption("register")}
          className="underline cursor-pointer underline-offset-3 hover:no-underline"
        >
          Sign up
        </div>
      </div>
    </form>
  );
}

export default Login;
