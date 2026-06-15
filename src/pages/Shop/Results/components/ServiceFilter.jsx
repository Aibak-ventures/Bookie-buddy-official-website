/**
 * ServiceFilter — horizontal scrollable pill chips for service/category filtering.
 * "All" chip clears the service filter.
 */
const ServiceFilter = ({ services = [], selectedId, onSelect }) => {
  return (
    <div className="service-filter">
      <button
        type="button"
        className={`service-chip${!selectedId ? ' service-chip--active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {services.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`service-chip${selectedId === s.id ? ' service-chip--active' : ''}`}
          onClick={() => onSelect(s.id === selectedId ? null : s.id)}
          title={s.description || s.service_name}
        >
          {s.icon && (
            <img src={s.icon} alt="" className="service-chip__icon" />
          )}
          {s.service_name}
        </button>
      ))}
    </div>
  );
};

export default ServiceFilter;
