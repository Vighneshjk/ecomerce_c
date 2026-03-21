/**
 * API Utility for making authenticated requests to the backend.
 */

export const getAccessToken = () => localStorage.getItem('akela_access_token');

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAccessToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Handle unauthorized - maybe try to refresh token or logout
    console.warn('Unauthorized request. Token might be expired.');
    // For now, just let the caller handle it or redirect to login
  }

  return response;
};

export const fetcher = (url: string) => apiFetch(url).then(res => {
  if (!res.ok) throw new Error('API request failed');
  return res.json();
});
