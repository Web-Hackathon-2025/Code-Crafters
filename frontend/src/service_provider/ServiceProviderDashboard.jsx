// src/service_provider/Dashboard.jsx
import { useState } from 'react';
import {
  FaUserTie,
  FaTools,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
  FaEdit,
} from 'react-icons/fa';

const initialProfile = {
  name: 'Ahmed Khan',
  serviceCategory: 'plumbing',
  description:
    'Experienced plumbing professional providing reliable installation, repair, and maintenance services for homes and small businesses.',
  basePrice: '1500',
  location: 'Gulshan-e-Iqbal, Karachi',
  availability: 'Mon – Sat, 10:00 AM – 8:00 PM',
  status: 'active', // 'active' | 'inactive'
};

const serviceCategories = [
  'plumbing',
  'electrical',
  'carpentry',
  'cleaning',
  'painting',
  'ac-repair',
  'appliance-repair',
  'beauty-salon',
  'pest-control',
  'other',
];

function ServiceProviderDashboard() {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeNav, setActiveNav] = useState('profile'); // for future sections

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const toggleStatus = () => {
    setDraft((prev) => ({
      ...prev,
      status: prev.status === 'active' ? 'inactive' : 'active',
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!draft.name.trim()) newErrors.name = 'Provider name is required';
    if (!draft.serviceCategory) newErrors.serviceCategory = 'Please select a service category';
    if (!draft.description.trim()) newErrors.description = 'Service description is required';
    if (!draft.basePrice.trim()) newErrors.basePrice = 'Base price is required';
    if (!draft.location.trim()) newErrors.location = 'Service area / location is required';
    if (!draft.availability.trim()) newErrors.availability = 'Availability schedule is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setDraft(profile);
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validate()) return;

    setIsSaving(true);
    try {
      // Simulate API call – replace with real backend integration later
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setProfile(draft);
      setSuccessMessage('Profile updated successfully.');
    } catch (err) {
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const hasUnsavedChanges = JSON.stringify(profile) !== JSON.stringify(draft);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md md:shadow-lg">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <FaTools className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Karigar</h1>
            <p className="text-xs text-blue-100">Service Provider Dashboard</p>
          </div>
        </div>

        <nav className="px-3 py-4 space-y-1">
          <SidebarItem
            label="Profile Management"
            icon={FaUserTie}
            active={activeNav === 'profile'}
            onClick={() => setActiveNav('profile')}
          />
          {/* Future items can be added here (Bookings, Earnings, Reviews, etc.) */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Service Profile</h2>
            <p className="text-sm text-gray-500">
              Create and manage how customers see your services on Karigar.
            </p>
          </div>
          {hasUnsavedChanges && (
            <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-800 border border-yellow-200">
              <span className="h-2 w-2 rounded-full bg-yellow-400 mr-2" />
              Unsaved changes
            </span>
          )}
        </header>

        {/* Alerts */}
        <div className="space-y-3 mb-4">
          {successMessage && (
            <div className="flex items-start gap-2 rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800">
              <FaCheckCircle className="mt-0.5 h-4 w-4" />
              <span>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="flex items-start gap-2 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
              <span className="font-semibold">Error:</span>
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Layout: Summary + Form */}
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-1">
            <ProfileSummaryCard profile={profile} />
          </section>

          <section className="lg:col-span-2">
            <ProfileForm
              draft={draft}
              errors={errors}
              onChange={handleFieldChange}
              onToggleStatus={toggleStatus}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ label, icon: Icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function ProfileSummaryCard({ profile }) {
  const categoryLabel =
    serviceCategories.find((c) => c === profile.serviceCategory) || profile.serviceCategory;

  const humanCategory = categoryLabel
    ? categoryLabel
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : '—';

  const isActive = profile.status === 'active';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
            <FaUserTie className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FaTools className="h-3 w-3" />
              <span>{humanCategory}</span>
            </p>
          </div>
        </div>
        <StatusBadge status={profile.status} />
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2 text-gray-600">
          <FaMapMarkerAlt className="mt-0.5 h-4 w-4 text-gray-400" />
          <span>{profile.location || 'No service area specified'}</span>
        </div>
        <div className="flex items-start gap-2 text-gray-600">
          <FaClock className="mt-0.5 h-4 w-4 text-gray-400" />
          <span>{profile.availability || 'No availability schedule specified'}</span>
        </div>
        <div className="flex items-start gap-2 text-gray-600">
          <FaRupeeSign className="mt-0.5 h-4 w-4 text-gray-400" />
          <span>Starting from {profile.basePrice || '—'} PKR</span>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          This is how customers will see your profile on Karigar. Keep it complete and accurate to
          build trust and get more bookings.
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const isActive = status === 'active';
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? 'bg-green-50 text-green-800 border border-green-200'
          : 'bg-gray-50 text-gray-700 border border-gray-200'
      }`}
    >
      <span
        className={`mr-1.5 h-2 w-2 rounded-full ${
          isActive ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}

function ProfileForm({
  draft,
  errors,
  onChange,
  onToggleStatus,
  onSubmit,
  onCancel,
  isSaving,
}) {
  const isActive = draft.status === 'active';

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <FaEdit className="h-4 w-4 text-blue-600" />
          Edit Service Profile
        </h3>
        <button
          type="button"
          onClick={onToggleStatus}
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
            isActive
              ? 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'
              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
        >
          <span
            className={`mr-1.5 h-2 w-2 rounded-full ${
              isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
          {isActive ? 'Profile Active' : 'Profile Inactive'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label
            htmlFor="name"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide"
          >
            Provider Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={draft.name}
            onChange={onChange}
            className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Your full name or business name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="serviceCategory"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide"
          >
            Service Category
          </label>
          <select
            id="serviceCategory"
            name="serviceCategory"
            value={draft.serviceCategory}
            onChange={onChange}
            className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              errors.serviceCategory ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {serviceCategories.map((category) => (
              <option key={category} value={category}>
                {category
                  .split('-')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}
              </option>
            ))}
          </select>
          {errors.serviceCategory && (
            <p className="mt-1 text-xs text-red-600">{errors.serviceCategory}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="basePrice"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide"
          >
            Starting Price (PKR)
          </label>
          <div
            className={`flex rounded-md shadow-sm border ${
              errors.basePrice ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <span className="inline-flex items-center px-3 text-gray-400 text-sm">
              <FaRupeeSign className="h-3 w-3" />
            </span>
            <input
              id="basePrice"
              name="basePrice"
              type="text"
              value={draft.basePrice}
              onChange={onChange}
              className="flex-1 rounded-r-md border-0 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. 1500"
            />
          </div>
          {errors.basePrice && (
            <p className="mt-1 text-xs text-red-600">{errors.basePrice}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide"
          >
            Service Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={draft.description}
            onChange={onChange}
            className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Describe your services, expertise, and what makes you stand out."
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide"
          >
            Service Area / Location
          </label>
          <div
            className={`flex rounded-md shadow-sm border ${
              errors.location ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <span className="inline-flex items-center px-3 text-gray-400 text-sm">
              <FaMapMarkerAlt className="h-3 w-3" />
            </span>
            <input
              id="location"
              name="location"
              type="text"
              value={draft.location}
              onChange={onChange}
              className="flex-1 rounded-r-md border-0 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Neighborhood / City you serve"
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-xs text-red-600">{errors.location}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="availability"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide"
          >
            Availability Schedule
          </label>
          <div
            className={`flex rounded-md shadow-sm border ${
              errors.availability ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <span className="inline-flex items-center px-3 text-gray-400 text-sm">
              <FaClock className="h-3 w-3" />
            </span>
            <input
              id="availability"
              name="availability"
              type="text"
              value={draft.availability}
              onChange={onChange}
              className="flex-1 rounded-r-md border-0 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Mon – Sat, 10:00 AM – 8:00 PM"
            />
          </div>
          {errors.availability && (
            <p className="mt-1 text-xs text-red-600">{errors.availability}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-70"
        >
          {isSaving && (
            <svg
              className="mr-2 h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          )}
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default ServiceProviderDashboard;