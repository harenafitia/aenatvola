import axiosInstance from '../axiosConfig';

class MembresService {
    // URL de base pour les endpoints des membres
    endpoint = '/membres';

    /**
     * Récupère tous les membres
     * @param {Object} params - Paramètres de requête optionnels (pagination, tri, etc.)
     * @returns {Promise<Array>} - Liste des membres
     */
    async getAllMembres(params = {}) {
        try {
            const response = await axiosInstance.get(this.endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Récupère un membre par son ID
     * @param {string|number} id - L'ID du membre
     * @returns {Promise<Object>} - Les données du membre
     */
    async getMembreById(id) {
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
        // Log l'erreur pour le debugging
        console.error('Erreur dans MembresService:', error);

        // Vous pouvez ajouter ici une logique personnalisée de gestion d'erreur
        if (error.response) {
            // La requête a été faite et le serveur a répondu avec un code d'état
            // qui ne fait pas partie de la plage 2xx
            console.error('Erreur de réponse:', error.response.data);
            console.error('Status:', error.response.status);
        } else if (error.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            console.error('Erreur de requête:', error.request);
        } else {
            // Une erreur s'est produite lors de la configuration de la requête
            console.error('Erreur:', error.message);
        }
    }
}

// Exportation d'une instance unique du service
export default new MembresService();