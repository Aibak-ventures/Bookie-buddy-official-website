import { API_BASE_URL } from '../config';

/**
 * Fetch products for a shop given search params.
 * Only non-empty values are appended to the query string.
 *
 * @param {string} publicToken
 * @param {object} params
 *   pickup_date    {string} required — 'yyyy-MM-dd'
 *   return_date    {string} required — 'yyyy-MM-dd'
 *   pickup_time    {string} optional — 'HH:mm'
 *   return_time    {string} optional — 'HH:mm'
 *   search_value   {string} optional
 *   service_id     {number|string} optional
 *   min_price      {number|string} optional
 *   max_price      {number|string} optional
 */
export async function fetchProducts(publicToken, params = {}) {
  const qs = new URLSearchParams();

  const append = (key, value) => {
    if (value !== undefined && value !== null && value !== '') {
      qs.set(key, value);
    }
  };

  append('pickup_date',  params.pickup_date);
  append('return_date',  params.return_date);
  append('pickup_time',  params.pickup_time);
  append('return_time',  params.return_time);
  append('search_value', params.search_value);
  append('service_id',   params.service_id);
  append('service_ids',  params.service_ids);
  append('min_price',    params.min_price);
  append('max_price',    params.max_price);

  // shop_ids as comma-separated string: shop_ids=7,49
  if (Array.isArray(params.shop_ids) && params.shop_ids.length > 0) {
    qs.set('shop_ids', params.shop_ids.join(','));
  }

  const url = `${API_BASE_URL}/api/v3/public/shops/${publicToken}/products/?${qs.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products (${response.status})`);
  }
  return response.json();
}

/**
 * Fetch a specific page using the full next/previous URL from the API response.
 * @param {string} url — full URL from data.next or data.previous
 */
export async function fetchProductsFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch page (${response.status})`);
  }
  return response.json();
}
