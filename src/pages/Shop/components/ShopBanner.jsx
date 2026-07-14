const ShopBanner = ({ children }) => {
  return (
    <section className="shop-banner">
      <div className="shop-banner__inner">
        {/* <p className="shop-banner__eyebrow shop-banner__eyebrow--anim">
          Rentals · Bookings · Experiences
        </p> */}

        <h1 className="shop-banner__title shop-banner__title--anim">
           Find What's
          <span className="shop-banner__title-accent"> Available</span>
        </h1>
        <p className="shop-banner__eyebrow shop-banner__eyebrow--anim">
          Choose your dates and discover available rentals, stays & experiences near you.
        </p>

        {children}
      </div>

      <div className="shop-banner__circle shop-banner__circle--1" aria-hidden="true" />
      <div className="shop-banner__circle shop-banner__circle--2" aria-hidden="true" />
      <div className="shop-banner__circle shop-banner__circle--3" aria-hidden="true" />
    </section>
  );
};

export default ShopBanner;
