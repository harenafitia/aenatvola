import axiosInstance from '../axiosConfig';

class PromotionService {
    endpoint = '/promotion';

    async getAllPromotions() {
        try {
            const response = await axiosInstance.get(this.endpoint);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getPromotionById(id) {
        try {
            const response = await axiosInstance.get(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    handleError(error) {
        if (error.response) {
            console.error('Erreur API:', error.response.status);
        } else if (error.request) {
            console.error('Erreur de requête');
        } else {
            console.error('Erreur:', error.message);
        }
    }
}

export default new PromotionService();