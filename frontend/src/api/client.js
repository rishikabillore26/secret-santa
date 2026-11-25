const rawBase = import.meta.env.VITE_API_BASE_URL || '/api';
const cleanBase = rawBase.replace(/\/+$/, '');
const API_BASE = cleanBase.endsWith('/api') ? cleanBase : `${cleanBase}/api`;

export async function apiRequest(endpoint, options = {}) {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (response.status === 401) {
    // If it's an authentication endpoint (login/register), do NOT redirect to /login!
    // It's bad credentials or auth failure, so throw the message to let the page display it.
    if (endpoint.startsWith('/auth') || endpoint.includes('login') || endpoint.includes('register')) {
      const errorMessage = data?.message || (typeof data?.error === 'string' ? data.error : 'Invalid email or password');
      const error = new Error(errorMessage);
      error.status = 401;
      error.data = data;
      throw error;
    }

    // For protected endpoints, session expired or token is invalid
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    const error = new Error(data?.message || 'Session expired. Please log in again.');
    error.status = 401;
    error.data = data;
    throw error;
  }

  if (!response.ok) {
    const errorMessage = data?.message || (typeof data?.error === 'string' ? data.error : 'Request failed');
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
