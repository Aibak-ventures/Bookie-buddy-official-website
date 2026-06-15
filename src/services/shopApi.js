import { API_BASE_URL } from '../config';

/**
 * Fetches shop information by public token.
 * @param {string} publicToken
 * @returns {Promise<{ shop: object, services: object[] }>}
 */
export async function fetchShopInfo(publicToken) {
  const url = `${API_BASE_URL}/api/v3/public/shops/${publicToken}/info/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch shop info (${response.status})`);
  }
  return response.json();
}
