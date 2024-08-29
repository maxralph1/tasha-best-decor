import { useRef, useState } from 'react'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom'; 
import { route } from '@/routes'; 
import { useBrands } from '@/hooks/useBrands.jsx'; 
import { useBrand } from '@/hooks/useBrand.jsx'; 
import Layout from '@/components/private/Layout.jsx'; 

export default function Index() { 
    const inputRef = useRef(null);

    const { brands, getBrands } = useBrands(); 
    const { brand, createBrand, updateBrand, deleteBrand, destroyBrand, restoreBrand } = useBrand(); 

    const [description, setDescription] = useState('');

    async function addBrand(e) {
        e.preventDefault(); 

        console.log(brand.data);

        const formData = new FormData(); 
        formData.append('title', brand.data.title); 
        formData.append('description', brand.data.description); 
        brand.data.logo && formData.append('logo', brand.data.logo);
        formData.append('web_address', brand.data.web_address); 
        formData.append('facebook', brand.data.facebook); 
        formData.append('instagram', brand.data.instagram); 
        formData.append('twitter_x', brand.data.twitter_x); 
        formData.append('other_social', brand.data.other_social); 
        formData.append('other_social_handle', brand.data.other_social_handle); 

        await createBrand(formData);

        brand.data.title = '';
        brand.data.description = '';
        brand.data.logo = '';
        brand.data.web_address = '';
        brand.data.facebook = '';
        brand.data.instagram = '';
        brand.data.twitter_x = '';
        brand.data.other_social = '';
        brand.data.other_social_handle = '';

        await getBrands(brands?.meta?.current_page);
    }

    return (
        <Layout>
            {(brands?.data?.length > 0) 
                ? brands?.data?.map(brand => {
                    return (
                        <div key={ brand?._id }>
                            <span>{ brand?.title }</span> 

                            <Link to={ route('home.brands.show', { id: brand?._id }) }>
                                See more
                            </Link> 

                            {/* Products */} 

                            <div className='d-flex flex-column'>
                                {(brand?.products?.length > 0) && brand?.products?.map(product => {
                                    return (
                                        <div className=''>
                                            <span>{ product?.title }</span>
                                            <span>{ product?.description }</span>
                                            <span>
                                                <span>{ product?.initial_retail_price }</span>
                                                <span>{ product?.retail_price }</span>
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    )
                }) 
                    : <></>} 


            <section>
                <form onSubmit={ addBrand } encType='multipart/form-data'>
                    <div>
                        <input 
                            type="text" 
                            name="title" 
                            id="title" 
                            value={ brand.data.title ?? '' }
                            onChange={ e => brand.setData({
                                ...brand.data,
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
                            value={ brand.data.description ?? '' }
                            onChange={ e => brand.setData({
                                ...brand.data,
                                description: e.target.value,
                            }) }
                            placeholder="e.g. Gucci"
                            required ></textarea> 
                        <label htmlFor="description">Description</label>
                    </div> 
                    {/* <div>
                        <ReactQuill 
                            theme="snow" 
                            name="description" 
                            id="description" 
                            value={description} onChange={setDescription}
                            placeholder="e.g. Sofa" />
                    </div>  */}
                    <div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            name="logo" 
                            id="logo" 
                            className='form-control' 
                            onChange={ e => brand.setData({
                                ...brand.data,
                                logo: e.target.files[0],
                            }) } /> 
                    </div> 
                    <div>
                        <input 
                            type="text" 
                            name="web_address" 
                            id="web_address" 
                            value={ brand.data.web_address ?? '' }
                            onChange={ e => brand.setData({
                                ...brand.data,
                                web_address: e.target.value,
                            }) }
                            placeholder="e.g. Gucci"
                            required /> 
                        <label htmlFor="web_address">Brand Web Link</label>
                    </div> 
                    <div>
                        <input 
                            type="text" 
                            name="facebook" 
                            id="facebook" 
                            value={ brand.data.facebook ?? '' }
                            onChange={ e => brand.setData({
                                ...brand.data,
                                facebook: e.target.value,
                            }) }
                            placeholder="e.g. Gucci"
                            required /> 
                        <label htmlFor="facebook">Facebook Link</label>
                    </div> 
                    <div>
                        <input 
                            type="text" 
                            name="instagram" 
                            id="instagram" 
                            value={ brand.data.instagram ?? '' }
                            onChange={ e => brand.setData({
                                ...brand.data,
                                instagram: e.target.value,
                            }) }
                            placeholder="e.g. Gucci"
                            required /> 
                        <label htmlFor="instagram">Instagram Link</label>
                    </div> 
                    <div>
                        <input 
                            type="text" 
                            name="twitter_x" 
                            id="twitter_x" 
                            value={ brand.data.twitter_x ?? '' }
                            onChange={ e => brand.setData({
                                ...brand.data,
                                twitter_x: e.target.value,
                            }) }
                            placeholder="e.g. Gucci"
                            required /> 
                        <label htmlFor="twitter_x">Twitter (X) Link</label>
                    </div> 
                    <div>
                        <input 
                            type="text" 
                            name="other_social" 
                            id="other_social" 
                            value={ brand.data.other_social ?? '' }
                            onChange={ e => brand.setData({
                                ...brand.data,
                                other_social: e.target.value,
                            }) }
                            placeholder="e.g. Gucci"
                            required /> 
                        <label htmlFor="other_social">Other Social</label>
                    </div> 
                    <div>
                        <input 
                            type="text" 
                            name="other_social_handle" 
                            id="other_social_handle" 
                            value={ brand.data.other_social_handle ?? '' }
                            onChange={ e => brand.setData({
                                ...brand.data,
                                other_social_handle: e.target.value,
                            }) }
                            placeholder="e.g. Gucci"
                            required /> 
                        <label htmlFor="other_social_handle">Other Social Handle</label>
                    </div> 
                    
                    <div>
                        <button type="submit" className="btn btn-dark">Add Brand</button>
                    </div>
                </form>
            </section>
        </Layout>
    )
}
