import React from 'react';

const Maintenance = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Under Maintenance</h1>
                <p className="text-xl text-gray-600 mb-6">
                    We're currently performing scheduled maintenance. We'll be back soon!
                </p>
                <div className="text-gray-500">
                    <p>We apologize for any inconvenience.</p>
                    <p>Please check back later.</p>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;