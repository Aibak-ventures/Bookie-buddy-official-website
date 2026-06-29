/**
 * PlaceFilter — checkbox multi-select for filtering by shop/place.
 * Only rendered in org mode when associatedShops is non-empty.
 * Props:
 *   shops      — array of associated shop objects { id, name, ... }
 *   selectedIds — array of currently selected shop ids
 *   onChange   — callback(newIds: number[])
 */

const LocationIcon = () => (
  <svg className="place-filter__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const toggle = (ids, id) =>
  ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];

const PlaceFilter = ({ shops = [], selectedIds = [], onChange }) => {
  if (!shops.length) return null;

  return (
    <div className="place-filter">
      <p className="place-filter__heading">
        <LocationIcon /> Place
      </p>
      <ul className="place-filter__list">
        {shops.map((s) => {
          // Use the same place field shown on product card badges (product.shop_place → shop.place)
          const label = s.place ?? s.place_name ?? s.name ?? s.shop_name ?? `Shop ${s.id}`;
          const checked = selectedIds.includes(s.id);
          return (
            <li key={s.id}>
              <label className={`place-filter__option${checked ? ' place-filter__option--checked' : ''}`}>
                <input
                  type="checkbox"
                  className="place-filter__checkbox"
                  checked={checked}
                  onChange={() => onChange(toggle(selectedIds, s.id))}
                />
                {label}
              </label>
            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default PlaceFilter;
