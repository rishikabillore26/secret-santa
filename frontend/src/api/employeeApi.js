import { apiRequest } from './client';

export const employeeApi = {
  getStatus: () => {
    return apiRequest('/employee/status', { method: 'GET' });
  },

  getWishes: () => {
    return apiRequest('/employee/wishes', { method: 'GET' });
  },

  addWish: (wish) => {
    return apiRequest('/employee/wishes', {
      method: 'POST',
      body: JSON.stringify(wish)
    });
  },

  updateWish: (id, wish) => {
    return apiRequest(`/employee/wishes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(wish)
    });
  },

  deleteWish: (id) => {
    return apiRequest(`/employee/wishes/${id}`, {
      method: 'DELETE'
    });
  },

  getRecipient: () => {
    return apiRequest('/employee/recipient', { method: 'GET' });
  }
};
