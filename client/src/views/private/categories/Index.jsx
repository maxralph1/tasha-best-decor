import { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { route } from '@/routes';
import { useCategories } from '@/hooks/useCategories.jsx'; 
import { useCategory } from '@/hooks/useCategory.jsx'; 
import { useSubCategories } from '@/hooks/useSubCategories.jsx'; 
import { useSubCategory } from '@/hooks/useSubCategory.jsx'; 
import Layout from '@/components/private/Layout.jsx'; 

export default function Index() { 
    const { categories, getCategories } = useCategories(); 
    const { createCategory, updateCategory, deleteCategory, destroyCategory, restoreCategory } = useCategory(); 
    const { subCategories, getSubCategories } = useSubCategories(); 
    const { createSubCategory, updateSubCategory, deleteSubCategory, destroySubCategory, restoreSubCategory } = useSubCategory(); 
    console.log(categories); 
    console.log(categories?.data); 
    // console.log(subCategories?.data); 

    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 

    async function addCategory(e) {
        e.preventDefault(); 

        await createCategory(title, description); 

        setTitle(''); 
        e.target.title.value = ''; 
        setDescription(''); 
        e.target.description.value = ''; 

        await getCategories(); 
    };

    async function addSubCategory(e) {
        e.preventDefault(); 

        let category = e.target.category.value; 
        // console.log(category); 

        await createSubCategory(title, description, category); 

        setTitle(''); 
        e.target.title.value = ''; 
        setDescription(''); 
        e.target.description.value = ''; 

        await getCategories(); 
    };

    return (
        <Layout> 
            {/* Categories list with their sub-categories */}
            <div>
                {(categories?.data?.length > 0) 
                    ? categories?.data?.map(category => { 
                        return (
                            <div key={ category?._id }>
                                <span>{ category?.title }</span> 

                                <Link to={ route('home.categories.show', { id: category?._id }) } >
                                    See more
                                </Link>

                                <section>
                                    <h3 className="border-bottom">Sub-categories of { category?.title }</h3> 

                                    {/* Add Sub-category */} 
                                    <section>
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
                                                    defaultValue={ category?._id } 
                                                    hidden /> 
                                            </div> 
                                            <div>
                                                <button type="submit" className="btn btn-dark">Add Sub-category</button>
                                            </div>
                                        </form>
                                    </section>

{/* 
                                    <ul>
                                        {(category?.sub_categories?.length > 0) && category?.sub_categories?.map(subCategory => {
                                            <li key={ subCategory?._id }>{ subCategory?.title }</li>
                                        })}
                                    </ul> */}
                                </section>
                            </div>
                        )
                    }) 
                        : <span>No categories</span>}
            </div> 

            <br /> 

            <br />

            {/* Add a category */} 
            <section>
                <form onSubmit={ addCategory }>
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
                        <button type="submit" className="btn btn-dark">Add Category</button>
                    </div>
                </form>
            </section>
        </Layout>
    )
}
