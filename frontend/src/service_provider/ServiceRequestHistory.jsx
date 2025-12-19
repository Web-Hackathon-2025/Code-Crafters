// src/service_provider/ServiceRequestsHistory.jsx
import { useState, useMemo } from 'react';
import {
  FaTools,
  FaInbox,
  FaHistory,
  FaUser,
  FaClock,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaTimes,
} from 'react-icons/fa';

const initialRequests = [
  {
    id: 'req-1',
    customerName: 'Ali Raza',
    serviceName: 'General Plumbing',
    category: 'plumbing',
    date: '2025-01-05',
    time: '11:00',
    location: 'Gulshan-e-Iqbal, Karachi',
    price: 1800,
    status: 'requested', // requested | confirmed | completed | cancelled
    createdAt: '2024-12-20',
  },
  {
    id: 'req-2',
    customerName: 'Sara Khan',
    serviceName: 'AC Repair',
    category: 'ac-repair',
    date: '2025-01-07',
    time: '16:30',
    location: 'DHA Phase 6, Karachi',
    price: 2500,
    status: 'confirmed',
    createdAt: '2024-12-19',
  },
  {
    id: 'req-3',
    customerName: 'Bilal Ahmed',
    serviceName: 'Kitchen Sink Repair',
    category: 'plumbing',
    date: '2024-12-10',
    time: '14:00',
    location: 'North Nazimabad, Karachi',
    price: 1500,
    status: 'completed',
    createdAt: '2024-12-05',
  },
  {
    id: 'req-4',
    customerName: 'Fatima Noor',
    serviceName: 'House Cleaning',
    category: 'cleaning',
    date: '2024-12-12',
    time: '10:00',
    location: 'Bahadurabad, Karachi',
    price: 3200,
    status: 'cancelled',
    cancelReason: 'Customer requested cancellation',
    createdAt: '2024-12-08',
  },
];

