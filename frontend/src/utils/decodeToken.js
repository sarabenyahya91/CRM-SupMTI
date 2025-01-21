import { jwtDecode } from 'jwt-decode';

export const decodeToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null; // Aucun token disponible
    }

    try {
        const decoded = jwtDecode(token); // Décodage du token
        return decoded; // Retourne l'objet contenant les données utilisateur
    } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return null;
    }
};

