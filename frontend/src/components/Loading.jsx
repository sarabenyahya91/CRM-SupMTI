


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
        <div className="h-4 mb-2 bg-gray-200 rounded"></div>
        <div className="h-4 mb-2 bg-gray-200 rounded"></div>

    </div>
); 