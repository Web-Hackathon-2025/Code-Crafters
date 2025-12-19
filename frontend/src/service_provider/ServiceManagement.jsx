// src/service_provider/ServiceManagement.jsx
import { useState } from 'react';
import {
  FaTools,
  FaListUl,
  FaClock,
  FaPlus,
  FaTrash,
  FaEdit,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaTimes,
} from 'react-icons/fa';

const serviceCategoryOptions = [
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

const initialServices = [
  {
    id: 'svc-1',
    name: 'General Plumbing',
    category: 'plumbing',
    description: 'Leak fixing, pipe installation, and basic plumbing repair services.',
    basePrice: '1500',
    pricingType: 'fixed',
    duration: '60',
  },
];

const daysOfWeek = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

const initialWeeklyAvailability = {
  monday: { isDayOff: false, slots: [{ id: 'mon-1', start: '10:00', end: '18:00' }] },
  tuesday: { isDayOff: false, slots: [] },
  wednesday: { isDayOff: false, slots: [] },
  thursday: { isDayOff: false, slots: [] },
  friday: { isDayOff: false, slots: [] },
  saturday: { isDayOff: true, slots: [] },
  sunday: { isDayOff: true, slots: [] },
};

const initialBlockedPeriods = [];

function ServiceManagement() {
  const [activeSection, setActiveSection] = useState('services'); // 'services' | 'availability'

  const [services, setServices] = useState(initialServices);
  const [serviceForm, setServiceForm] = useState({
    id: null,
    name: '',
    category: '',
    description: '',
    basePrice: '',
    pricingType: 'fixed',
    duration: '',
  });
  const [serviceErrors, setServiceErrors] = useState({});
  const [serviceAlert, setServiceAlert] = useState({ type: '', message: '' });
  const [isSavingService, setIsSavingService] = useState(false);

  const [weeklyAvailability, setWeeklyAvailability] = useState(initialWeeklyAvailability);
  const [blockedPeriods, setBlockedPeriods] = useState(initialBlockedPeriods);
  const [slotForm, setSlotForm] = useState({
    dayKey: 'monday',
    start: '',
    end: '',
  });
  const [slotError, setSlotError] = useState('');
  const [blockedForm, setBlockedForm] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [blockedError, setBlockedError] = useState('');
  const [availabilityAlert, setAvailabilityAlert] = useState({ type: '', message: '' });
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);

  // ---------- Service Management ----------

  const handleServiceFieldChange = (e) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({ ...prev, [name]: value }));
    if (serviceErrors[name]) {
      setServiceErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setServiceAlert({ type: '', message: '' });
  };

  const validateServiceForm = () => {
    const errors = {};
    if (!serviceForm.name.trim()) errors.name = 'Service name is required';
    if (!serviceForm.category) errors.category = 'Please select a category';
    if (!serviceForm.description.trim()) errors.description = 'Description is required';
    if (!serviceForm.basePrice.trim()) errors.basePrice = 'Base price is required';
    else if (isNaN(Number(serviceForm.basePrice)) || Number(serviceForm.basePrice) <= 0) {
      errors.basePrice = 'Enter a valid positive number';
    }
    if (!serviceForm.duration.trim()) errors.duration = 'Estimated duration is required';
    else if (isNaN(Number(serviceForm.duration)) || Number(serviceForm.duration) <= 0) {
      errors.duration = 'Enter duration in minutes (positive number)';
    }

    setServiceErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetServiceForm = () => {
    setServiceForm({
      id: null,
      name: '',
      category: '',
      description: '',
      basePrice: '',
      pricingType: 'fixed',
      duration: '',
    });
    setServiceErrors({});
    setServiceAlert({ type: '', message: '' });
  };

  const handleEditService = (service) => {
    setServiceForm(service);
    setServiceAlert({ type: '', message: '' });
  };

  const handleDeleteService = (id) => {
    setServices((prev) => prev.filter((svc) => svc.id !== id));
    if (serviceForm.id === id) {
      resetServiceForm();
    }
    setServiceAlert({ type: 'success', message: 'Service removed successfully.' });
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    setServiceAlert({ type: '', message: '' });

    if (!validateServiceForm()) return;

    setIsSavingService(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (serviceForm.id) {
        // update
        setServices((prev) =>
          prev.map((svc) => (svc.id === serviceForm.id ? { ...serviceForm } : svc)),
        );
        setServiceAlert({ type: 'success', message: 'Service updated successfully.' });
      } else {
        const newService = {
          ...serviceForm,
          id: `svc-${Date.now()}`,
        };
        setServices((prev) => [...prev, newService]);
        setServiceAlert({ type: 'success', message: 'Service added successfully.' });
      }
      resetServiceForm();
    } catch (err) {
      setServiceAlert({
        type: 'error',
        message: 'Could not save service. Please try again.',
      });
    } finally {
      setIsSavingService(false);
    }
  };

  // ---------- Availability Management ----------

  const timeToMinutes = (time) => {
    const [h, m] = time.split(':').map((t) => parseInt(t, 10));
    if (isNaN(h) || isNaN(m)) return NaN;
    return h * 60 + m;
  };

  const hasOverlap = (slots, start, end) => {
    const startMin = timeToMinutes(start);
    const endMin = timeToMinutes(end);
    if (isNaN(startMin) || isNaN(endMin)) return true;

    return slots.some((slot) => {
      const s = timeToMinutes(slot.start);
      const e = timeToMinutes(slot.end);
      if (isNaN(s) || isNaN(e)) return false;
      return !(endMin <= s || startMin >= e);
    });
  };

  const handleWeeklySlotChange = (e) => {
    const { name, value } = e.target;
    setSlotForm((prev) => ({ ...prev, [name]: value }));
    setSlotError('');
    setAvailabilityAlert({ type: '', message: '' });
  };

  const handleToggleDayOff = (dayKey) => {
    setWeeklyAvailability((prev) => {
      const day = prev[dayKey];
      const isDayOff = !day.isDayOff;
      return {
        ...prev,
        [dayKey]: {
          isDayOff,
          slots: isDayOff ? [] : day.slots,
        },
      };
    });
    setAvailabilityAlert({ type: '', message: '' });
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    setSlotError('');
    const { dayKey, start, end } = slotForm;

    if (!start || !end) {
      setSlotError('Please provide both start and end time.');
      return;
    }

    const startMin = timeToMinutes(start);
    const endMin = timeToMinutes(end);
    if (isNaN(startMin) || isNaN(endMin) || startMin >= endMin) {
      setSlotError('End time must be later than start time.');
      return;
    }

    const day = weeklyAvailability[dayKey];
    if (!day || day.isDayOff) {
      setSlotError('This day is marked as off. Enable it before adding slots.');
      return;
    }

    if (hasOverlap(day.slots, start, end)) {
      setSlotError('This time slot overlaps with an existing slot.');
      return;
    }

    const newSlot = {
      id: `${dayKey}-${Date.now()}`,
      start,
      end,
    };

    setWeeklyAvailability((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        slots: [...prev[dayKey].slots, newSlot],
      },
    }));

    setSlotForm((prev) => ({ ...prev, start: '', end: '' }));
  };

  const handleDeleteSlot = (dayKey, slotId) => {
    setWeeklyAvailability((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        slots: prev[dayKey].slots.filter((slot) => slot.id !== slotId),
      },
    }));
  };

  const handleBlockedFieldChange = (e) => {
    const { name, value } = e.target;
    setBlockedForm((prev) => ({ ...prev, [name]: value }));
    setBlockedError('');
    setAvailabilityAlert({ type: '', message: '' });
  };

  const handleAddBlockedPeriod = (e) => {
    e.preventDefault();
    setBlockedError('');
    const { startDate, endDate, reason } = blockedForm;

    if (!startDate || !endDate) {
      setBlockedError('Please select both start and end date.');
      return;
    }
    if (endDate < startDate) {
      setBlockedError('End date must be on or after start date.');
      return;
    }

    const newPeriod = {
      id: `blk-${Date.now()}`,
      startDate,
      endDate,
      reason: reason.trim() || 'Unavailable',
    };

    setBlockedPeriods((prev) => [...prev, newPeriod]);
    setBlockedForm({ startDate: '', endDate: '', reason: '' });
  };

  const handleDeleteBlockedPeriod = (id) => {
    setBlockedPeriods((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveAvailability = async () => {
    setAvailabilityAlert({ type: '', message: '' });
    setIsSavingAvailability(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setAvailabilityAlert({
        type: 'success',
        message: 'Availability settings updated successfully.',
      });
    } catch (err) {
      setAvailabilityAlert({
        type: 'error',
        message: 'Could not save availability. Please try again.',
      });
    } finally {
      setIsSavingAvailability(false);
    }
  };

  const handleResetAvailability = () => {
    setWeeklyAvailability(initialWeeklyAvailability);
    setBlockedPeriods(initialBlockedPeriods);
    setSlotForm({ dayKey: 'monday', start: '', end: '' });
    setBlockedForm({ startDate: '', endDate: '', reason: '' });
    setSlotError('');
    setBlockedError('');
    setAvailabilityAlert({ type: '', message: '' });
  };

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
            <p className="text-xs text-blue-100">Service & Availability</p>
          </div>
        </div>

        <nav className="px-3 py-4 space-y-1">
          <SidebarItem
            label="Services"
            icon={FaListUl}
            active={activeSection === 'services'}
            onClick={() => setActiveSection('services')}
          />
          <SidebarItem
            label="Availability"
            icon={FaClock}
            active={activeSection === 'availability'}
            onClick={() => setActiveSection('availability')}
          />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {activeSection === 'services' ? 'Services' : 'Availability'}
            </h2>
            <p className="text-sm text-gray-500">
              {activeSection === 'services'
                ? 'Define the services you offer, pricing, and duration.'
                : 'Configure your weekly schedule and temporary unavailability.'}
            </p>
          </div>
        </header>

        {activeSection === 'services' ? (
          <ServicesSection
            services={services}
            serviceForm={serviceForm}
            serviceErrors={serviceErrors}
            serviceAlert={serviceAlert}
            isSavingService={isSavingService}
            onServiceFieldChange={handleServiceFieldChange}
            onSaveService={handleSaveService}
            onCancelService={resetServiceForm}
            onEditService={handleEditService}
            onDeleteService={handleDeleteService}
          />
        ) : (
          <AvailabilitySection
            weeklyAvailability={weeklyAvailability}
            blockedPeriods={blockedPeriods}
            slotForm={slotForm}
            slotError={slotError}
            blockedForm={blockedForm}
            blockedError={blockedError}
            availabilityAlert={availabilityAlert}
            isSavingAvailability={isSavingAvailability}
            onToggleDayOff={handleToggleDayOff}
            onSlotFieldChange={handleWeeklySlotChange}
            onAddSlot={handleAddSlot}
            onDeleteSlot={handleDeleteSlot}
            onBlockedFieldChange={handleBlockedFieldChange}
            onAddBlockedPeriod={handleAddBlockedPeriod}
            onDeleteBlockedPeriod={handleDeleteBlockedPeriod}
            onSaveAvailability={handleSaveAvailability}
            onResetAvailability={handleResetAvailability}
          />
        )}
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

// ---------- Services UI ----------

function ServicesSection({
  services,
  serviceForm,
  serviceErrors,
  serviceAlert,
  isSavingService,
  onServiceFieldChange,
  onSaveService,
  onCancelService,
  onEditService,
  onDeleteService,
}) {
  const isEditing = Boolean(serviceForm.id);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2 space-y-4">
        {serviceAlert.message && (
          <AlertBanner type={serviceAlert.type} message={serviceAlert.message} />
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FaListUl className="h-4 w-4 text-blue-600" />
              Your Services
            </h3>
            <span className="text-xs text-gray-500">
              {services.length} {services.length === 1 ? 'service' : 'services'}
            </span>
          </div>

          {services.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center text-sm text-gray-500">
              You haven&apos;t added any services yet. Use the form on the right to create your
              first service.
            </div>
          ) : (
            <div className="space-y-3">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 rounded-lg border border-gray-100 bg-white shadow-sm p-4"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      {svc.name}
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        {formatCategoryLabel(svc.category)}
                      </span>
                    </h4>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{svc.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                      <span className="inline-flex items-center gap-1">
                        <FaRupeeSign className="h-3 w-3 text-gray-400" />
                        <span>{svc.basePrice} PKR</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaClock className="h-3 w-3 text-gray-400" />
                        <span>{svc.duration} min</span>
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700">
                        {svc.pricingType === 'hourly' ? 'Hourly' : 'Fixed Price'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => onEditService(svc)}
                      className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FaEdit className="mr-1 h-3 w-3" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteService(svc.id)}
                      className="inline-flex items-center rounded-md border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <FaTrash className="mr-1 h-3 w-3" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <form
          onSubmit={onSaveService}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FaPlus className="h-4 w-4 text-blue-600" />
              {isEditing ? 'Edit Service' : 'Add New Service'}
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Service Name</label>
              <input
                name="name"
                type="text"
                value={serviceForm.name}
                onChange={onServiceFieldChange}
                className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  serviceErrors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g. Kitchen Sink Repair"
              />
              {serviceErrors.name && (
                <p className="mt-1 text-xs text-red-600">{serviceErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={serviceForm.category}
                onChange={onServiceFieldChange}
                className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  serviceErrors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                {serviceCategoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {formatCategoryLabel(cat)}
                  </option>
                ))}
              </select>
              {serviceErrors.category && (
                <p className="mt-1 text-xs text-red-600">{serviceErrors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                rows={3}
                value={serviceForm.description}
                onChange={onServiceFieldChange}
                className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  serviceErrors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe what this service includes."
              />
              {serviceErrors.description && (
                <p className="mt-1 text-xs text-red-600">{serviceErrors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Base Price (PKR)
                </label>
                <div
                  className={`flex rounded-md shadow-sm border ${
                    serviceErrors.basePrice ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <span className="inline-flex items-center px-3 text-gray-400 text-sm">
                    <FaRupeeSign className="h-3 w-3" />
                  </span>
                  <input
                    name="basePrice"
                    type="text"
                    value={serviceForm.basePrice}
                    onChange={onServiceFieldChange}
                    className="flex-1 rounded-r-md border-0 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. 1500"
                  />
                </div>
                {serviceErrors.basePrice && (
                  <p className="mt-1 text-xs text-red-600">{serviceErrors.basePrice}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Pricing Type
                </label>
                <select
                  name="pricingType"
                  value={serviceForm.pricingType}
                  onChange={onServiceFieldChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Estimated Duration (minutes)
              </label>
              <input
                name="duration"
                type="text"
                value={serviceForm.duration}
                onChange={onServiceFieldChange}
                className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  serviceErrors.duration ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g. 60"
              />
              {serviceErrors.duration && (
                <p className="mt-1 text-xs text-red-600">{serviceErrors.duration}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancelService}
              disabled={isSavingService}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSavingService}
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-70"
            >
              {isSavingService && (
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
              {isEditing ? 'Update Service' : 'Save Service'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

// ---------- Availability UI ----------

function AvailabilitySection({
  weeklyAvailability,
  blockedPeriods,
  slotForm,
  slotError,
  blockedForm,
  blockedError,
  availabilityAlert,
  isSavingAvailability,
  onToggleDayOff,
  onSlotFieldChange,
  onAddSlot,
  onDeleteSlot,
  onBlockedFieldChange,
  onAddBlockedPeriod,
  onDeleteBlockedPeriod,
  onSaveAvailability,
  onResetAvailability,
}) {
  return (
    <div className="space-y-6">
      {availabilityAlert.message && (
        <AlertBanner type={availabilityAlert.type} message={availabilityAlert.message} />
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <FaClock className="h-4 w-4 text-blue-600" />
                Weekly Schedule
              </h3>
            </div>

            <div className="space-y-3">
              {daysOfWeek.map((day) => {
                const config = weeklyAvailability[day.key];
                const isDayOff = config?.isDayOff;
                const slots = config?.slots || [];

                return (
                  <div
                    key={day.key}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">{day.label}</span>
                      <button
                        type="button"
                        onClick={() => onToggleDayOff(day.key)}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium border transition-colors ${
                          isDayOff
                            ? 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            : 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'
                        }`}
                      >
                        {isDayOff ? 'Day Off' : 'Available'}
                      </button>
                    </div>
                    <div className="flex-1 flex flex-wrap items-center gap-2">
                      {isDayOff || slots.length === 0 ? (
                        <span className="text-xs text-gray-400">
                          {isDayOff ? 'No slots (day off)' : 'No slots added'}
                        </span>
                      ) : (
                        slots.map((slot) => (
                          <span
                            key={slot.id}
                            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-800 border border-blue-100"
                          >
                            {slot.start} – {slot.end}
                            <button
                              type="button"
                              onClick={() => onDeleteSlot(day.key, slot.id)}
                              className="ml-1 text-blue-500 hover:text-blue-700"
                            >
                              <FaTimes className="h-2.5 w-2.5" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Add Time Slot</h3>
            {slotError && <p className="mb-2 text-xs text-red-600">{slotError}</p>}
            <form
              onSubmit={onAddSlot}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
            >
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Day</label>
                <select
                  name="dayKey"
                  value={slotForm.dayKey}
                  onChange={onSlotFieldChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {daysOfWeek.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Start</label>
                <input
                  type="time"
                  name="start"
                  value={slotForm.start}
                  onChange={onSlotFieldChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">End</label>
                <input
                  type="time"
                  name="end"
                  value={slotForm.end}
                  onChange={onSlotFieldChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                  <FaPlus className="mr-1 h-3 w-3" />
                  Add Slot
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <FaMapMarkerAlt className="h-4 w-4 text-blue-600" />
                Temporary Unavailability
              </h3>
            </div>

            {blockedError && <p className="mb-2 text-xs text-red-600">{blockedError}</p>}

            <form onSubmit={onAddBlockedPeriod} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={blockedForm.startDate}
                    onChange={onBlockedFieldChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={blockedForm.endDate}
                    onChange={onBlockedFieldChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Reason</label>
                <input
                  type="text"
                  name="reason"
                  value={blockedForm.reason}
                  onChange={onBlockedFieldChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Optional note (e.g. Vacation, Maintenance)"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                  <FaPlus className="mr-1 h-3 w-3" />
                  Add Blocked Period
                </button>
              </div>
            </form>

            <div className="mt-4 space-y-2">
              {blockedPeriods.length === 0 ? (
                <p className="text-xs text-gray-400">
                  No temporary unavailability configured.
                </p>
              ) : (
                blockedPeriods.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-700"
                  >
                    <div>
                      <p className="font-medium">
                        {p.startDate} &rarr; {p.endDate}
                      </p>
                      <p className="text-gray-500">{p.reason}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteBlockedPeriod(p.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <FaTrash className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onResetAvailability}
                disabled={isSavingAvailability}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-60"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={onSaveAvailability}
                disabled={isSavingAvailability}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-70"
              >
                {isSavingAvailability && (
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
                Save Availability
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ---------- Shared UI ----------

function AlertBanner({ type, message }) {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div
      className={`flex items-start gap-2 rounded-md px-3 py-2 text-sm border ${
        isError
          ? 'bg-red-50 text-red-800 border-red-200'
          : 'bg-green-50 text-green-800 border-green-200'
      }`}
    >
      <span className="font-semibold">{isError ? 'Error:' : 'Success:'}</span>
      <span>{message}</span>
    </div>
  );
}

function formatCategoryLabel(value) {
  return value
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default ServiceManagement;