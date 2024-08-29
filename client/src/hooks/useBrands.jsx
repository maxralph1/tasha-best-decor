import { useState, useEffect } from 'react'; 
import useAxios from '@/utils/useAxios.jsx'; 


export function useBrands(page = 1, limit = 10) {
    const axiosInstance = useAxios(); 
    const [brands, setBrands] = useState([]); 

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController(); 
            getBrands({page, limit}, { signal: controller.signal }); 
            return () => { controller.abort() };
        }
    }, [page, limit]); 

    async function getBrands(page, { signal } = {}) {
        return axiosInstance.get(`brands?page=${page}&limit=${limit}`, { signal }) 
            .then(response => setBrands(response?.data))
            .catch(error => console.log(error));
    } 

    return { brands, getBrands }; 
} 
