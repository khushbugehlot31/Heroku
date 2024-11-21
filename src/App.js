import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
    const [inputData, setInputData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonData = JSON.parse(inputData);
            const res = await axios.post('YOUR_BACKEND_URL/bfhl', jsonData);
            setResponseData(res.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
    ];
