import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { decodeToken } from '../utils/decodeToken';
import { toast } from 'react-toastify';
import { ArrowRightEndOnRectangleIcon, ListBulletIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
const Navbar = () => {
    const [userName, setUserName] = useState('');
    const naviagte = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        naviagte('/login');
        toast.warning('Vous êtez deconnecté !');
    };

    useEffect(() => {
        const decoded = decodeToken();
        console.log(decoded);
        if (decoded) {
            setUserName(decoded.name || 'Invité'); // Remplace "Utilisateur" par une valeur par défaut si `name` n'existe pas
        }
    }, []);

    return (
        <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-500">
                            <Logo />
                        </Link>
                    </div>
                    <div className="hidden space-x-4 md:flex">
                        <Link
                            to="/clients"
                            className="flex items-center px-3 py-2 font-medium text-gray-600 border-b border-transparent hover:text-blue-500 hover:border-orange-500"
                        >
                            <ListBulletIcon className="w-6 h-6 mr-1" /> Liste des Clients
                        </Link>
                        <Link
                            to="/about"
                            className="flex items-center px-3 py-2 font-medium text-gray-600 border-b border-transparent hover:text-blue-500 hover:border-orange-500"

                        >
                            <UserGroupIcon className="w-6 h-6 mr-1" /> A propos de Nous
                        </Link>
                        <Link
                            to="/contact"
                            className="flex items-center px-3 py-2 font-medium text-gray-600 border-b border-transparent hover:text-blue-500 hover:border-orange-500"

                        >
                            <EnvelopeIcon className="w-5 h-5 mr-1" /> Nous contacter
                        </Link>
                    </div>

                    {/* Affichage du nom d'utilisateur */}
                    <div className="flex items-center space-x-6">
                        <div className='font-light font-sm' >Bonjour <span className="font-bold text-blue-500">{userName}</span></div>
                        <button
                            onClick={handleLogout}
                            className="flex justify-between px-3 py-2 font-light text-gray-700 border-b border-transparent align-center ms-4 hover:text-black"
                        >
                            <ArrowRightEndOnRectangleIcon className="w-6 h-6 mr-1" /> Se déconnecter
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
