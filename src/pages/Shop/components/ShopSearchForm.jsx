import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import { format, startOfDay, isBefore, isAfter } from 'date-fns';
import { clearProducts, setBaseParams } from '../../../store/slices/productsSlice';
import 'react-day-picker/style.css';

// ---------- Icons ----------
const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ---------- Helper: today at midnight ----------
const today = startOfDay(new Date());

// ---------- Hook: click outside to close ----------
function useClickOutside(ref, onClose) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onClose]);
}

// ---------- Hook: responsive months (2 on desktop, 1 on mobile) ----------
function useResponsiveMonths() {
  const [months, setMonths] = useState(() => {
    if (typeof window === 'undefined') return 1;
    return window.innerWidth >= 768 ? 2 : 1;
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setMonths(window.innerWidth >= 768 ? 2 : 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return months;
}

// ---------- Main Component ----------
const ShopSearchForm = () => {
  const { shopName, publicToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Confirmed range (after OK)
  const [range, setRange] = useState({ from: undefined, to: undefined });
  // Temporary range (while calendar is open)
  const [tempRange, setTempRange] = useState({ from: undefined, to: undefined });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarKey, setCalendarKey] = useState(0); // forces remount on clear
  const [pickupTime, setPickupTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});

  const calendarRef = useRef(null);
  const monthsCount = useResponsiveMonths();

  const closeCalendar = useCallback(() => setIsCalendarOpen(false), []);
  useClickOutside(calendarRef, closeCalendar);

  // ---------- Range selection logic (hotel‑style) ----------
  const handleRangeSelect = (rangeOrDate) => {
    // react-day-picker's onSelect gives { from, to } for range mode
    if (!rangeOrDate) return;
    const { from, to } = rangeOrDate;
    setTempRange({ from, to });
    setErrors({});
  };

  const openCalendar = () => {
    setTempRange({ from: range.from, to: range.to });
    setIsCalendarOpen(true);
  };

  const confirmDates = () => {
    if (tempRange.from && tempRange.to) {
      setRange({ from: tempRange.from, to: tempRange.to });
    } else if (tempRange.from && !tempRange.to) {
      // Only pickup selected – treat as invalid range (clear)
      setRange({ from: undefined, to: undefined });
    } else {
      setRange({ from: undefined, to: undefined });
    }
    setIsCalendarOpen(false);
    setErrors({});
  };

  const clearDates = () => {
    setTempRange({ from: undefined, to: undefined });
    setCalendarKey(prev => prev + 1);   // force calendar UI reset
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!range.from) errs.pickupDate = 'Pickup date is required';
    if (!range.to) errs.returnDate = 'Return date is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      if (!range.from || !range.to) openCalendar();
      return;
    }
    setErrors({});

    const pickupDateStr = format(range.from, 'yyyy-MM-dd');
    const returnDateStr = format(range.to, 'yyyy-MM-dd');

    dispatch(clearProducts());
    dispatch(setBaseParams({
      publicToken,
      pickup_date: pickupDateStr,
      return_date: returnDateStr,
      pickup_time: pickupTime || null,
      return_time: returnTime || null,
    }));

    const qs = new URLSearchParams();
    qs.set('pickup_date', pickupDateStr);
    qs.set('return_date', returnDateStr);
    if (pickupTime) qs.set('pickup_time', pickupTime);
    if (returnTime) qs.set('return_time', returnTime);
    if (searchQuery.trim()) {
      qs.set('search_value', searchQuery.trim());
      qs.set('search_field', 'name');
    }

    navigate(`/shop/${shopName}/${publicToken}/results?${qs.toString()}`);
  };

  const formatDate = (date) => (date ? format(date, 'dd MMM yyyy') : null);
  const hasError = errors.pickupDate || errors.returnDate;

  return (
    <section className="shop-search-section">
      <div className="shop-search-card">
        <h2 className="shop-search-card__heading">Check Available Products</h2>

        <form onSubmit={handleSubmit} className="shop-search-form" noValidate>
          {/* Row 1: date + time fields */}
          <div className="shop-search-form__grid">
            {/* Pickup Date */}
            <div className="shop-search-form__field">
              <label className="shop-search-form__label">
                <span className="shop-search-form__icon">📅</span>
                Pickup Date <span className="shop-search-form__required">*</span>
              </label>
              <button
                type="button"
                className={`shop-datepicker-trigger${hasError && !range.from ? ' shop-datepicker-trigger--error' : ''}${range.from ? ' shop-datepicker-trigger--selected' : ''}`}
                onClick={openCalendar}
                aria-haspopup="dialog"
                aria-expanded={isCalendarOpen}
              >
                <span>{formatDate(range.from) || 'Select date'}</span>
                <CalendarIcon />
              </button>
              {errors.pickupDate && (
                <span className="shop-datepicker-error" role="alert">{errors.pickupDate}</span>
              )}
            </div>

            {/* Pickup Time */}
            <div className="shop-search-form__field">
              <label htmlFor="pickupTime" className="shop-search-form__label">
                <span className="shop-search-form__icon">⏰</span>
                Pickup Time
              </label>
              <input
                type="time"
                id="pickupTime"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="shop-search-form__input"
              />
            </div>

            {/* Return Date */}
            <div className="shop-search-form__field">
              <label className="shop-search-form__label">
                <span className="shop-search-form__icon">📅</span>
                Return Date <span className="shop-search-form__required">*</span>
              </label>
              <button
                type="button"
                className={`shop-datepicker-trigger${hasError && !range.to ? ' shop-datepicker-trigger--error' : ''}${range.to ? ' shop-datepicker-trigger--selected' : ''}`}
                onClick={openCalendar}
                aria-haspopup="dialog"
                aria-expanded={isCalendarOpen}
              >
                <span>{formatDate(range.to) || 'Select date'}</span>
                <CalendarIcon />
              </button>
              {errors.returnDate && (
                <span className="shop-datepicker-error" role="alert">{errors.returnDate}</span>
              )}
            </div>

            {/* Return Time */}
            <div className="shop-search-form__field">
              <label htmlFor="returnTime" className="shop-search-form__label">
                <span className="shop-search-form__icon">⏰</span>
                Return Time
              </label>
              <input
                type="time"
                id="returnTime"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="shop-search-form__input"
              />
            </div>
          </div>

          {/* Calendar Popover with Clear + OK */}
          {isCalendarOpen && (
            <div className="shop-datepicker-popover-centered" ref={calendarRef} role="dialog">
              <div className="shop-datepicker-popover__header">
                <p className="shop-datepicker-hint">
                  {!tempRange.from
                    ? '👆 Click a date to set your pickup date'
                    : !tempRange.to
                    ? '👆 Now click your return date'
                    : `📅 ${formatDate(tempRange.from)} → ${formatDate(tempRange.to)}`}
                </p>
              </div>
              <DayPicker
                key={calendarKey}
                mode="range"
                selected={tempRange}
                onSelect={handleRangeSelect}
                disabled={{ before: today }}
                defaultMonth={tempRange.from || today}
                numberOfMonths={monthsCount}
              />
              <div className="shop-datepicker-popover__actions">
                <button type="button" onClick={clearDates} className="shop-datepicker-btn shop-datepicker-btn--clear">
                  Clear
                </button>
                <button type="button" onClick={confirmDates} className="shop-datepicker-btn shop-datepicker-btn--ok">
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Search + Submit */}
          <div className="shop-search-bottom-row">
            <div className="shop-search-text-wrapper">
              <span className="shop-search-text-icon"><SearchIcon /></span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, services…"
                className="shop-search-text-input"
              />
            </div>
            <button type="submit" className="shop-search-form__btn">
              Search Availability
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ShopSearchForm;