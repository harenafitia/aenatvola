import axios from 'axios';
import Cookies from 'js-cookie';

// Créer une instance d'Axios avec une configuration par défaut
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT, 10) || 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Inclure les cookies dans les requêtes
});

// Ajouter un intercepteur pour les requêtes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('sessionToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('Aucun token disponible pour la requête.');
        }
        return config;
    },
    (error) => {
        console.error('Erreur dans l\'intercepteur de requêtes :', error);
        return Promise.reject(error);
    }
);

// Ajouter un intercepteur pour les réponses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Erreur Axios interceptée :', error); // Journal pour déboguer
        if (error.response?.status === 401) {
            Cookies.remove('user', { path: '/' });
            Cookies.remove('sessionToken', { path: '/' });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(`Erreur Axios: ${error.response.status} - ${error.response.statusText}`);
            console.error('Détails de l\'erreur:', error.response.data);
        } else if (error.request) {
            console.error('Aucune réponse reçue pour la requête Axios:', error.request);
        } else {
            console.error('Erreur Axios:', error.message);
        }

        if (error.response?.status === 401) {
            Cookies.remove('user', { path: '/' });
            Cookies.remove('sessionToken', { path: '/' });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;