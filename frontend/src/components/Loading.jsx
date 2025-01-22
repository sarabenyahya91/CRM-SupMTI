


export const MetricsLoading = () => Array.from({ length: 4 }).map((_, index) => (
    <div
        key={index}
        className="p-4 bg-white rounded-lg shadow-md animate-pulse"
    >
        <div className="h-4 mb-2 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
    </div>
));

export const ActivitiesLoading = () => Array.from({ length: 4 }).map((_, index) => (
    <div
        key={index}
        className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md animate-pulse"
    >
        <div className="h-4 mb-2 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
    </div>
));

export const Loading = () => (
    <div className="animate-pulse">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-16 mb-1 bg-gray-200 rounded"></div>
        <div className="h-16 mb-1 bg-gray-200 rounded"></div>
        <div className="h-16 mb-1 bg-gray-200 rounded"></div>
    </div>
);

export const LoadingModal = ({ isLoading, message = "Veuillez patienter..." }) => {
    if (!isLoading) return null; // Si isLoading est false, ne rien afficher

    return (
        <div className="fixed inset-0 top-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
                {/* Animation de chargement */}
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                {/* Message */}
                <p className="mt-4 text-center text-gray-700">{message}</p>
            </div>
        </div>
    );
};