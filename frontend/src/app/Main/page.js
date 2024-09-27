'use client';
import React, { useState } from 'react';
import Searchresult from '../component/Searchresult/page';

const Main = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <Searchresult word={searchQuery} />
        </div>
    );
};

export default Main;
