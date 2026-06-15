/**
 * ShopInfoSection — clean, center-aligned "About the Shop" section.
 * No card, no borders. Just logo, name, and available contact details.
 */

const Detail = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <p className="shop-about__detail">
      <span className="shop-about__detail-icon" aria-hidden="true">{icon}</span>
      <span className="shop-about__detail-label">{label}:&nbsp;</span>
      <span className="shop-about__detail-value">{value}</span>
    </p>
  );
};

const ShopInfoSection = ({ shop }) => {
  if (!shop) return null;

  const phone = [shop.phone, shop.phone2].filter(Boolean).join(' / ');
  const addressParts = [shop.address, shop.place, shop.city, shop.state]
    .filter(Boolean);
  // Deduplicate consecutive identical parts (place & address are often the same)
  const address = addressParts
    .filter((v, i, arr) => v !== arr[i - 1])
    .join(', ');
  const pincode = shop.pincode ? `PIN: ${shop.pincode}` : null;

  return (
    <section className="shop-about-section">
      <h2 className="shop-about__heading">About the Shop</h2>

      {shop.img && (
        <img
          src={shop.img}
          alt={`${shop.name} logo`}
          className="shop-about__logo"
        />
      )}

      <h3 className="shop-about__name">{shop.name}</h3>

      <div className="shop-about__details">
        <Detail icon="📍" label="Address" value={address} />
        <Detail icon="🏷" label="Pincode" value={pincode} />
        <Detail icon="📞" label="Phone"   value={phone} />
        <Detail icon="✉️" label="Email"   value={shop.email} />
        <Detail icon="🧾" label="GST"     value={shop.gst_number} />
      </div>
    </section>
  );
};

export default ShopInfoSection;
