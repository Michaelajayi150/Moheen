/* eslint-disable react/prop-types */

function Register({ setOption }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Your Email"
          className="px-4 py-3 border-[1.5px] outline-0 focus:border-2 border-primary rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Your Password"
          className="px-4 py-3 border-[1.5px] outline-0 focus:border-2 border-primary rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          type="password"
          id="confirm_password"
          placeholder="Confirm your Password"
          className="px-4 py-3 border-[1.5px] outline-0 focus:border-2 border-primary rounded-md"
        />
      </div>
      <button
        type="submit"
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
    </>
  );
}

export default Register;
