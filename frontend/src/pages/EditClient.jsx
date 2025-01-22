import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import api from '../api/axios';
import ClientForm from '../components/ClientForm';

const EditClientPage = () => {
    const { id } = useParams(); // Récupère l'ID du client depuis l'URL
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await api.get(`/clients/${id}`);

                setClient(response.data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du client:', error);
            }
        };
        fetchClient();
    }, [id]);

    return client ? (<div className="flex items-center justify-center min-h-screen p-20 bg-gray-100">
        <ClientForm client={client} isEditing={true} /></div>) : <Loading />;
};

export default EditClientPage;
