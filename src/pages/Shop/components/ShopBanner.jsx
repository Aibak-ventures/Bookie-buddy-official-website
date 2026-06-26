/**
 * ShopBanner — full-width blue-gradient hero section inspired by Flightpoints.
 */
const ShopBanner = ({ shop, children }) => {
  const name = shop?.name || '';
  const place = shop?.place || shop?.address || '';

  return (
    <section className="shop-banner">
      <div className="shop-banner__inner">
        <p className="shop-banner__eyebrow">Book with us</p>
        <h1 className="shop-banner__title">{name}</h1>
        {place && <p className="shop-banner__subtitle">📍 {place}</p>}
        <p className="shop-banner__tagline">
          Find and reserve the best rental options — fast and hassle-free.
        </p>
        {children}
      </div>

      {/* Decorative circles */}
      <div className="shop-banner__circle shop-banner__circle--1" aria-hidden="true" />
      <div className="shop-banner__circle shop-banner__circle--2" aria-hidden="true" />
    </section>
  );
};

export default ShopBanner;
