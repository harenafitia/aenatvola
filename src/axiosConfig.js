import axios from 'axios';
import Cookies from 'js-cookie'; // Ajout de l'import de js-cookie

// Créer une instance d'Axios avec une configuration par défaut
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT, 10) || 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    // Ajout des options CORS
    withCredentials: true,
    crossDomain: true
});

// Ajouter un intercepteur pour les requêtes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('sessionToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Ajouter un intercepteur pour les réponses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove('user', { path: '/' });
            Cookies.remove('sessionToken', { path: '/' });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;