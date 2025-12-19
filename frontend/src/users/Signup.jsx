import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);
    // TODO: Call backend API to register user
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-sm p-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Your full name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white w-full py-2 rounded-md font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-700 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
