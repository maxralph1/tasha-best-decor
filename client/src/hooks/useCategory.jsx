import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { route } from '@/routes'; 
import useAxios from '@/utils/useAxios.jsx'; 
import swal from 'sweetalert2'; 


export function useCategory(id = null) {
    const [errors, setErrors] = useState({}); 
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState({}); 
    const navigate = useNavigate(); 
    const axiosInstance = useAxios(); 


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getCategory(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createCategory(title, description) {
        setLoading(true); 
        setErrors({}); 

        console.log(); 
        return axiosInstance.post('categories', {title, description})
            .then(response => {
                setData(response?.data)
                // console.log(response);
            })
            .catch(error => {
                setErrors(error?.response); 
                if (error?.response?.status == 409) {
                    swal.fire({
                        text: `${error?.response?.data?.message}`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false 
                    });
                } else {
                    swal.fire({
                        text: `${error?.response?.status}: An error occured!`, 
                        color: '#900000', 
                        width: 325, 
                        position: 'top', 
                        showConfirmButton: false 
                    });
                }
                // console.log(error);
            })
            .finally(() => setLoading(false));
    } 

    async function getCategory(id, { signal } = {}) {
        setLoading(true); 

        return axiosInstance.get(`categories/${id}`, { signal })
            .then(response => setData(response?.data?.data))
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false));
    }

    async function updateCategory(title) {
        setLoading(true); 
        setErrors({});

        return axiosInstance.put(`categories/${id}`, {title})
            .then(() => navigate(route('home.categories.index')))
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false));
    }

    async function deleteCategory(category) {
        return axiosInstance.patch(`categories/${category?._id}`)
            .then(() => {})
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false)); 
    } 

    async function destroyCategory(category) {
        return axiosInstance.delete(`categories/${category?._id}`)
            .then(() => {})
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false)); 
    } 

    async function restoreCategory(category) {
        return axiosInstance.patch(`categories/${category?._id}/restore`)
            .then(() => {})
            .catch(error => setErrors(error?.response))
            .finally(() => setLoading(false)); 
    } 


    return {
        category: { data, setData, errors, loading }, 
        getCategory, 
        createCategory, 
        updateCategory, 
        deleteCategory, 
        destroyCategory, 
        restoreCategory
    }
}