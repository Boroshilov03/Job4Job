
import React, { useState, useEffect } from 'react';
import { FaSearch, FaExclamationCircle } from 'react-icons/fa';
import JobsCardUI from "../Jobs/JobsCardUI.jsx";
import { CircularProgress } from "@mui/material";

const SearchPage = () => {
    const [formDataList, setFormDataList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/view_all_jobs`);
                const data = await response.json();
                setFormDataList(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        // Filter the data based on the search text and selected category
        const filtered = formDataList.filter((item) =>
            (selectedCategory ? item.category === selectedCategory : true) &&
            item.description.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchText, selectedCategory, formDataList]);

    // Function to filter data by category
    const handleCategoryFilter = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    };

    return (
        <div className="mx-4 my-8 overflow-y-auto">
            <div className="flex items-center">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="p-2 border rounded-md w-full text-purple-500 font-bold text-xl"
                />
            </div>
            {loading ? (
                <div className="flex items-center justify-center h-[calc(100vh-50px)] -mt-20">
                    <CircularProgress color="secondary" size={70} />
                </div>
            ) : (
                <div className="mt-4">
                    <div className="mb-4 flex space-x-4 overflow-x-auto p-2 -ml-2">
                        {/* Filter chips for categories */}
                        <CategoryChip
                            category="All"
                            selected={selectedCategory === null}
                            onSelect={() => handleCategoryFilter(null)}
                        />
                        {Array.from(new Set(formDataList.map((item) => item.category))).map((category, index) => (
                            <CategoryChip
                                key={index}
                                category={category}
                                selected={category === selectedCategory}
                                onSelect={() => handleCategoryFilter(category)}
                            />
                        ))}
                    </div>
                    {filteredData.length === 0 ? (
                        <div className="flex items-center text-gray-600">
                            <FaExclamationCircle className="mr-2 animate-pulse text-purple-500" />
                            <p>No data matching your search criteria.</p>
                        </div>
                    ) : (
                        <div className="mt-4">
                            {filteredData.map((item, index) => (
                                <li className="mb-4 list-none" key={index}>
                                    <JobsCardUI key={index} data={item} />
                                </li>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// CategoryChip component
const CategoryChip = ({ category, selected, onSelect }) => {
    return (
        <button
            className={`${
                selected
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-purple-300 text-white shadow-sm hover:bg-purple-400'
            } px-2 py-1 rounded-md text-xs m-1`}
            onClick={onSelect}
        >
            {category}
        </button>
    );
};

export default SearchPage;
