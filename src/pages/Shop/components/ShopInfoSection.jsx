import { MapPoint as MapPointIcon, PointOnMapPerspective as PinIcon, Phone as PhoneIcon, Letter as LetterIcon, DocumentText as GstIcon } from '@solar-icons/react';

const Detail = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="shop-about__detail">
      <span className="shop-about__detail-icon" aria-hidden="true">
        <Icon size={16} />
      </span>
      <div className="shop-about__detail-text">
        <span className="shop-about__detail-label">{label}</span>
        <span className="shop-about__detail-value">{value}</span>
      </div>
    </div>
  );
};

const ShopInfoSection = ({ shop }) => {
  if (!shop) return null;

  const phone = [shop.phone, shop.phone2].filter(Boolean).join(' / ');
  const addressParts = [shop.address, shop.place, shop.city, shop.state]
    .filter(Boolean);
  const address = addressParts
    .filter((v, i, arr) => v !== arr[i - 1])
    .join(', ');
  const pincode = shop.pincode ? `PIN: ${shop.pincode}` : null;

  return (
    <section className="shop-about-section">
      <div className="shop-about__card">
        {/* Left column: logo + name */}
        <div className="shop-about__left">
          {shop.img ? (
            <img
              src={shop.img}
              alt={`${shop.name} logo`}
              className="shop-about__logo"
            />
          ) : (
            <div className="shop-about__logo-placeholder">
              {shop.name?.[0]?.toUpperCase()}
            </div>
          )}
          <h3 className="shop-about__name">{shop.name}</h3>
        </div>

        <div className="shop-about__divider" aria-hidden="true" />

        {/* Right column: details */}
        <div className="shop-about__right">
          <h2 className="shop-about__heading">About the Shop</h2>
          <div className="shop-about__details">
            <Detail icon={MapPointIcon} label="Address" value={address} />
            <Detail icon={PinIcon}      label="Pincode" value={pincode} />
            <Detail icon={PhoneIcon}    label="Phone"   value={phone} />
            <Detail icon={LetterIcon}   label="Email"   value={shop.email} />
            <Detail icon={GstIcon}      label="GST"     value={shop.gst_number} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopInfoSection;
