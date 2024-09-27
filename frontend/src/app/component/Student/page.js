'use client'
import React, { useState } from 'react';

const Student = ({ studentData }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null; 
    }

    if (!studentData) {
        return <div className="text-center text-gray-700">Select a student to see details.</div>;
    }

    return (
        <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">
                {studentData.firstName} {studentData.lastName}
            </h1>
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
                &#x2715;
            </button>

            <div className="text-gray-700">
                <p className="mb-2"><strong>Age:</strong> {studentData.age}</p>
                <p className="mb-2"><strong>Gender:</strong> {studentData.gender}</p>
                <p className="mb-4"><strong>Bio:</strong> {studentData.bio}</p>
                <p className="text-sm text-gray-500"><strong>ID:</strong> {studentData.id}</p>
            </div>
        </div>
    );
}

export default Student;
