// src/landing/KarigarLandingPage.jsx
import {
  FaTools,
  FaSearch,
  FaUserCheck,
  FaCalendarCheck,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

function KarigarLandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                     */
/* -------------------------------------------------------------------------- */

function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
            <FaTools className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold leading-tight">Karigar</p>
            <p className="text-[11px] text-gray-400">
              Hyperlocal Services Marketplace
            </p>
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-6 text-xs font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#testimonials" className="hover:text-white transition-colors">
            Testimonials
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/customer"
            className="hidden sm:inline-flex items-center rounded-md border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-200 hover:bg-gray-800 transition-colors"
          >
            Sign In
          </a>
          <a
            href="/service-provider/auth"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Get Started
            <FaArrowRight className="ml-1.5 h-3 w-3" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero Section                                                               */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-300 mb-4">
            <FaCheckCircle className="mr-1.5 h-3 w-3" />
            Hyperlocal · Trusted · Fast
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Find Trusted Local Services<span className="text-blue-400"> Near You</span>
          </h1>

          <p className="text-sm md:text-base text-gray-300 mb-6 max-w-xl">
            Karigar connects you with verified plumbers, electricians, cleaners,
            and more in your neighborhood. Browse, compare, and book services
            in just a few taps.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="/"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
            >
              Get Started
              <FaArrowRight className="ml-2 h-3 w-3" />
            </a>
            <a
              href="/customer-service"
              className="inline-flex items-center rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-xs md:text-sm font-medium text-gray-200 hover:bg-gray-800 transition-colors"
            >
              Explore Services
            </a>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center">
                <FaStar className="h-3 w-3 text-yellow-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-200">4.8/5 average rating</p>
                <p>Based on customer reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center">
                <FaUserCheck className="h-3 w-3 text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-200">Verified providers</p>
                <p>Background & quality checked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side graphic */}
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-400">Popular near you</p>
                <p className="text-sm font-semibold text-white">
                  Today&apos;s Top Services
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/40">
                Live bookings
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <MiniServiceRow
                icon={<FaTools className="h-3.5 w-3.5 text-blue-400" />}
                title="Plumbing & Leak Repair"
                subtitle="Starting from 1500 PKR"
                badge="Under 60 mins"
              />
              <MiniServiceRow
                icon={<FaTools className="h-3.5 w-3.5 text-emerald-400" />}
                title="Home Deep Cleaning"
                subtitle="Starting from 3500 PKR"
                badge="Best for families"
              />
              <MiniServiceRow
                icon={<FaTools className="h-3.5 w-3.5 text-indigo-400" />}
                title="AC Repair & Service"
                subtitle="Starting from 2000 PKR"
                badge="Seasonal demand"
              />
            </div>

            <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
              <p>Instant booking · Secure payments · 24/7 support</p>
              <FaArrowRight className="h-3 w-3 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniServiceRow({ icon, title, subtitle, badge }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-gray-800 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-100">{title}</p>
          <p className="text-[11px] text-gray-400">{subtitle}</p>
        </div>
      </div>
      <span className="text-[10px] rounded-full bg-gray-800 px-2 py-0.5 text-gray-300 border border-gray-700">
        {badge}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Features Section                                                           */
/* -------------------------------------------------------------------------- */

function FeaturesSection() {
  const features = [
    {
      title: "Browse & Book Local Services",
      description:
        "Search by category, location, and keywords to quickly find the right professional for your job.",
      icon: <FaSearch className="h-5 w-5" />,
    },
    {
      title: "Trusted Service Providers",
      description:
        "All providers are verified and rated by customers so you can book with confidence.",
      icon: <FaUserCheck className="h-5 w-5" />,
    },
    {
      title: "Easy Scheduling & Payments",
      description:
        "Pick a time that works for you and pay securely through the Karigar platform.",
      icon: <FaCalendarCheck className="h-5 w-5" />,
    },
  ];

  return (
    <section id="features" className="bg-gray-950 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
            Why Customers Love Karigar
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            A single place to discover, compare, and book reliable local services—
            all from the comfort of your home.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow duration-200"
            >
              <div className="h-9 w-9 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Testimonials Section                                                       */
/* -------------------------------------------------------------------------- */

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ali Raza",
      role: "Customer · Karachi",
      rating: 5,
      quote:
        "Booked a plumber through Karigar and the service was outstanding. Fast, professional, and transparent pricing.",
    },
    {
      name: "Sara Cleaning Services",
      role: "Service Provider · Karachi",
      rating: 4.8,
      quote:
        "Karigar helps us reach nearby customers every day. The booking and payment flow is smooth and easy.",
    },
    {
      name: "Bilal Ahmed",
      role: "Customer · Lahore",
      rating: 4.7,
      quote:
        "I love how I can see ratings and reviews before booking. It makes it easy to choose the right provider.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="bg-gray-900 border-t border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
            Loved by Customers & Providers
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Real stories from people who rely on Karigar for their everyday
            service needs.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-md"
            >
              <FaQuoteLeft className="absolute -top-3 -left-3 h-6 w-6 text-blue-500/40" />
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] text-gray-400">{t.role}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-yellow-400">
                  <FaStar className="h-3 w-3" />
                  <span>{t.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-300">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How It Works Section                                                       */
/* -------------------------------------------------------------------------- */

function HowItWorksSection() {
  const steps = [
    {
      title: "1. Search",
      description:
        "Select your service category, set your location, and browse verified providers nearby.",
    },
    {
      title: "2. Book",
      description:
        "Compare ratings, pricing, and availability. Pick a convenient time and confirm your booking.",
    },
    {
      title: "3. Enjoy Service",
      description:
        "Your provider arrives on time, completes the job, and you pay securely through Karigar.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-gray-950 border-t border-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
            How Karigar Works
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            A simple, three-step journey from discovering local experts to
            enjoying hassle-free service at your doorstep.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-md"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3 text-xs font-semibold">
                {idx + 1}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-gray-400">
        <div>
          <p className="font-semibold text-gray-200 mb-1">Karigar</p>
          <p>Connecting you with trusted local service providers.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <a href="#terms" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#privacy" className="hover:text-white transition-colors">
            Privacy
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#facebook"
            className="h-7 w-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Visit Karigar on Facebook"
          >
            <FaFacebookF className="h-3.5 w-3.5" />
          </a>
          <a
            href="#twitter"
            className="h-7 w-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Visit Karigar on Twitter"
          >
            <FaTwitter className="h-3.5 w-3.5" />
          </a>
          <a
            href="#instagram"
            className="h-7 w-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Visit Karigar on Instagram"
          >
            <FaInstagram className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default KarigarLandingPage;