'use client';
import React, { useState } from 'react';

const Student = ({ studentData }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    const renderStudentData = (data) => {
        return Object.entries(data).map(([key, value]) => {
            // If the value is an object, recursively render it
            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={key} className="mb-4">
                        <strong className="text-base md:text-lg">{key}:</strong>
                        <div className="ml-4">{renderStudentData(value)}</div>
                    </div>
                );
            }

            return (
                <p key={key} className="mb-2">
                    <strong className="text-base md:text-lg">{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
            );
        });
    };

    if (!isVisible) {
        return null; 
    }

    if (!studentData) {
        return <div className="text-center text-gray-700">Select a student to see details.</div>;
    }

    return (
        <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {studentData.firstName} {studentData.lastName}
            </h1>
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
                &#x2715;
            </button>

            <div className="text-gray-700">
                {renderStudentData(studentData)}
            </div>
        </div>
    );
}

export default Student;