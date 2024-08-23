import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { route } from '@/routes'; 
import useAxios from '@/utils/useAxios.jsx'; 


export function useSubCategory(id = null) {
    const [errors, setErrors] = useState({}); 
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState({}); 
    const navigate = useNavigate(); 
    const axiosInstance = useAxios(); 


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getSubCategory(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createSubCategory(title, description, category) {
        setLoading(true); 
        setErrors({}); 

        console.log(); 
        return axiosInstance.post('sub-categories', { title, description, category })
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

    async function getSubCategory(id, { signal } = {}) {
        setLoading(true); 

        return axiosInstance.get(`sub-categories/${id}`, { signal })
            .then(response => setData(response?.data?.data))
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false));
    }

    async function updateSubCategory( title, description ) {
        setLoading(true); 
        setErrors({});

        return axiosInstance.put(`categories/${id}`, { title, description })
            .then(() => navigate(route('home.sub-categories.index')))
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false));
    }

    async function deleteSubCategory(subCategory) {
        return axiosInstance.patch(`sub-categories/${subCategory?._id}`)
            .then(() => {})
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false)); 
    } 

    async function destroySubCategory(subCategory) {
        return axiosInstance.delete(`sub-categories/${subCategory?._id}`)
            .then(() => {})
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false)); 
    } 

    async function restoreSubCategory(subCategory) {
        return axiosInstance.patch(`sub-categories/${subCategory?._id}/restore`)
            .then(() => {})
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false)); 
    } 


    return {
        subCategory: { data, setData, errors, loading }, 
        getSubCategory, 
        createSubCategory, 
        updateSubCategory, 
        deleteSubCategory, 
        destroySubCategory, 
        restoreSubCategory
    }
}