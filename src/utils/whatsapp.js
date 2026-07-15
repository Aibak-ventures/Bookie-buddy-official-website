import { format, parse, parseISO } from 'date-fns';

/** Formats 'yyyy-MM-dd' -> '15-Jun-2026'. Returns '' if the date is missing/invalid. */
function formatBookingDate(dateStr) {
  if (!dateStr) return '';
  try {
    return format(parseISO(dateStr), 'dd-MMM-yyyy');
  } catch {
    return dateStr;
  }
}

/** Formats 'HH:mm' -> '10:00 AM'. Returns '' if the time is missing/invalid. */
function formatBookingTime(timeStr) {
  if (!timeStr) return '';
  try {
    return format(parse(timeStr, 'HH:mm', new Date()), 'hh:mm a');
  } catch {
    return timeStr;
  }
}

/**
 * Builds a wa.me link pre-filled with a booking enquiry message for the given
 * product, addressed to the shop's primary phone number.
 *
 * @param {object} product    — product being booked (name, category, price, sku, ...)
 * @param {object} shop       — shop details (uses shop.phone as the primary number)
 * @param {object} baseParams — current search params (pickup_date, pickup_time, return_date, return_time)
 * @returns {string|null} the wa.me URL, or null if the shop has no phone number on file
 */
/** Shorten a URL via TinyURL. Returns the short URL, or the original on failure. */
export async function shortenUrl(url) {
  try {
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return url;
    const short = await res.text();
    return short.startsWith('http') ? short : url;
  } catch {
    return url;
  }
}

/**
 * Builds a wa.me URL pre-filled with a booking enquiry message.
 * Pass a pre-shortened imageUrl (or null) — shortening is done by the caller
 * so it can be async without blocking the URL build.
 */
export function buildBookingWhatsAppUrl(product, shop, baseParams = {}, shortImageUrl = null) {
  const phone = shop?.phone;
  if (!phone) return null;

  let digits = String(phone).replace(/\D/g, '');
  if (!digits) return null;
  if (!digits.startsWith('91') && digits.length === 10) digits = '91' + digits;

  const lines = [
    'Hello,',
    '',
    'I would like to book the following product:',
    '',
    `Product: ${product?.name || ''}`,
  ];

  if (product?.category) lines.push(`Category: ${product.category}`);
  if (product?.model)    lines.push(`Model: ${product.model}`);
  if (product?.color)    lines.push(`Color: ${product.color}`);
  if (product?.shop_place) lines.push(`Branch: ${product.shop_place}`);

  const pickupDate = formatBookingDate(baseParams.pickup_date);
  const pickupTime = formatBookingTime(baseParams.pickup_time);
  const returnDate = formatBookingDate(baseParams.return_date);
  const returnTime = formatBookingTime(baseParams.return_time);

  if (pickupDate) lines.push(`Pickup Date: ${pickupDate}`);
  if (pickupTime) lines.push(`Pickup Time: ${pickupTime}`);
  if (returnDate) lines.push(`Return Date: ${returnDate}`);
  if (returnTime) lines.push(`Return Time: ${returnTime}`);

  if (product?.price) lines.push(`Price: ₹${product.price}`);
  if (product?.sku)   lines.push(`Reference: ${product.sku}`);

  const imageUrl = shortImageUrl || product?.image || product?.thumbnail_image;
  if (imageUrl) lines.push('', `Product Image: ${imageUrl.replace(/ /g, '%20')}`);

  lines.push('', 'Please let me know the availability and next steps.');

  const message = lines.join('\n');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
