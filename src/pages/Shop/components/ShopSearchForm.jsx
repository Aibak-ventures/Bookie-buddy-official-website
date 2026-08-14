import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { clearProducts, setBaseParams } from '../../../store/slices/productsSlice';
import { selectServices } from '../../../store/slices/shopSlice';
import 'react-day-picker/style.css';
import { Calendar as CalendarIcon, ClockCircle as ClockIcon, MinimalisticMagnifier as SearchIcon, CloseCircle as XIcon, AltArrowDown as ChevronDownIcon, Tag as TagIcon } from '@solar-icons/react';
import { today, parseDateStr } from '../../../utils/dateUtils';
import { useResponsiveMonths } from '../../../hooks/useResponsiveMonths';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';

// ---------- Main Component ----------
const ShopSearchForm = ({ initialPickupDate, initialReturnDate, initialPickupTime, initialReturnTime, compact = false, onAfterSubmit }) => {
  const { shopName, publicToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const services = useSelector(selectServices);

  const [range, setRange] = useState(() => ({
    from: parseDateStr(initialPickupDate),
    to:   parseDateStr(initialReturnDate),
  }));
  const [tempRange, setTempRange] = useState({ from: undefined, to: undefined });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarKey, setCalendarKey] = useState(0);
  const [pickupTime, setPickupTime] = useState(initialPickupTime || '');
  const [returnTime, setReturnTime] = useState(initialReturnTime || '');
  const [selectedServiceId, setSelectedServiceId] = useState('all');
  const [errors, setErrors] = useState({});

  const monthsCount = useResponsiveMonths();

  const closeCalendar = useCallback(() => setIsCalendarOpen(false), []);

  useBodyScrollLock(isCalendarOpen);

  const openCalendar = () => {
    setTempRange({ from: range.from, to: range.to });
    setIsCalendarOpen(true);
  };

  const confirmDates = () => {
    if (tempRange.from && tempRange.to) {
      setRange({ from: tempRange.from, to: tempRange.to });
    } else {
      setRange({ from: undefined, to: undefined });
    }
    setIsCalendarOpen(false);
    setErrors({});
  };

  const clearDates = () => {
    setTempRange({ from: undefined, to: undefined });
    setCalendarKey(prev => prev + 1);
    setErrors({});
  };

  const handleRangeSelect = (rangeOrDate) => {
    if (!rangeOrDate) return;
    setTempRange({ from: rangeOrDate.from, to: rangeOrDate.to });
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

    const serviceIds = selectedServiceId !== 'all' ? selectedServiceId : null;

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
    if (serviceIds) qs.set('service_ids', serviceIds);

    onAfterSubmit?.();
    navigate(`/shop/${shopName}/${publicToken}/results?${qs.toString()}`);
  };

  const formatDate = (date) => (date ? format(date, 'dd MMM yyyy') : null);
  const hasError = errors.pickupDate || errors.returnDate;

  const calendarHint = !tempRange.from
    ? 'Select your pickup date'
    : !tempRange.to
    ? 'Now select your return date'
    : `${formatDate(tempRange.from)}  →  ${formatDate(tempRange.to)}`;

  if (compact) {
    return (
      <>
        <form onSubmit={handleSubmit} className="shop-search-form shop-search-form--compact" noValidate>
          <div className="shop-search-groups">
            {/* Pickup */}
            <div className="shop-search-group">
              <p className="shop-search-group__label">Pickup</p>
              <div className="shop-search-group__fields">
                <div className="shop-search-form__field shop-search-form__field--date">
                  <label className="shop-search-form__label"><CalendarIcon /> Date <span className="shop-search-form__required">*</span></label>
                  <button type="button" className={['shop-datepicker-trigger', hasError && !range.from ? 'shop-datepicker-trigger--error' : '', range.from ? 'shop-datepicker-trigger--selected' : ''].filter(Boolean).join(' ')} onClick={openCalendar} aria-haspopup="dialog" aria-expanded={isCalendarOpen}>
                    <span>{formatDate(range.from) || 'Select date'}</span>
                    <CalendarIcon />
                  </button>
                  {errors.pickupDate && <span className="shop-datepicker-error" role="alert">{errors.pickupDate}</span>}
                </div>
                <div className="shop-search-form__field shop-search-form__field--time">
                  <label htmlFor="c-pickupTime" className="shop-search-form__label shop-search-form__label--secondary"><ClockIcon /> Time <span className="shop-search-form__optional">(optional)</span></label>
                  <input type="time" id="c-pickupTime" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="shop-search-form__input shop-search-form__input--secondary" />
                </div>
              </div>
            </div>

            <div className="shop-search-arrow" aria-hidden="true" />

            {/* Return */}
            <div className="shop-search-group">
              <p className="shop-search-group__label">Return</p>
              <div className="shop-search-group__fields">
                <div className="shop-search-form__field shop-search-form__field--date">
                  <label className="shop-search-form__label"><CalendarIcon /> Date <span className="shop-search-form__required">*</span></label>
                  <button type="button" className={['shop-datepicker-trigger', hasError && !range.to ? 'shop-datepicker-trigger--error' : '', range.to ? 'shop-datepicker-trigger--selected' : ''].filter(Boolean).join(' ')} onClick={openCalendar} aria-haspopup="dialog" aria-expanded={isCalendarOpen}>
                    <span>{formatDate(range.to) || 'Select date'}</span>
                    <CalendarIcon />
                  </button>
                  {errors.returnDate && <span className="shop-datepicker-error" role="alert">{errors.returnDate}</span>}
                </div>
                <div className="shop-search-form__field shop-search-form__field--time">
                  <label htmlFor="c-returnTime" className="shop-search-form__label shop-search-form__label--secondary"><ClockIcon /> Time <span className="shop-search-form__optional">(optional)</span></label>
                  <input type="time" id="c-returnTime" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} className="shop-search-form__input shop-search-form__input--secondary" />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="shop-search-form__btn shop-search-form__btn--full">
            <SearchIcon size={16} /> Search available items
          </button>
        </form>

        {isCalendarOpen && (
          <>
            <div className="shop-cal-overlay" onClick={closeCalendar} aria-hidden="true" />
            <div className="shop-cal-modal" role="dialog" aria-modal="true" aria-label="Select dates">
              <div className="shop-cal-modal__handle" aria-hidden="true" />
              <div className="shop-cal-modal__header">
                <span className="shop-cal-modal__hint">{calendarHint}</span>
                <button type="button" className="shop-cal-modal__close" onClick={closeCalendar} aria-label="Close calendar"><XIcon /></button>
              </div>
              <div className="shop-cal-modal__body">
                <DayPicker key={calendarKey} mode="range" selected={tempRange} onSelect={handleRangeSelect} disabled={{ before: today }} defaultMonth={tempRange.from || today} numberOfMonths={monthsCount} />
              </div>
              <div className="shop-cal-modal__footer">
                <button type="button" onClick={clearDates} className="shop-datepicker-btn shop-datepicker-btn--clear">Clear</button>
                <button type="button" onClick={confirmDates} className="shop-datepicker-btn shop-datepicker-btn--ok">Confirm Dates</button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <section className="shop-search-section">
        <div className="shop-search-card">
          <h2 className="shop-search-card__heading">When do you need it?</h2>

          <form onSubmit={handleSubmit} className="shop-search-form" noValidate>
            {/* Grouped pickup + return row */}
            <div className="shop-search-groups">

              {/* ── Pickup group ── */}
              <div className="shop-search-group">
                <p className="shop-search-group__label">Pickup</p>
                <div className="shop-search-group__fields">
                  {/* Date — primary */}
                  <div className="shop-search-form__field shop-search-form__field--date">
                    <label className="shop-search-form__label">
                      <CalendarIcon /> Date
                      <span className="shop-search-form__required">*</span>
                    </label>
                    <button
                      type="button"
                      className={[
                        'shop-datepicker-trigger',
                        hasError && !range.from ? 'shop-datepicker-trigger--error' : '',
                        range.from ? 'shop-datepicker-trigger--selected' : '',
                      ].filter(Boolean).join(' ')}
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

                  {/* Time — secondary */}
                  <div className="shop-search-form__field shop-search-form__field--time">
                    <label htmlFor="pickupTime" className="shop-search-form__label shop-search-form__label--secondary">
                      <ClockIcon /> Time <span className="shop-search-form__optional">(optional)</span>
                    </label>
                    <input
                      type="time"
                      id="pickupTime"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="shop-search-form__input shop-search-form__input--secondary"
                    />
                  </div>
                </div>
              </div>

              {/* Arrow divider */}
              <div className="shop-search-arrow" aria-hidden="true">
              </div>

              {/* ── Return group ── */}
              <div className="shop-search-group">
                <p className="shop-search-group__label">Return</p>
                <div className="shop-search-group__fields">
                  {/* Date — primary */}
                  <div className="shop-search-form__field shop-search-form__field--date">
                    <label className="shop-search-form__label">
                      <CalendarIcon /> Date
                      <span className="shop-search-form__required">*</span>
                    </label>
                    <button
                      type="button"
                      className={[
                        'shop-datepicker-trigger',
                        hasError && !range.to ? 'shop-datepicker-trigger--error' : '',
                        range.to ? 'shop-datepicker-trigger--selected' : '',
                      ].filter(Boolean).join(' ')}
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

                  {/* Time — secondary */}
                  <div className="shop-search-form__field shop-search-form__field--time">
                    <label htmlFor="returnTime" className="shop-search-form__label shop-search-form__label--secondary">
                      <ClockIcon /> Time <span className="shop-search-form__optional">(optional)</span>
                    </label>
                    <input
                      type="time"
                      id="returnTime"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="shop-search-form__input shop-search-form__input--secondary"
                    />
                  </div>
                </div>
              </div>

            </div>{/* end .shop-search-groups */}

            {/* Category + submit */}
            <div className="shop-search-bottom-row">
              <div className="shop-category-wrapper">
                <span className="shop-category-icon"><TagIcon /></span>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="shop-category-select"
                >
                  <option value="all">All Categories</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.service_name}</option>
                  ))}
                </select>
                <span className="shop-category-chevron"><ChevronDownIcon /></span>
              </div>
              <button type="submit" className="shop-search-form__btn">
                <SearchIcon size={16} />Find Available Items
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Date picker modal / bottom-sheet ── */}
      {isCalendarOpen && (
        <>
          <div className="shop-cal-overlay" onClick={closeCalendar} aria-hidden="true" />
          <div className="shop-cal-modal" role="dialog" aria-modal="true" aria-label="Select dates">
            {/* drag handle visible on mobile only */}
            <div className="shop-cal-modal__handle" aria-hidden="true" />

            <div className="shop-cal-modal__header">
              <span className="shop-cal-modal__hint">{calendarHint}</span>
              <button
                type="button"
                className="shop-cal-modal__close"
                onClick={closeCalendar}
                aria-label="Close calendar"
              >
                <XIcon />
              </button>
            </div>

            <div className="shop-cal-modal__body">
              <DayPicker
                key={calendarKey}
                mode="range"
                selected={tempRange}
                onSelect={handleRangeSelect}
                disabled={{ before: today }}
                defaultMonth={tempRange.from || today}
                numberOfMonths={monthsCount}
              />
            </div>

            <div className="shop-cal-modal__footer">
              <button type="button" onClick={clearDates} className="shop-datepicker-btn shop-datepicker-btn--clear">
                Clear
              </button>
              <button type="button" onClick={confirmDates} className="shop-datepicker-btn shop-datepicker-btn--ok">
                Confirm Dates
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShopSearchForm;
