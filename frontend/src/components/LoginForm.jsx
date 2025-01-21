import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

// Validation Schema avec Yup
const schema = yup.object().shape({
    email: yup
        .string()
        .email('Veuillez entrer une adresse e-mail valide')
        .required('L\'email est requis'),
    password: yup
        .string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .required('Le mot de passe est requis'),

});

const LoginForm = () => {
    // Utilisation de react-hook-form avec yupResolver
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    // Fonction de soumission du formulaire
    const onSubmit = async (data) => {
        try {
            const response = await api.post('/auth/login', {
                email: data.email,
                password: data.password,
            });

            // Sauvegarder le token JWT
            localStorage.setItem('token', response.data.token);
            toast.success('Connexion réussie !');
            // Rediriger l'utilisateur vers la page Clients
            navigate('/clients');
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'Erreur de connexion');
            } else {
                toast.error('Une erreur est survenue');
            }
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 mx-auto bg-white rounded-lg shadow-lg min-w-96">

            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 uppercase">
                Connexion
            </h2>
            {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className={`w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>


            {/* Submit Button */}
            <div className="mb-4">
                <button
                    type="submit"
                    className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Se Connecter
                </button>
            </div>
            <div className='mb-2'> Vous n'avez pas de compte <Link to="/register" className='text-blue-500'>S'inscrire</Link></div>
        </form>
    );
};

export default LoginForm;
