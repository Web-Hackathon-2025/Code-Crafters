import { useState } from "react";

export default function Login() {
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", form);

    // TODO:
    //  - Validate fields
    //  - Call API (axios / fetch)
    //  - Handle login response
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white shadow-lg rounded-xl w-full max-w-sm p-8">

        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Karigar Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 text-lg rounded-md font-semibold transition"
          >
            Login
          </button>

        </form>

        {/* Bottom Links */}
        <div className="text-center text-sm mt-6 space-y-2">

          <p>
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-700 font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>

          <p>
            <a
              href="/forgot-password"
              className="text-blue-700 font-semibold hover:underline"
            >
              Forgot password?
            </a>
          </p>

        </div>

      </div>
    </div>
  );
}
