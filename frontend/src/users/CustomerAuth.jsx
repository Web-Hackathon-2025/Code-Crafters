import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const CustomerAuth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  city: '',
  area: '',
  role: 'customer', // default for this screen
  terms: false
});

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (activeTab === 'signup') {
      if (!formData.name?.trim()) newErrors.name = 'Full name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
      if (!formData.city?.trim()) newErrors.city = 'City is required';
if (!formData.area?.trim()) newErrors.area = 'Area is required';

      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.terms) newErrors.terms = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setIsLoading(true);

  try {

    let payload = {
      email: formData.email,
      password: formData.password
    };

    if (activeTab === "signup") {
      payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "customer",
        phone: formData.phone,
        location: {
          city: formData.city,
          area: formData.area
        }
      };
    }

    // 3️⃣ Call API
    const url =
       activeTab === "signup"
    ? "http://localhost:3000/api/user/register" // <-- correct path
    : "http://localhost:3000/api/auth/login";

    const res = await axios.post(url, payload);

    // 4️⃣ Save token if login returns one (future-ready)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    navigate("/customer-service");
  } catch (error) {
    setErrors({
      submit:
        error.response?.data?.message ||
        "Something went wrong. Please try again."
    });
  } finally {
    setIsLoading(false);
  }
};


  const isFormValid = () => {
  if (activeTab === 'login') {
    return formData.email && formData.password && formData.password.length >= 6;
  }
  // signup validation
  return (
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.city &&
    formData.area &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.terms
  );
};


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row text-white">
      {/* Left side - Branding */}
      <div className="w-full md:w-1/2 bg-gray-800 p-8 md:p-12 flex flex-col justify-center items-center">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Karigar</h1>
          <p className="text-lg mb-8 text-gray-300">Find skilled service providers in your neighborhood</p>
        </div>
      </div>

      {/* Right Side - Auth Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors duration-200 ${
                activeTab === 'login'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors duration-200 ${
                activeTab === 'signup'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && (
              <div className="p-3 bg-red-600 text-white text-sm rounded-md">{errors.submit}</div>
            )}

            {activeTab === 'signup' && (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                        errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } bg-gray-900 placeholder-gray-400 text-white`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                        errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } bg-gray-900 placeholder-gray-400 text-white`}
                      placeholder="+1 555-123-4567"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
  <label className="block text-sm font-medium mb-1">City</label>
  <input
    name="city"
    type="text"
    value={formData.city}
    onChange={handleChange}
    className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-600"
    placeholder="Karachi"
  />
  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
</div>

<div>
  <label className="block text-sm font-medium mb-1">Area</label>
  <input
    name="area"
    type="text"
    value={formData.area}
    onChange={handleChange}
    className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-600"
    placeholder="Gulshan-e-Iqbal"
  />
  {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
</div>

              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                    errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } bg-gray-900 placeholder-gray-400 text-white`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                    errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } bg-gray-900 placeholder-gray-400 text-white`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {activeTab === 'signup' && (
              <>
                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                        errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } bg-gray-900 placeholder-gray-400 text-white`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                {/* Terms */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium">
                      I agree to the{' '}
                      <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and{' '}
                      <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                    </label>
                    {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={!isFormValid() || isLoading}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                  !isFormValid() || isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-900'
                }`}
              >
                {isLoading ? 'Processing...' : (activeTab === 'login' ? 'Sign In' : 'Create Account')}
                <FaArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                {activeTab === 'login' ? 'Create a new account' : 'Sign in to your account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerAuth;
