import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-center text-white">
                <h1 className="mb-4 text-4xl font-bold tracking-widest">Bienvenue sur notre application CRM SupMTI</h1>
                <p className="text-lg">Gérer vos clients de manière éfficace</p>
                <Link to="/clients" className="inline-block px-6 py-3 mt-6 text-blue-500 bg-white rounded-md shadow-md hover:bg-blue-100">
                    Commencer maintenant
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
