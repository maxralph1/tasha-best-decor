import { useState, useEffect } from 'react'; 
import useAxios from '@/utils/useAxios.jsx'; 


export function useSubCategories(page = 1) {
    const axiosInstance = useAxios(); 
    const [subCategories, setSubCategories] = useState([]); 

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController(); 
            getSubCategories(page, { signal: controller.signal }); 
            return () => { controller.abort() };
        }
    }, [page]); 

    async function getSubCategories(page, { signal } = {}) {
        return axiosInstance.get(`sub-categories?page=${page}`, { signal }) 
            .then(response => setSubCategories(response?.data))
            .catch(error => console.log(error));
    } 

    return { subCategories, getSubCategories };
}