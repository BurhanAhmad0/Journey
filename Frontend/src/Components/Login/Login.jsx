import React from "react";
import { Link } from "react-router-dom";

const Login = ({
  loginForm,
  handleChange,
  handleSubmit,
  errors,
  setErrors,
}) => {
  return (
    <section
      aria-labelledby="login-heading"
      className="bg-gray-300/50 min-h-screen flex flex-col items-center justify-center"
    >
      <h1 id="login-heading" className="text-xl font-semibold">
        Login to your account
      </h1>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-5 flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleChange(e)}
            // value={loginForm.email}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="bg-white/50 border-[2px] border-black rounded-md p-2 w-72 outline-none"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handleChange(e)}
            value={loginForm.password}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="bg-white/50 border-[2px] border-black rounded-md p-2 w-72 outline-none"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-md bg-amber-500 hover:bg-amber-500/90 p-2 w-72 font-semibold transition-all duration-300 cursor-pointer"
        >
          Login
        </button>
        <small className="text-xs">
          Forgot passord?{" "}
          <Link to={"/forgot-password"} className=" underline text-amber-500">
            Reset it
          </Link>
        </small>
      </form>
    </section>
  );
};

export default Login;
