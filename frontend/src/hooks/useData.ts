import { useState } from 'react';
import { axiosInstance } from '@/lib/utils';
import axios from 'axios';
import { UseDataProps } from '@/type';

const useData = ({ url, page, per_page }: UseDataProps) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(process.env.NEXT_PUBLIC_BASE_URL + url + '?page=' + page + '&per_page=' + per_page);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};

export default useData;
