import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Table from "../components/Table";
import { toast } from 'react-toastify';
import Row from "../components/Row";
import { Loading } from "../components/Loading";
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { decodeToken } from '../utils/decodeToken';
import Modal from "../components/Modal";

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null); // Client à supprimer
    const [isModalOpen, setIsModalOpen] = useState(false); // État du modal

    const { userId } = decodeToken();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/clients', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClients(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients :', error);
            }
        };

        fetchClients();
    }, []);

    const handleAddClient = () => {
        navigate("/clients/add");
    };

    const handleEditClient = (clientId) => {
        navigate(`/clients/edit/${clientId}`);
    };

    // Ouvrir le modal de confirmation
    const handleDeleteClient = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    // Confirmer et supprimer le client
    const confirmDelete = async () => {
        if (!selectedClient) return;

        try {
            await api.delete(`/clients/${selectedClient.id}`);
            toast.success("Client supprimé avec succès");
            setClients((prev) => prev.filter((c) => c.id !== selectedClient.id));
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la suppression du client");
        } finally {
            setIsModalOpen(false);
            setSelectedClient(null);
        }
    };



    return (
        <div className="min-h-screen p-20 bg-gray-100">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-orange-600">Liste des Clients</h1>
                    <button
                        onClick={handleAddClient}
                        className="flex items-center px-4 py-2 text-white bg-orange-500 rounded shadow-md hover:bg-blue-700"
                    >
                        <UserPlusIcon className='w-6 h-6 me-2' />  Ajouter un client
                    </button>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Table
                            columns={["Nom ", "Email", "Téléphone", "Commercial chargé", "Actions"]}
                            data={clients}
                            renderRow={(client, index) => (
                                <Row key={index}>
                                    <td className="px-6 py-4 font-bold text-gray-600">{client.name}</td>
                                    <td className="px-6 py-4 text-sm">{client.email}</td>
                                    <td className="px-6 py-4 text-sm">{client.phone}</td>
                                    <td className="px-6 py-4 text-sm "><h4>{client.user.name}</h4> <small className='text-gray-500'>{client.user.phone}</small></td>
                                    {userId === client.user.id && (<td className="flex px-6 py-4 space-x-4">
                                        <button
                                            className="flex text-blue-300 align-baseline hover:text-blue-800"
                                            onClick={() => handleEditClient(client.id)}
                                        >
                                            <PencilIcon className='w-5 h-5 me-1 ' />Modifier
                                        </button>
                                        <button
                                            className="flex ml-4 text-red-400 align-baseline hover:text-red-800"
                                            onClick={() => handleDeleteClient(client)}
                                        >
                                            <TrashIcon className='w-5 h-5 me-1' /> Supprimer
                                        </button>
                                    </td>)}
                                </Row>
                            )}
                        />

                        {isModalOpen && (
                            <Modal
                                title="Confirmation de suppression"
                                onClose={() => setIsModalOpen(false)}
                            >
                                <p>Êtes-vous sûr de vouloir supprimer le client <strong>{selectedClient.name}</strong> ?</p>
                                <div className="flex justify-end mt-4 space-x-4">
                                    <button
                                        onClick={confirmDelete}
                                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                    >
                                        Confirmer
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </Modal>
                        )}


                    </>
                )}

            </div>
        </div>
    );
};

export default ClientList;
