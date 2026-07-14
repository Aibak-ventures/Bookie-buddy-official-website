/**
 * ShopHeader — minimal branded navbar for the shop public page.
 * Shows shop logo (from API) + shop name on the left.
 */
const ShopHeader = ({ shop }) => {
  const name = shop?.name || 'Shop';
  const logo = shop?.img;

  return (
    <header className="shop-header">
      <div className="shop-header__inner">
        <div className="shop-header__brand">
          {logo ? (
            <img src={logo} alt={`${name} logo`} className="shop-header__logo" />
          ) : (
            <div className="shop-header__logo-placeholder">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="shop-header__name">{name}</span>
        </div>

        {/* <div className="shop-header__powered">
          <span>Powered by</span>
          <img src="/images/logo.svg" alt="BookieBuddy" className="shop-header__bb-logo" />
        </div> */}
      </div>
    </header>
  );
};

export default ShopHeader;
