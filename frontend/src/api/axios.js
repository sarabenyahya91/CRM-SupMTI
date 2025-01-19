import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // Remplacez par l'URL de votre backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
