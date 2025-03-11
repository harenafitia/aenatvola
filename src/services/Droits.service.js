import axiosInstance from '../axiosConfig';

class DroitsService {
    endpoint = '/droits';

    /**
     * Récupère tous les droits
     * @returns {Promise<Array>} Liste des droits
     */
    async getAllDroits() {
        try {
            const response = await axiosInstance.get(this.endpoint);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Récupère un droit par son ID
     * @param {number} id - L'ID du droit
     * @returns {Promise<Object>} Les données du droit
     */
    async getDroitById(id) {
        try {
            const response = await axiosInstance.get(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Gestion centralisée des erreurs
     * @param {Error} error - L'erreur à traiter
     * @private
     */
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

export default new DroitsService();