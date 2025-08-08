import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const destinationService = {
  // Get all destinations with optional filters
  getDestinations: async (search = '', continent = '') => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (continent) params.append('continent', continent);
      
      const response = await api.get(`/destinations?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  },

  // Add a new destination
  addDestination: async (destination) => {
    try {
      const response = await api.post('/destinations', destination);
      return response.data;
    } catch (error) {
      console.error('Error adding destination:', error);
      throw error;
    }
  },

  // Update a destination
  updateDestination: async (id, updates) => {
    try {
      const response = await api.put(`/destinations/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating destination:', error);
      throw error;
    }
  },

  // Delete a destination
  deleteDestination: async (id) => {
    try {
      await api.delete(`/destinations/${id}`);
    } catch (error) {
      console.error('Error deleting destination:', error);
      throw error;
    }
  },

  // Get report
  getReport: async () => {
    try {
      const response = await api.get('/report');
      return response.data;
    } catch (error) {
      console.error('Error fetching report:', error);
      throw error;
    }
  }
};

export default api;
