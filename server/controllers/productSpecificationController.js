import asyncHandler from 'express-async-handler'; 
import ProductSpecification from '../models/ProductSpecification.js'; 


const getProductSpecifications = asyncHandler(async (req, res) => {
	const productSpecifications = await ProductSpecification.find().sort('-created_at').lean(); 
    if (!productSpecifications?.length) return res.status(404).json({ message: "No product specifications found!" });

	res.json({ data: productSpecifications });
});

const createProductSpecification = asyncHandler(async (req, res) => {
    const { product, 
            title, 
            description } = req?.body; 

    const productSpecification = new ProductSpecification({
        user: req?.user_id, 
        product, 
        title, 
        description 
    }); 

    productSpecification.save()
        .then(() => {
            res.status(201).json({ success: `ProductSpecification ${productSpecification._id} added`, data: productSpecification });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const getProductSpecification = asyncHandler(async (req, res) => { 
    const { id } = req?.params;
	const productSpecification = await ProductSpecification.findOne({ _id: id })
		.select(['-created_at', '-updated_at', '-deleted_at'])
		.lean();

	if (!productSpecification) return res.status(404).json({ message: `No productSpecification matches productSpecification ${id}!` });
	res.status(200).json({ data: productSpecification });
}); 

const updateProductSpecification = asyncHandler(async (req, res) => {
    const { product, 
            title, 
            description } = req?.body; 

    const { id } = req?.params; 

    const productSpecification = await ProductSpecification.findOne({ _id: id }).exec();
    if (!productSpecification) return res.status(404).json({ message: "Product specification not found!" }); 

    if (product) productSpecification.product = product; 
    if (title) productSpecification.title = title;  
    if (description) productSpecification.description = description;  

    productSpecification.save()
        .then(() => { 
			res.status(200).json({ success: `Product specification record updated.`, data: productSpecification });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const deleteProductSpecification = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const productSpecification = await ProductSpecification.findOne({ _id: id }).exec();

    if (!productSpecification) return res.status(404).json({ message: `No product specification matches the product specification ${id}!` }); 

    if (productSpecification.deleted_at == '') {
        productSpecification.deleted_at = new Date().toISOString();
        productSpecification.deleted_by = req?.user_id;
    }

    productSpecification.save()
        .then(() => { 
			res.status(200).json({ success: `Product specification record deleted.`, data: productSpecification });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const restoreProductSpecification = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const productSpecification = await ProductSpecification.findOne({ _id: id }).exec();

    if (!productSpecification) return res.status(404).json({ message: `No product specification matches the product specification ${id}!` }); 

    if (productSpecification.deleted_at != '') {
        productSpecification.deleted_at = '';
        productSpecification.deleted_by = '';
    };

    productSpecification.save()
        .then(() => { 
			res.status(200).json({ success: `Deleted product specification record restored.`, data: productSpecification });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const destroyProductSpecification = asyncHandler(async (req, res) => {
    const { id } = req?.params;
	const productSpecification = await ProductSpecification.findOne({ _id: id }).exec();

	if (!productSpecification) return res.status(404).json({ message: `No product specification matches the product specification ${id}!` }); 

	await productSpecification.deleteOne(); 

	res.status(200).json({ success: `Product specification ${productSpecification?._id} has been permanently deleted.`, data: `${productSpecification}` });
}); 


export { getProductSpecifications, 
		createProductSpecification, 
		getProductSpecification, 
		updateProductSpecification, 
		deleteProductSpecification, 
        restoreProductSpecification, 
        destroyProductSpecification }; 