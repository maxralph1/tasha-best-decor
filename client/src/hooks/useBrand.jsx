import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { route } from '@/routes'; 
import useAxios from '@/utils/useAxios.jsx'; 


export function useBrand(id = null) {
    const [errors, setErrors] = useState({}); 
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState({}); 
    const navigate = useNavigate(); 
    const axiosInstance = useAxios(); 


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getBrand(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createBrand(title, description) {
        setLoading(true); 
        setErrors({}); 

        console.log(); 
        return axiosInstance.post('brands', {title, description})
            .then(response => {
                setData(response?.data)
                console.log(response)
            })
            .catch(error => {
                setErrors(error?.response); 
                console.log(error);
            })
            .finally(() => setLoading(false));
    } 

    async function getBrand({id, page = 1, limit = 10}, { signal } = {}) {
        setLoading(true); 

        return axiosInstance.get(`brands/${id}?page=${page}&limit=${limit}`, { signal })
            .then(response => setData(response?.data?.data))
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false));
    }

    async function updateBrand(brand) {
        setLoading(true); 
        setErrors({}); 
        console.log(brand);

        return axiosInstance.put(`brands/${id}`, brand)
            .then(() => navigate(route('home.brands.index')))
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false));
    }

    async function deleteBrand(brand) {
        return axiosInstance.patch(`brands/${brand?._id}`)
            .then(() => {})
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false)); 
    } 

    async function destroyBrand(brand) {
        return axiosInstance.delete(`brands/${brand?._id}`)
            .then(() => {})
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false)); 
    } 

    async function restoreBrand(brand) {
        return axiosInstance.patch(`brands/${brand?._id}/restore`)
            .then(() => {})
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false)); 
    } 


    return {
        brand: { data, setData, errors, loading }, 
        getBrand, 
        createBrand, 
        updateBrand, 
        deleteBrand, 
        destroyBrand, 
        restoreBrand
    }
}