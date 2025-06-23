import apiClient from './axiosConfig';

export const recordVisit = async (pageUrl) => {
    try {
      const data = {
        user_agent: navigator.userAgent,
        page_url: pageUrl
      };
      return await apiClient.post('/api/visitors', data);
    } catch (error) {
      console.error('Error recording visit:', error);
    }
  };

export const getVisitorStats = async (startDate, endDate) => {
    try {
        const params = {};
        if (startDate && endDate) {
            params.start_date = startDate;
            params.end_date = endDate;
        }
        const response = await apiClient.get('/visitors/stats', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching visitor stats:', error);
        return [];
    }
};