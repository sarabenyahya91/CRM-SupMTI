import axios from 'axios';

const api = axios.create({
    baseURL: 'https://crm-supmti.onrender.com', // Remplacez par l'URL de votre backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
