import { useState } from 'react';
import axios from 'axios';
import { UseAuthProps } from '@/type';

const useAuth = ({ url, requestData }: UseAuthProps) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + url, requestData);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};

export default useAuth;
