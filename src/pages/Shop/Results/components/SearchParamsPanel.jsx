import { useEffect, useState } from 'react';

/**
 * SearchParamsPanel – displays date/time inputs.
 * Validates that the date/time range is valid:
 *   - If pickup date < return date → valid (times ignored)
 *   - If pickup date == return date → return time > pickup time
 * Calls onValidityChange(isValid, errorMessage) whenever values change.
 */
const SearchParamsPanel = ({
  pickupDate, setPickupDate,
  pickupTime, setPickupTime,
  returnDate, setReturnDate,
  returnTime, setReturnTime,
  onValidityChange,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isValid = false;
    let error = '';

    if (pickupDate && returnDate) {
      const pickupDateTime = new Date(`${pickupDate}T${pickupTime || '00:00'}`);
      const returnDateTime = new Date(`${returnDate}T${returnTime || '00:00'}`);

      if (pickupDate === returnDate) {
        // Same day: need return time > pickup time
        if (returnTime && pickupTime) {
          if (returnDateTime > pickupDateTime) {
            isValid = true;
          } else {
            error = 'Return time must be later than pickup time on the same day.';
          }
        } else {
          error = 'Both pickup and return times are required for same-day rental.';
        }
      } else {
        // Different days: just compare dates
        if (returnDateTime > pickupDateTime) {
          isValid = true;
        } else {
          error = 'Return date must be after pickup date.';
        }
      }
    } else {
      error = 'Please select both pickup and return dates.';
    }

    setErrorMessage(error);
    onValidityChange?.(isValid, error);
  }, [pickupDate, pickupTime, returnDate, returnTime, onValidityChange]);

  return (
    <div className="search-params-panel">
      <p className="search-params-panel__heading">📅 Search Criteria</p>

      <div className="search-params-field">
        <label className="search-params-label">Pickup Date <span className="search-params-required">*</span></label>
        <input
          type="date"
          value={pickupDate}
          min={today}
          onChange={(e) => setPickupDate(e.target.value)}
          className="search-params-input"
        />
      </div>

      <div className="search-params-field">
        <label className="search-params-label">Pickup Time</label>
        <input
          type="time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="search-params-input"
        />
      </div>

      <div className="search-params-field">
        <label className="search-params-label">Return Date <span className="search-params-required">*</span></label>
        <input
          type="date"
          value={returnDate}
          min={pickupDate || today}
          onChange={(e) => setReturnDate(e.target.value)}
          className="search-params-input"
        />
      </div>

      <div className="search-params-field">
        <label className="search-params-label">Return Time</label>
        <input
          type="time"
          value={returnTime}
          onChange={(e) => setReturnTime(e.target.value)}
          className="search-params-input"
        />
      </div>

      {errorMessage && (
        <div className="search-params-error-message">
          ⚠️ {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SearchParamsPanel;