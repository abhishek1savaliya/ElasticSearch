'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css';
import Student from '../Student/page';

const Searchresult = ({ word }) => {
    const [studentsName, setStudentsName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sloading, setSloading] = useState(false);
    const [error, setError] = useState(null);
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!word || word.trim() === '') {
                setStudentsName([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://elasticsearch-c3xg.onrender.com/search/${word}`);
                if (response.data.success) {
                    setStudentsName(response.data.studentsName);
                } else {
                    setStudentsName([]);
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [word]);

    const fetchStudentDetails = async (id) => {
        setSloading(true); // Set loading to true when fetching student details
        setStudentData(null); // Clear previous student data
        setError(null);

        try {
            const response = await axios.get(`https://elasticsearch-c3xg.onrender.com/student/${id}`);
            setStudentData(response.data);
        } catch (err) {
            setError('Error fetching student details');
        } finally {
            setSloading(false); // Set loading to false after fetching is done
        }
    };

    return (
        <>
            <div className="min-h-[360px]">
                {loading && <div className="spinner"></div>}
                {error && <div className="text-red-700">{error}</div>}

                {!loading && !error && (
                    <ul className="list-disc text-white rounded-lg">
                        {studentsName && studentsName.length > 0 ? (
                            studentsName.map((student) => (
                                <p
                                    key={student.id}
                                    className="hover:bg-gray-700 p-1 cursor-pointer text-white"
                                    onClick={() => fetchStudentDetails(student.id)}
                                >
                                    {student.name}
                                </p>
                            ))
                        ) : (
                            <ul className="text-red-700 flex justify-center">No results found</ul>
                        )}
                    </ul>
                )}
            </div>

            <div>
                {studentData ? (
                    <Student studentData={studentData} />
                ) : (
                    sloading && <div className="spinner"></div>
                )}
            </div>
        </>
    );
};

export default Searchresult;