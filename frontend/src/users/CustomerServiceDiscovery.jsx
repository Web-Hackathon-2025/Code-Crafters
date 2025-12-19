// src/users/CustomerServiceDiscovery.jsx
import { useEffect, useMemo, useState } from "react";
import {
  FaTools,
  FaSearch,
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaRupeeSign,
  FaArrowLeft,
  FaUser,
} from "react-icons/fa";

/* -------------------------------------------------------------------------- */
/*  Mock data – replace with real API data later                              */
/* -------------------------------------------------------------------------- */

const CATEGORY_OPTIONS = [
  { value: "", label: "All categories" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "cleaning", label: "Cleaning" },
  { value: "ac-repair", label: "AC Repair" },
  { value: "appliance-repair", label: "Appliance Repair" },
  { value: "beauty-salon", label: "Beauty & Salon" },
  { value: "pest-control", label: "Pest Control" },
];

const MOCK_PROVIDERS = [
  {
    id: "prov-1",
    name: "Ahmed Khan",
    primaryService: "General Plumbing",
    category: "plumbing",
    location: "Gulshan-e-Iqbal, Karachi",
    distanceKm: 2.4,
    rating: 4.8,
    reviewCount: 132,
    basePrice: 1500,
    pricingType: "fixed",
    availabilitySummary: "Mon – Sat, 10:00 AM – 8:00 PM",
    shortBio:
      "Reliable plumbing expert providing installation, repair, and maintenance for homes and small businesses.",
    services: [
      {
        name: "Leak Repair",
        description: "Fixing pipe and tap leaks in kitchens and bathrooms.",
        price: 1200,
        pricingType: "fixed",
        duration: "45–60 min",
      },
      {
        name: "New Fixture Installation",
        description: "Installation of sinks, taps, and bathroom fixtures.",
        price: 2000,
        pricingType: "fixed",
        duration: "60–90 min",
      },
    ],
    weeklyAvailability: {
      monday: "10:00 AM – 8:00 PM",
      tuesday: "10:00 AM – 8:00 PM",
      wednesday: "10:00 AM – 8:00 PM",
      thursday: "10:00 AM – 8:00 PM",
      friday: "10:00 AM – 8:00 PM",
      saturday: "10:00 AM – 6:00 PM",
      sunday: "Day off",
    },
    reviews: [
      {
        id: "rev-1",
        customerName: "Ali Raza",
        rating: 5,
        date: "2024-11-12",
        comment:
          "Very professional, arrived on time and fixed the issue quickly.",
      },
      {
        id: "rev-2",
        customerName: "Sara Khan",
        rating: 4,
        date: "2024-10-05",
        comment: "Good quality work. Slightly delayed but overall satisfied.",
      },
    ],
  },
  {
    id: "prov-2",
    name: "Sara Cleaning Services",
    primaryService: "Home Deep Cleaning",
    category: "cleaning",
    location: "DHA Phase 6, Karachi",
    distanceKm: 5.8,
    rating: 4.6,
    reviewCount: 89,
    basePrice: 3500,
    pricingType: "fixed",
    availabilitySummary: "All week, 9:00 AM – 7:00 PM",
    shortBio:
      "Professional team offering deep cleaning for apartments and houses with eco‑friendly products.",
    services: [
      {
        name: "2BHK Deep Cleaning",
        description: "Complete deep clean of a 2BHK apartment.",
        price: 4500,
        pricingType: "fixed",
        duration: "4–5 hours",
      },
      {
        name: "Kitchen Deep Cleaning",
        description:
          "Grease removal, cabinet cleaning, and floor scrubbing service.",
        price: 2000,
        pricingType: "fixed",
        duration: "2–3 hours",
      },
    ],
    weeklyAvailability: {
      monday: "9:00 AM – 7:00 PM",
      tuesday: "9:00 AM – 7:00 PM",
      wednesday: "9:00 AM – 7:00 PM",
      thursday: "9:00 AM – 7:00 PM",
      friday: "9:00 AM – 7:00 PM",
      saturday: "9:00 AM – 7:00 PM",
      sunday: "10:00 AM – 5:00 PM",
    },
    reviews: [
      {
        id: "rev-3",
        customerName: "Bilal Ahmed",
        rating: 5,
        date: "2024-09-22",
        comment: "House looks brand new. Very detailed cleaning.",
      },
      {
        id: "rev-4",
        customerName: "Hina Fatima",
        rating: 4,
        date: "2024-09-01",
        comment: "Good service, team was cooperative and professional.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatCategoryLabel(value) {
  if (!value) return "";
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* -------------------------------------------------------------------------- */
/*  Top-level Container                                                        */
/* -------------------------------------------------------------------------- */

export default function CustomerServiceDiscovery() {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    keywords: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Simulate initial load
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  // Filter providers based on search
  const filteredProviders = useMemo(() => {
    return MOCK_PROVIDERS.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;

      if (
        filters.location &&
        !p.location.toLowerCase().includes(filters.location.trim().toLowerCase())
      ) {
        return false;
      }

      if (filters.keywords) {
        const k = filters.keywords.trim().toLowerCase();
        const haystack = [
          p.name,
          p.primaryService,
          p.shortBio,
          p.location,
          ...p.services.map((s) => s.name),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(k)) return false;
      }

      return true;
    });
  }, [filters]);

  const handleSearch = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(t);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // When a provider is selected we show the profile view
  if (selectedProvider) {
    return (
      <ProviderProfilePage
        provider={selectedProvider}
        onBack={() => setSelectedProvider(null)}
      />
    );
  }

  return (
    <PageShell
      title="Find local service providers"
      subtitle="Browse trusted Karigar professionals near you for home services, repairs, and more."
    >
      <SearchFilters
        filters={filters}
        isLoading={isLoading}
        onFilterChange={handleFilterChange}
        onSubmit={handleSearch}
      />

      <ProviderResults
        providers={filteredProviders}
        isLoading={isLoading}
        onSelectProvider={setSelectedProvider}
      />
    </PageShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Layout components                                                          */
/* -------------------------------------------------------------------------- */

function PageShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-5 md:px-12 md:py-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
                <FaTools className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">Karigar</h1>
            </div>
            <p className="mt-1 text-sm md:text-base text-blue-100 max-w-xl">
              {subtitle}
            </p>
          </div>
          <p className="text-xs text-blue-100 md:text-sm">{title}</p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-5 md:px-12 md:py-8">
        <div className="max-w-6xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Search & Filter section                                                    */
/* -------------------------------------------------------------------------- */

function SearchFilters({ filters, isLoading, onFilterChange, onSubmit }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
      <form
        onSubmit={onSubmit}
        className="space-y-3 md:space-y-0 md:grid md:grid-cols-4 md:gap-3 items-end"
        aria-label="Search for service providers"
      >
        {/* Category */}
        <FilterField label="Service Category">
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FilterField>

        {/* Location */}
        <FilterField label="Location">
          <div className="flex rounded-md shadow-sm border border-gray-300">
            <span className="inline-flex items-center px-3 text-gray-400 text-sm">
              <FaMapMarkerAlt className="h-3.5 w-3.5" />
            </span>
            <input
              id="location"
              name="location"
              type="text"
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
              className="flex-1 rounded-r-md border-0 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Gulshan, DHA"
            />
          </div>
        </FilterField>

        {/* Keywords */}
        <FilterField label="Keywords">
          <div className="flex rounded-md shadow-sm border border-gray-300">
            <span className="inline-flex items-center px-3 text-gray-400 text-sm">
              <FaSearch className="h-3.5 w-3.5" />
            </span>
            <input
              id="keywords"
              name="keywords"
              type="text"
              value={filters.keywords}
              onChange={(e) => onFilterChange("keywords", e.target.value)}
              className="flex-1 rounded-r-md border-0 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Service, provider name, etc."
            />
          </div>
        </FilterField>

        {/* Submit */}
        <div className="md:col-span-1 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center w-full md:w-auto rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-70"
          >
            {isLoading && (
              <SpinnerIcon className="mr-2 h-4 w-4 text-white" />
            )}
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

function FilterField({ label, children }) {
  return (
    <div className="md:col-span-1">
      <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Provider results list                                                      */
/* -------------------------------------------------------------------------- */

function ProviderResults({ providers, isLoading, onSelectProvider }) {
  if (isLoading) {
    return (
      <section aria-label="Loading providers">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </section>
    );
  }

  if (providers.length === 0) {
    return (
      <section aria-label="No providers found">
        <div className="border border-dashed border-gray-200 rounded-lg p-6 text-center text-sm text-gray-500">
          No providers match your search. Try changing category, location, or
          keywords.
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Service provider results">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-800">
          {providers.length}{" "}
          {providers.length === 1 ? "provider" : "providers"} found
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onSelect={() => onSelectProvider(provider)}
          />
        ))}
      </div>
    </section>
  );
}

function ProviderCard({ provider, onSelect }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className="text-left rounded-xl border border-gray-100 bg-white shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
      aria-label={`View profile of ${provider.name}`}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 text-sm font-semibold">
          {provider.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-gray-900">
            {provider.name}
          </p>
          <p className="text-xs text-gray-500">
            {provider.primaryService} · {formatCategoryLabel(provider.category)}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mt-1">
            <span className="inline-flex items-center gap-1">
              <FaStar className="h-3 w-3 text-yellow-400" />
              <span>
                {provider.rating.toFixed(1)} ({provider.reviewCount})
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              <FaRupeeSign className="h-3 w-3 text-gray-400" />
              <span>From {provider.basePrice} PKR</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <FaMapMarkerAlt className="h-3 w-3 text-gray-400" />
              <span>{provider.location}</span>
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {provider.shortBio}
          </p>
        </div>
      </div>
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-4 animate-pulse space-y-3">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="h-3 w-32 bg-gray-200 rounded" />
      <div className="h-3 w-40 bg-gray-200 rounded" />
      <div className="h-3 w-28 bg-gray-200 rounded" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Provider profile page                                                      */
/* -------------------------------------------------------------------------- */

function ProviderProfilePage({ provider, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 md:px-10 md:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FaArrowLeft className="mr-1 h-3 w-3" />
            Back to results
          </button>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
              <FaTools className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-blue-100">Karigar</p>
              <p className="text-sm font-semibold">Provider Profile</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-5 md:px-10 md:py-7">
        <div className="max-w-6xl mx-auto space-y-6">
          <ProviderHeader provider={provider} />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <ProviderServices provider={provider} />
              <ProviderAvailability provider={provider} />
            </div>
            <ProviderReviews provider={provider} />
          </div>
        </div>
      </main>
    </div>
  );
}

function ProviderHeader({ provider }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 text-base font-semibold">
          {provider.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {provider.name}
          </h1>
          <p className="text-xs text-gray-500">
            {provider.primaryService} · {formatCategoryLabel(provider.category)}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1">
              <FaStar className="h-3 w-3 text-yellow-400" />
              <span>
                {provider.rating.toFixed(1)} ({provider.reviewCount} reviews)
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              <FaRupeeSign className="h-3 w-3 text-gray-400" />
              <span>From {provider.basePrice} PKR</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <FaMapMarkerAlt className="h-3 w-3 text-gray-400" />
              <span>{provider.location}</span>
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500 max-w-xl">
            {provider.shortBio}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-xs text-gray-600">
        <p className="font-semibold text-gray-800 flex items-center gap-1">
          <FaClock className="h-3 w-3 text-gray-500" />
          Availability
        </p>
        <p>{provider.availabilitySummary}</p>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Check availability
        </button>
      </div>
    </section>
  );
}

function ProviderServices({ provider }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-3">
        Services Offered
      </h2>
      <div className="space-y-3">
        {provider.services.map((service) => (
          <div
            key={service.name}
            className="rounded-lg border border-gray-100 bg-white p-3 text-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-gray-900">{service.name}</p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <FaRupeeSign className="h-3 w-3 text-gray-400" />
                  <span>{service.price} PKR</span>
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700">
                  {service.pricingType === "hourly"
                    ? "Hourly"
                    : "Fixed Price"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FaClock className="h-3 w-3 text-gray-400" />
                  <span>{service.duration}</span>
                </span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProviderAvailability({ provider }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-3">
        Weekly Availability
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-700">
        {Object.entries(provider.weeklyAvailability).map(([day, hours]) => (
          <div
            key={day}
            className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
          >
            <p className="font-semibold text-gray-800 capitalize">{day}</p>
            <p className="text-gray-600 mt-0.5">{hours}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProviderReviews({ provider }) {
  const { reviews } = provider;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
      <h2 className="text-sm font-semibold text-gray-900">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-xs text-gray-500">
          No reviews yet. Be the first to book and leave feedback.
        </p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-3 text-xs text-gray-700">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 text-[11px] font-semibold">
            {review.customerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 flex items-center gap-1">
              <FaUser className="h-3 w-3 text-gray-400" />
              {review.customerName}
            </p>
            <p className="text-[11px] text-gray-400">{review.date}</p>
          </div>
        </div>
        <RatingStars rating={review.rating} />
      </div>
      <p className="mt-2 text-gray-700">{review.comment}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small reusable UI bits                                                     */
/* -------------------------------------------------------------------------- */

function RatingStars({ rating }) {
  const fullStars = Math.round(rating);

  return (
    <div
      className="inline-flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          className={`h-3 w-3 ${
            index < fullStars ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function SpinnerIcon({ className = "" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
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
  );
}