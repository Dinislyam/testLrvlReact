import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Устанавливаем состояние загрузки
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading }; // Возвращаем состояние загрузки
};

export default useFetchData;
