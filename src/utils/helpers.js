/**
 * Build a WhatsApp URL with a pre-filled demo request message.
 * @param {string} name
 * @param {string} business
 * @param {string} phone
 * @param {string} source
 * @returns {string} WhatsApp URL
 */
export const buildWhatsAppUrl = (name, business, phone, source) => {
  const message = `New Demo Request:%0A%0AName: ${encodeURIComponent(name)}%0ABusiness: ${encodeURIComponent(business)}%0APhone: ${encodeURIComponent(phone)}%0AHeard About Us From: ${encodeURIComponent(source)}`;
  return `https://wa.me/919744898185?text=${message}`;
};

/**
 * Smooth scroll to a section by selector.
 * @param {string} selector - e.g. '#features'
 */
export const scrollToSection = (selector) => {
  const target = document.querySelector(selector);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
};
