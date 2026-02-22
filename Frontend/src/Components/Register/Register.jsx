import React from "react";
import { Link } from "react-router-dom";

const Register = ({
  registerForm,
  handleChange,
  handleSubmit,
  errors,
  setErrors,
}) => {
  return (
    <section
      aria-labelledby="register-heading"
      className="bg-gray-300/50 min-h-screen flex flex-col items-center justify-center"
    >
      <h1 id="register-heading" className="text-xl font-semibold">
        Register your account
      </h1>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={registerForm.first_name}
            autoComplete="given-name"
            onChange={handleChange}
            placeholder="First Name"
            className="bg-white/50 border-[2px] border-black rounded-md p-2 w-72 outline-none"
          />
          {errors.first_name && (
            <p className="text-sm text-red-600">{errors.first_name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={registerForm.last_name}
            autoComplete="family-name"
            onChange={handleChange}
            placeholder="Last Name"
            className="bg-white/50 border-[2px] border-black rounded-md p-2 w-72 outline-none"
          />
          {errors.last_name && (
            <p className="text-sm text-red-600">{errors.last_name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={registerForm.email}
            autoComplete="email"
            onChange={handleChange}
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
            id="password"
            name="password"
            type="password"
            value={registerForm.password}
            autoComplete="new-password"
            onChange={handleChange}
            placeholder="Password"
            className="bg-white/50 border-[2px] border-black rounded-md p-2 w-72 outline-none"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="rounded-md bg-amber-500 hover:bg-amber-500/80 p-2 w-72 font-semibold transition-all duration-300 cursor-pointer"
        >
          Register
        </button>
        <small className="text-xs">
          Already have an account?
          <Link className="underline text-amber-500" to={"/login"}>
            Login
          </Link>
        </small>
      </form>
    </section>
  );
};

export default Register;
