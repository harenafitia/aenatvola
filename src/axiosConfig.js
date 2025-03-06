import axios from 'axios';

// Créer une instance d'Axios avec une configuration par défaut
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Utiliser l'URL de base de l'API à partir des variables
    // d'environnement
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT, 10) || 10000, // Utiliser le délai d'attente à partir des
    // variables d'environnement
    headers: {
        'Content-Type': 'application/json',
        // Ajoutez d'autres en-têtes ici si nécessaire
    },
});

// Ajouter un intercepteur pour gérer les erreurs
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;