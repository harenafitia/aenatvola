import axiosInstance from '../axiosConfig';

class MembresService {
    endpoint = '/membres';

    async getAllMembres(params = {}) {
        try {
            const response = await axiosInstance.get(this.endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getMembreById(id) {
        try {
            const response = await axiosInstance.get(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async deleteMembreById(id) {
        try {
            const response = await axiosInstance.delete(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getPromotions() {
        try {
            const response = await axiosInstance.get('/promotion');
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getAnneesUniversitaires() {
        try {
            const response = await axiosInstance.get('/anneuniv');
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getParcours() {
        try {
            const response = await axiosInstance.get('/parcours');
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getMentions() {
        try {
            const response = await axiosInstance.get('/mention');
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getNiveaux() {
        try {
            const response = await axiosInstance.get('/niveaux');
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async createMembre(data) {
        try {
            const response = await axiosInstance.post('/inscription/withMembre', data);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    handleError(error) {
        console.error('Erreur dans MembresService:', error);
        if (error.response) {
            console.error('Erreur de réponse:', error.response.data);
            console.error('Status:', error.response.status);
        } else if (error.request) {
            console.error('Erreur de requête:', error.request);
        } else {
            console.error('Erreur:', error.message);
        }
    }
}

export default new MembresService();