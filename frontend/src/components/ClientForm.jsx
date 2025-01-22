import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../utils/decodeToken';
import { LoadingModal } from './Loading';

// Validation Schema avec Yup
const schema = yup.object().shape({
    name: yup.string().min(2, 'Le nom doit contenir au moins 2 caractères').required('Le nom est requis'),
    email: yup.string().email('Veuillez entrer une adresse e-mail valide').required('L\'email est requis'),
    phone: yup.string().matches(/^[0-9\-\+]{9,15}$/, 'Veuillez entrer un numéro de téléphone valide').nullable(),
    address: yup.string().min(5, 'L\'adresse doit contenir au moins 5 caractères').required('L\'adresse est requise'),
});

const ClientForm = ({ client = null, isEditing = false }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: client || {}, // Remplit les champs si un client est passé en props
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const { userId } = decodeToken();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            if (isEditing) {
                // Modification du client
                const response = await api.put(`/clients/${client.id}`, data);
                toast.success(response.data.message || 'Client modifié avec succès !');
            } else {
                // Ajout d'un nouveau client
                const response = await api.post('/clients', {
                    ...data,
                    userId,
                });
                toast.success(response.data.message || 'Client ajouté avec succès !');
            }
            navigate('/clients'); // Redirige vers la liste des clients
        } catch (error) {
            toast.error(error.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <LoadingModal isLoading={isLoading} message="Veuillez patienter, votre requête est en cours de traitement..." />
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 mx-auto bg-white rounded-lg shadow-lg w-96">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 uppercase">
                    {isEditing ? 'Modifier le Client' : 'Ajouter un Client'}
                </h2>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className={`w-full mt-2 p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={`w-full mt-2 p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                        type="text"
                        id="phone"
                        {...register('phone')}
                        className={`w-full mt-2 p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input
                        type="text"
                        id="address"
                        {...register('address')}
                        className={`w-full mt-2 p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                </div>

                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    {isEditing ? 'Modifier' : 'Ajouter'}
                </button>
            </form>
        </>
    );
};

export default ClientForm;
