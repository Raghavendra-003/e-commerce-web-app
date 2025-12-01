// frontend/src/api.js
export const API_URL = 'http://localhost:5000/api';

export const apiFetch = async (path, { method = 'GET', body, token } = {}) => {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Request failed');
    }

    return res.json();
  } catch (error) {
    console.error('API fetch error:', error.message);
    throw error;
  }
};
