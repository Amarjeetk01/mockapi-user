import { useEffect, useState } from "react";

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const url = 'https://602e7c2c4410730017c50b9d.mockapi.io/users';
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network Error');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchApiData();

    }, []);

    return { data, loading, error };
};

export default useFetch;
