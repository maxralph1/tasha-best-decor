import { useRef, useState } from 'react'; 
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { Link } from 'react-router-dom'; 
import { route } from '@/routes'; 
import { useCategories } from '@/hooks/useCategories.jsx'; 
import { useProducts } from '@/hooks/useProducts.jsx'; 
import { useProduct } from '@/hooks/useProduct.jsx'; 
import Layout from '@/components/private/Layout.jsx'; 

export default function Index() { 
    const { categories, getCategories } = useCategories(); 
    const { products, getProducts } = useProducts(); 
    const { product, createProduct, updateProduct, deleteProduct, destroyProduct, restoreProduct } = useProduct(); 
    const [features, setFeatures] = useState(''); 
    const [productCategories, setProductCategories] = useState([]); 

    console.log(products); 

    async function addCategoryToArray(category) {
        if (productCategories?.includes(category)) {
            setProductCategories(productCategories.filter(categoryItem => categoryItem !== category))
        } else {
            setProductCategories([...productCategories, category]); 
        }
    } 

    console.log(productCategories); 

    async function addProduct(e) {
        e.preventDefault(); 

        console.log(product.data); 
        console.log(e.target.currency.value); 

        const formData = new FormData(); 
        product.data.brand && formData.append('brand', product.data.brand); 
        product.data.discount && formData.append('discount', product.data.discount); 
        formData.append('features', features); 
        formData.append('image_1', product.data.image_1); 
        formData.append('image_2', product.data.image_2); 
        formData.append('image_3', product.data.image_3); 
        formData.append('image_4', product.data.image_4); 
        formData.append('image_5', product.data.image_5); 
        formData.append('categories', productCategories); 
        formData.append('title', product.data.title); 
        formData.append('description', product.data.description); 
        formData.append('retail_price', product.data.retail_price); 
        formData.append('initial_retail_price', product.data.initial_retail_price); 
        formData.append('currency', e.target.currency.value); 

        await createProduct(formData); 

        product.data.brand = ''; 
        product.data.discount = ''; 
        product.data.features = ''; 
        product.data.image_1 = ''; 
        product.data.image_2 = ''; 
        product.data.image_3 = ''; 
        product.data.image_4 = ''; 
        product.data.image_5 = ''; 
        product.data.productCategories = ''; 
        product.data.title = ''; 
        product.data.description = ''; 
        product.data.retail_price = ''; 
        product.data.initial_retail_price = ''; 
        product.data.currency = ''; 

        await getProducts(products?.meta?.current_page); 
    }

    return (
        <Layout>
            <section>
                {(products?.data?.length > 0) 
                    ? products?.data?.map(product => {
                        return (
                            <div>{product.features}</div>
                        )
                    }) 
                        : <></> }
            </section> 

            <section>
                <form onSubmit={ addProduct } encType='multipart/form-data'>
                    <div>
                        <input 
                            type="text" 
                            name="title" 
                            id="title" 
                            value={ product.data.title ?? '' }
                            onChange={ e => product.setData({
                                ...product.data,
                                title: e.target.value,
                            }) }
                            placeholder="e.g. Gucci"
                            required /> 
                        <label htmlFor="title">Title</label>
                    </div> 
                    <div>
                        <textarea 
                            name="description" 
                            id="description" 
                            value={ product.data.description ?? '' }
                            onChange={ e => product.setData({
                                ...product.data,
                                description: e.target.value,
                            }) }
                            placeholder="e.g. Gucci"
                            required ></textarea> 
                        <label htmlFor="description">Description</label>
                    </div> 
                    
                    <div>
                        <ReactQuill 
                            theme="snow" 
                            value={ features } 
                            onChange={ setFeatures } />
                        <label htmlFor="features">Features</label> 
                    </div> 

                    <div>
                        <input 
                            type="number" 
                            name="retail_price" 
                            id="retail_price" 
                            value={ product.data.retail_price ?? '' }
                            onChange={ e => product.setData({
                                ...product.data,
                                retail_price: e.target.value,
                            }) }
                            required /> 
                        <label htmlFor="retail_price">Retail Price</label>
                    </div> 
                    <div>
                        <input 
                            type="number" 
                            name="initial_retail_price" 
                            id="initial_retail_price" 
                            value={ product.data.initial_retail_price ?? '' }
                            onChange={ e => product.setData({
                                ...product.data,
                                initial_retail_price: e.target.value,
                            }) } />
                        <label htmlFor="initial_retail_price">Initial Retail Price</label>
                    </div> 
                    <div>
                        <ul className="py-4 d-flex flex-column gap-4">
                            {(categories?.data?.length > 0) && (categories?.data?.map((category, index) => {
                                return (
                                    <li 
                                        onClick={ async () => {
                                            await addCategoryToArray(category?._id)
                                        } }

                                        key={ category?._id } 
                                        className={`d-flex flex-column ${(index != 0) && 'border-top'}`} style={{ cursor: 'pointer' }}>
                                            <span>Title: { category?.title }</span>
                                            <span>Description: { category?.description }</span>
                                    </li>
                                ) 
                            }))} 

                            <select 
                                name="product_categories" 
                                id="product_categories" 
                                className="form-select" 
                                aria-label="Floating label select example">
                                    {/* <option value="individual" defaultValue>Individual</option>
                                    <option value="enterprise">Enterprise</option>  */}

                                    {(categories?.data?.length > 0) && (categories?.data?.map((category, index) => {
                                        return (
                                            <option key={category?._id} value={ category?._id } className={`d-flex flex-column ${(index != 0) && 'border-top'}`}>{ category?.title }
                                            </option>
                                        )
                                    }))} 
                            </select>

                            <select 
                                name="currency" 
                                id="currency" 
                                className="form-select" 
                                onSelect={ e => product.setData({
                                    ...product.data,
                                    currency: e.target.value,
                                }) }
                                aria-label="Floating label select example">
                                    <option value="usd" defaultValue>USD</option>
                                    <option value="mur">MUR</option> 
                            </select>
                        </ul>
                    </div> 

                    <div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            name="image_1" 
                            id="image_1" 
                            className='form-control' 
                            onChange={ e => product.setData({
                                ...product.data,
                                image_1: e.target.files[0],
                            }) } /> 
                        <label htmlFor="image_1">Image 1</label>
                    </div> 

                    <div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            name="image_2" 
                            id="image_2" 
                            className='form-control' 
                            onChange={ e => product.setData({
                                ...product.data,
                                image_2: e.target.files[0],
                            }) } /> 
                        <label htmlFor="image_2">Image 2</label>
                    </div> 

                    <div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            name="image_3" 
                            id="image_3" 
                            className='form-control' 
                            onChange={ e => product.setData({
                                ...product.data,
                                image_3: e.target.files[0],
                            }) } /> 
                        <label htmlFor="image_3">Image 3</label>
                    </div> 

                    <div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            name="image_4" 
                            id="image_4" 
                            className='form-control' 
                            onChange={ e => product.setData({
                                ...product.data,
                                image_4: e.target.files[0],
                            }) } /> 
                        <label htmlFor="image_4">Image 4</label>
                    </div> 

                    <div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            name="image_5" 
                            id="image_5" 
                            className='form-control' 
                            onChange={ e => product.setData({
                                ...product.data,
                                image_5: e.target.files[0],
                            }) } /> 
                        <label htmlFor="image_5">Image 5</label>
                    </div> 

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </section>
        </Layout>
    )
}
