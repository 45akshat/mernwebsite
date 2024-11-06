// Notification.js
import React from 'react';

const Notification = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-end justify-center p-6 pointer-events-none">
            <div className="w-full max-w-sm pointer-events-auto">
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <div className="bg-green-500 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-white">Payment Successful</h3>
                                <p className="mt-1 text-sm text-white">{message}</p>
                            </div>
                            <div className="ml-auto">
                                <button
                                    className="text-white hover:text-gray-200 focus:outline-none"
                                    onClick={onClose}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
