import { apiRequest } from './client';

export const adminApi = {
  getDashboard: () => {
    return apiRequest('/admin/dashboard', { method: 'GET' });
  },

  getCandidates: (santaId) => {
    return apiRequest(`/admin/employees/${santaId}/candidates`, { method: 'GET' });
  },

  assignSanta: (santaId, recipientId) => {
    return apiRequest('/admin/assign', {
      method: 'POST',
      body: JSON.stringify({ santaId, recipientId })
    });
  },

  removeAssignment: (santaId) => {
    return apiRequest(`/admin/assignments/${santaId}`, {
      method: 'DELETE'
    });
  }
};