function ServiceRequestsHistory() {
  const [activeSection, setActiveSection] = useState('requests'); // 'requests' | 'history'
  const [requests, setRequests] = useState(initialRequests);
  const [globalAlert, setGlobalAlert] = useState({ type: '', message: '' });

  const [modalState, setModalState] = useState({
    type: null, // 'accept' | 'reject' | 'reschedule' | 'complete' | 'cancel'
    requestId: null,
  });
  const [modalData, setModalData] = useState({
    rejectReason: '',
    newDate: '',
    newTime: '',
  });
  const [modalError, setModalError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [historyFilters, setHistoryFilters] = useState({
    status: 'all', // all | requested | confirmed | completed | cancelled
    fromDate: '',
    toDate: '',
  });

  const bookings = useMemo(
    () => requests.filter((r) => r.status !== 'requested'),
    [requests]
  );

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (historyFilters.status !== 'all' && b.status !== historyFilters.status) {
        return false;
      }
      if (historyFilters.fromDate && b.date < historyFilters.fromDate) return false;
      if (historyFilters.toDate && b.date > historyFilters.toDate) return false;
      return true;
    });
  }, [bookings, historyFilters]);

  const openModal = (type, requestId) => {
    const req = requests.find((r) => r.id === requestId);
    setModalState({ type, requestId });
    setModalError('');
    setGlobalAlert({ type: '', message: '' });

    if (type === 'reject') {
      setModalData({ rejectReason: '', newDate: '', newTime: '' });
    } else if (type === 'reschedule') {
      setModalData({
        rejectReason: '',
        newDate: req?.date || '',
        newTime: req?.time || '',
      });
    } else {
      setModalData({ rejectReason: '', newDate: '', newTime: '' });
    }
  };

  const closeModal = () => {
    setModalState({ type: null, requestId: null });
    setModalData({ rejectReason: '', newDate: '', newTime: '' });
    setModalError('');
    setIsProcessing(false);
  };

  const handleHistoryFilterChange = (e) => {
    const { name, value } = e.target;
    setHistoryFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalFieldChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
    setModalError('');
  };

  const validateReschedule = () => {
    if (!modalData.newDate || !modalData.newTime) {
      setModalError('Please select both date and time.');
      return false;
    }
    const selected = new Date(`${modalData.newDate}T${modalData.newTime}`);
    const now = new Date();
    if (isNaN(selected.getTime())) {
      setModalError('Please provide a valid date and time.');
      return false;
    }
    if (selected <= now) {
      setModalError('You cannot schedule a booking in the past.');
      return false;
    }
    const hour = selected.getHours();
    if (hour < 9 || hour > 21) {
      setModalError('Selected time is outside your usual working hours (9 AM – 9 PM).');
      return false;
    }
    return true;
  };

  const applyAction = async () => {
    const { type, requestId } = modalState;
    if (!type || !requestId) return;

    const current = requests.find((r) => r.id === requestId);
    if (!current) return;

    if (type === 'reject') {
      if (!modalData.rejectReason.trim()) {
        setModalError('Please provide a reason for rejection.');
        return;
      }
    }

    if (type === 'reschedule') {
      if (!validateReschedule()) return;
    }

    setIsProcessing(true);
    setModalError('');
    setGlobalAlert({ type: '', message: '' });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setRequests((prev) =>
        prev.map((r) => {
          if (r.id !== requestId) return r;
          if (type === 'accept') {
            return { ...r, status: 'confirmed' };
          }
          if (type === 'reject') {
            return { ...r, status: 'cancelled', cancelReason: modalData.rejectReason.trim() };
          }
          if (type === 'reschedule') {
            return {
              ...r,
              status: 'confirmed',
              date: modalData.newDate,
              time: modalData.newTime,
            };
          }
          if (type === 'complete') {
            return { ...r, status: 'completed' };
          }
          if (type === 'cancel') {
            return { ...r, status: 'cancelled' };
          }
          return r;
        })
      );

      let message = '';
      if (type === 'accept') message = 'Request accepted and confirmed.';
      if (type === 'reject') message = 'Request rejected successfully.';
      if (type === 'reschedule') message = 'Request rescheduled successfully.';
      if (type === 'complete') message = 'Booking marked as completed.';
      if (type === 'cancel') message = 'Booking cancelled.';

      setGlobalAlert({ type: 'success', message });
      closeModal();
    } catch (err) {
      setModalError('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
            <p className="text-xs text-blue-100">Requests & Bookings</p>
          </div>
        </div>

        <nav className="px-3 py-4 space-y-1">
          <SidebarItem
            label="Service Requests"
            icon={FaInbox}
            active={activeSection === 'requests'}
            onClick={() => setActiveSection('requests')}
          />
          <SidebarItem
            label="Booking History"
            icon={FaHistory}
            active={activeSection === 'history'}
            onClick={() => setActiveSection('history')}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {activeSection === 'requests' ? 'Service Requests' : 'Booking History'}
            </h2>
            <p className="text-sm text-gray-500">
              {activeSection === 'requests'
                ? 'Review and manage incoming service requests.'
                : 'View your confirmed, completed, and cancelled bookings.'}
            </p>
          </div>
        </header>

        {globalAlert.message && (
          <div className="mb-4">
            <AlertBanner type={globalAlert.type} message={globalAlert.message} />
          </div>
        )}

        {activeSection === 'requests' ? (
          <RequestsSection
            requests={requests}
            onOpenModal={openModal}
          />
        ) : (
          <HistorySection
            bookings={filteredBookings}
            filters={historyFilters}
            onFilterChange={handleHistoryFilterChange}
          />
        )}
      </main>

      {/* Action Modal */}
      {modalState.type && (
        <ActionModal
          type={modalState.type}
          request={requests.find((r) => r.id === modalState.requestId)}
          modalData={modalData}
          modalError={modalError}
          isProcessing={isProcessing}
          onChange={handleModalFieldChange}
          onClose={closeModal}
          onConfirm={applyAction}
        />
      )}
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

/* ---------- Requests Section ---------- */

function RequestsSection({ requests, onOpenModal }) {
  const incoming = requests.filter((r) => r.status === 'requested' || r.status === 'confirmed');

  return (
    <section className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FaInbox className="h-4 w-4 text-blue-600" />
            Incoming Requests
          </h3>
          <span className="text-xs text-gray-500">
            {incoming.length} {incoming.length === 1 ? 'request' : 'requests'}
          </span>
        </div>

        {incoming.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center text-sm text-gray-500">
            You currently have no incoming requests. New customer requests will appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {incoming.map((req) => (
              <div
                key={req.id}
                className="flex flex-col md:flex-row md:items-start justify-between gap-3 rounded-lg border border-gray-100 bg-white shadow-sm p-4"
              >
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      {req.customerName.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <FaUser className="h-3 w-3 text-gray-400" />
                        {req.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {req.serviceName} · {formatCategoryLabel(req.category)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <FaCalendarAlt className="h-3 w-3 text-gray-400" />
                      <span>
                        {req.date} · {req.time}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FaMapMarkerAlt className="h-3 w-3 text-gray-400" />
                      <span>{req.location}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FaRupeeSign className="h-3 w-3 text-gray-400" />
                      <span>{req.price} PKR</span>
                    </span>
                    <StatusPill status={req.status} />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 justify-end">
                  {req.status === 'requested' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onOpenModal('accept', req.id)}
                        className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <FaCheckCircle className="mr-1 h-3 w-3" />
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenModal('reject', req.id)}
                        className="inline-flex items-center rounded-md border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <FaTimesCircle className="mr-1 h-3 w-3" />
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenModal('reschedule', req.id)}
                        className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <FaClock className="mr-1 h-3 w-3" />
                        Reschedule
                      </button>
                    </>
                  )}

                  {req.status === 'confirmed' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onOpenModal('complete', req.id)}
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <FaCheckCircle className="mr-1 h-3 w-3" />
                        Mark Completed
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenModal('cancel', req.id)}
                        className="inline-flex items-center rounded-md border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <FaTimesCircle className="mr-1 h-3 w-3" />
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenModal('reschedule', req.id)}
                        className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <FaClock className="mr-1 h-3 w-3" />
                        Reschedule
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Booking History Section ---------- */

function HistorySection({ bookings, filters, onFilterChange }) {
  return (
    <section className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FaHistory className="h-4 w-4 text-blue-600" />
              Booking History
            </h3>
            <p className="text-xs text-gray-500">
              Filter and review your past and upcoming bookings.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={onFilterChange}
                className="block w-32 rounded-md border border-gray-300 px-2 py-1.5 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={onFilterChange}
                className="block w-32 rounded-md border border-gray-300 px-2 py-1.5 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={onFilterChange}
                className="block w-32 rounded-md border border-gray-300 px-2 py-1.5 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center text-sm text-gray-500">
            No bookings match the selected filters.
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex flex-col md:flex-row md:items-start justify-between gap-3 rounded-lg border border-gray-100 bg-white shadow-sm p-4"
              >
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      {b.customerName.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <FaUser className="h-3 w-3 text-gray-400" />
                        {b.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {b.serviceName} · {formatCategoryLabel(b.category)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <FaCalendarAlt className="h-3 w-3 text-gray-400" />
                      <span>
                        {b.date} · {b.time}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FaMapMarkerAlt className="h-3 w-3 text-gray-400" />
                      <span>{b.location}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FaRupeeSign className="h-3 w-3 text-gray-400" />
                      <span>{b.price} PKR</span>
                    </span>
                    <StatusPill status={b.status} />
                  </div>

                  {b.status === 'cancelled' && b.cancelReason && (
                    <p className="mt-1 text-xs text-red-600">
                      Cancelled: {b.cancelReason}
                    </p>
                  )}
                </div>

                <div className="text-xs text-gray-400 self-end">
                  Created on {b.createdAt}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Shared UI ---------- */

function StatusPill({ status }) {
  const map = {
    requested: {
      label: 'Requested',
      classes: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    confirmed: {
      label: 'Confirmed',
      classes: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    completed: {
      label: 'Completed',
      classes: 'bg-green-50 text-green-700 border-green-100',
    },
    cancelled: {
      label: 'Cancelled',
      classes: 'bg-red-50 text-red-700 border-red-100',
    },
  };
  const cfg = map[status] || map.requested;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
}

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

function ActionModal({
  type,
  request,
  modalData,
  modalError,
  isProcessing,
  onChange,
  onClose,
  onConfirm,
}) {
  if (!request) return null;

  const titles = {
    accept: 'Accept Request',
    reject: 'Reject Request',
    reschedule: 'Reschedule Request',
    complete: 'Mark as Completed',
    cancel: 'Cancel Booking',
  };

  const descriptions = {
    accept: 'Are you sure you want to accept this service request?',
    reject: 'Please provide a reason for rejecting this request.',
    reschedule: 'Select a new date and time for this booking.',
    complete: 'Confirm that this booking has been successfully completed.',
    cancel: 'Are you sure you want to cancel this confirmed booking?',
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">
            {titles[type] || 'Action'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        <div className="px-4 py-3 text-sm space-y-3">
          <p className="text-gray-700">{descriptions[type]}</p>

          <div className="rounded-md bg-gray-50 border border-gray-100 p-3 space-y-1 text-xs text-gray-600">
            <p className="font-semibold text-gray-800 flex items-center gap-1">
              <FaUser className="h-3 w-3 text-gray-400" />
              {request.customerName}
            </p>
            <p>
              {request.serviceName} · {formatCategoryLabel(request.category)}
            </p>
            <p className="flex items-center gap-1">
              <FaCalendarAlt className="h-3 w-3 text-gray-400" />
              {request.date} · {request.time}
            </p>
            <p className="flex items-center gap-1">
              <FaMapMarkerAlt className="h-3 w-3 text-gray-400" />
              {request.location}
            </p>
          </div>

          {type === 'reject' && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Rejection Reason
              </label>
              <textarea
                name="rejectReason"
                rows={3}
                value={modalData.rejectReason}
                onChange={onChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Explain why you are rejecting this request."
              />
            </div>
          )}

          {type === 'reschedule' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  New Date
                </label>
                <input
                  type="date"
                  name="newDate"
                  value={modalData.newDate}
                  onChange={onChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  New Time
                </label>
                <input
                  type="time"
                  name="newTime"
                  value={modalData.newTime}
                  onChange={onChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {modalError && <p className="text-xs text-red-600">{modalError}</p>}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              type === 'reject' || type === 'cancel'
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            } disabled:opacity-70`}
          >
            {isProcessing && (
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
            {type === 'accept' && 'Confirm Accept'}
            {type === 'reject' && 'Confirm Reject'}
            {type === 'reschedule' && 'Confirm Reschedule'}
            {type === 'complete' && 'Mark Completed'}
            {type === 'cancel' && 'Confirm Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
}

function formatCategoryLabel(value) {
  return value
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default ServiceRequestsHistory;