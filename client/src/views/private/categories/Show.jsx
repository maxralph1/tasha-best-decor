import { useState } from 'react'; 
import { Link, useParams } from 'react-router-dom'; 
import { route } from '@/routes'; 
import { useCategory } from '@/hooks/useCategory.jsx'; 
import { useSubCategory } from '@/hooks/useSubCategory.jsx'; 
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
import utc from 'dayjs/plugin/utc';
import Layout from '../../../components/public/Layout';
dayjs.extend(relativeTime);
dayjs.extend(utc); 

export default function Show() { 
    const params = useParams(); 
    const { category, getCategory, createCategory, updateCategory, deleteCategory, destroyCategory, restoreCategory } = useCategory(params?.id); 
    const { createSubCategory, updateSubCategory, deleteSubCategory, destroySubCategory, restoreSubCategory } = useSubCategory(); 

    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 

    console.log(category); 

    async function addSubCategory(e) {
        e.preventDefault(); 

        let category = e.target.category.value; 

        await createSubCategory (title, description, category); 

        setTitle(''); 
        e.target.title.value = ''; 
        setDescription(''); 
        e.target.description.value = '';

        getCategory(params?.id); 
    }

    return (
        <Layout>
            <section>
                <h2>Title: { category?.data?.title }</h2>
                <p>Description: { category?.data?.description }</p>
            </section> 

            <section>
                <h3>Sub-Categories</h3> 

                <div>
                    <form onSubmit={ addSubCategory }>
                        <div>
                            <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                onChange={ e => setTitle(e.target.value )} 
                                placeholder="e.g. Sofa"
                                required /> 
                            <label htmlFor="title">Title</label>
                        </div>
                        <div>
                            <input 
                                type="text" 
                                name="description" 
                                id="description" 
                                onChange={ e => setDescription(e.target.value )} 
                                placeholder="e.g. Sofa"
                                required /> 
                            <label htmlFor="description">Description</label>
                        </div> 
                        <div>
                            <input 
                                type="text" 
                                name="category" 
                                id="category" 
                                defaultValue={ category?.data?.data?._id } 
                                hidden /> 
                        </div> 
                        <div>
                            <button type="submit" className="btn btn-dark">Add Sub-category</button>
                        </div>
                    </form>
                </div>

                <ul className="py-4 d-flex flex-column gap-4">
                    {(category?.data?.sub_categories?.length > 0) && (category?.data?.sub_categories?.map((subCategory, index) => {
                        return (
                            <li key={ subCategory?._id } className={`d-flex flex-column ${(index != 0) && 'border-top'}`}>
                                <span>Title: { subCategory?.title }</span>
                                <span>Description: { subCategory?.description }</span>
                            </li>
                        )
                    }))}
                </ul>
            </section> 
        </Layout>
    )
}
