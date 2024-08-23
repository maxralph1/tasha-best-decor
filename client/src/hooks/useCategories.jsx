import { useState, useEffect } from 'react'; 
import useAxios from '@/utils/useAxios.jsx'; 


export function useCategories(page = 1, limit = 2) {
    const axiosInstance = useAxios(); 
    const [categories, setCategories] = useState([]); 

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController(); 
            getCategories({page, limit}, { signal: controller.signal }); 
            return () => { controller.abort() };
        }
    }, [page, limit]); 

    async function getCategories({page, limit}, { signal } = {}) {
        return axiosInstance.get(`categories?page=${page}&limit=${limit}`, { signal }) 
            .then(response => setCategories(response?.data))
            .catch(error => console.log(error));
    } 

    return { categories, getCategories }; 
}