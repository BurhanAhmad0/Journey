import { useForgotPassword } from "../Hooks/useForgotPassword.js";

const ForgotPassword = () => {
  const { email, handleChange, handleSubmit } = useForgotPassword();

  return (
    <div className="bg-gray-300/50 min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={email}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="bg-white/50 border-[2px] border-black rounded-md p-2 w-72 outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-amber-500 hover:bg-amber-500/90 p-2 w-72 font-semibold transition-all duration-300 cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
