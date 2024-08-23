import { useState, useEffect } from 'react'; 
import useAxios from '@/utils/useAxios.jsx'; 


export function useProducts(page = 1) {
    const axiosInstance = useAxios(); 
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController(); 
            getProducts(page, { signal: controller.signal }); 
            return () => { controller.abort() };
        }
    }, [page]); 

    async function getProducts(page, { signal } = {}) {
        return axiosInstance.get(`products?page=${page}`, { signal }) 
            .then(response => setProducts(response?.data))
            .catch(error => console.log(error));
    } 

    return { products, getProducts };
}