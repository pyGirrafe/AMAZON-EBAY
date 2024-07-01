import { useState } from 'react';
import { axiosInstance } from '@/lib/utils';

interface UseIsbnProps {
    url: string;
    isbns: string[];
}
const useIsbn = ({ url, isbns }: UseIsbnProps) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(process.env.NEXT_PUBLIC_BASE_URL + url, {"isbns": isbns});
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};

export default useIsbn;
