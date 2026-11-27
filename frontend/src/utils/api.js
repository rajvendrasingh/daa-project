import axios from 'axios';

const BASE = '/api';

export const api = {
  // Subjects
  getSubjects: () => axios.get(`${BASE}/subjects`),
  createSubject: (data) => axios.post(`${BASE}/subjects`, data),
  updateSubject: (id, data) => axios.put(`${BASE}/subjects/${id}`, data),
  deleteSubject: (id) => axios.delete(`${BASE}/subjects/${id}`),
  resetSubjects: () => axios.post(`${BASE}/subjects/reset`),

  // Stats
  getStats: () => axios.get(`${BASE}/stats`),

  // Conflicts
  getConflicts: () => axios.get(`${BASE}/conflicts`),

  // Generate timetable
  generate: (startDate) => axios.post(`${BASE}/generate`, { startDate }),
};
