const API_URL = 'http://localhost:5000/api';

export const apiFetch = async (path, { method = 'GET', body, token } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      // Backend didn’t return JSON
    }

    if (!res.ok) {
      throw new Error(data?.message || `Request failed with ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error("FETCH ERROR:", error.message);
    throw error;
  }
};
