import ApiService from './api.service';

class MentionService {
    static async getAllMentions() {
        try {
            return await ApiService.get('/mention');
        } catch (error) {
            console.error('Erreur lors du chargement des mentions:', error);
            throw error;
        }
    }
}

export default MentionService;