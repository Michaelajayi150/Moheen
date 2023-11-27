import { AuthContext } from "../../App";
import { useContext, useState } from "react";
import { auth, db } from "../../middleware/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

function Register() {
  const { setUser, setOption } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [error, setError] = useState({
    email: "",
    password: "",
    cpassword: "",
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
      case "cpassword":
        if (value !== password) {
          setError((prev) => ({
            ...prev,
            cpassword: "Password is not the same",
          }));
        } else {
          setError((prev) => ({ ...prev, cpassword: "" }));
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
    } else if (cpassword !== password) {
      setError((prev) => ({ ...prev, cpassword: "Password is not the same" }));
      return;
    }

    setDisabled(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);

        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
          cart: [],
        });
        setDisabled(false);
        setOption("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setDisabled(false);
        // ..
      });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col gap-3 justify-center"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email2">Email</label>
        <input
          type="email"
          id="email2"
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
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          type="password"
          id="confirm_password"
          value={cpassword}
          placeholder="Confirm your Password"
          onChange={(e) => {
            validator("cpassword", e.target.value);
            setCPassword(e.target.value);
          }}
          onInput={(e) => {
            validator("cpassword", e.target.value);
            setCPassword(e.target.value);
          }}
          className="px-4 py-3 border-[1.5px] outline-0 focus:border-2 border-primary rounded-md"
        />
        {error.cpassword && (
          <p className="text-red-600 text-xs font-semibold">
            {error.cpassword}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="uppercase w-fit bg-primary border-2 border-white hover:bg-white hover:text-primary hover:border-primary font-semibold cursor-pointer px-6 pt-2 pb-3 rounded outline-0 text-white"
      >
        Register
      </button>

      <div className="flex items-center gap-1">
        Have an account?
        <div
          onClick={() => setOption("login")}
          className="underline cursor-pointer underline-offset-3 hover:no-underline"
        >
          Log in
        </div>
      </div>
    </form>
  );
}

export default Register;
