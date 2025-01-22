import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingModal } from './Loading';
import Logo from './Logo';

// Validation Schema avec Yup
const schema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .required('Le nom est requis'),
    phone: yup
        .string()
        .matches(/^[0-9\-\+]{9,15}$/, 'Veuillez entrer un numéro de téléphone valide')
        .nullable(),
    email: yup
        .string()
        .email('Veuillez entrer une adresse e-mail valide')
        .required('L\'email est requis'),
    password: yup
        .string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .required('Le mot de passe est requis'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('La confirmation du mot de passe est requise'),
});

const RegisterForm = () => {
    // Utilisation de react-hook-form avec yupResolver
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();

    // Fonction de soumission du formulaire
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/register', {
                name: data.name,
                phone: data.phone || null, // Permet de gérer un champ optionnel
                email: data.email,
                password: data.password,
            });
            toast.success(response.data.message || 'Inscription réussie, vous pouvez maintenant se connecter !');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'Erreur d\'inscription');
            } else {
                console.error(error.message);
                toast.error('Une erreur est survenue');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>

            <LoadingModal isLoading={isLoading} message="Veuillez patienter, votre requête est en cours de traitement..." />
            <div className='flex flex-col items-center justify-center h-screen space-y-24'>
                <Logo height="h-16" width="w-72" crm="text-5xl" supmti="text-3xl" />
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 mx-auto bg-white rounded-lg shadow-lg min-w-96">
                    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 uppercase">
                        Inscription
                    </h2>

                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name')}
                            className={`w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                }`}
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
                            className={`w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                }`}
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
                            className={`w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
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

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            {...register('passwordConfirmation')}
                            className={`w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.passwordConfirmation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.passwordConfirmation && <p className="text-sm text-red-500">{errors.passwordConfirmation.message}</p>}
                    </div>


                    {/* Submit Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            S'inscrire
                        </button>
                    </div>
                    <div className='mb-2'> Vous avez déja un compte ? <Link to="/login" className='text-blue-500'>Se connecter</Link></div>
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
