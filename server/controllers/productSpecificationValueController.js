import asyncHandler from 'express-async-handler'; 
import ProductSpecificationValue from '../models/ProductSpecificationValue.js'; 


const getProductSpecificationValues = asyncHandler(async (req, res) => {
	const productSpecificationValues = await ProductSpecificationValue.find().sort('-created_at').lean(); 
    if (!productSpecificationValues?.length) return res.status(404).json({ message: "No product specificationValues found!" });

	res.json({ data: productSpecificationValues });
});

const createProductSpecificationValue = asyncHandler(async (req, res) => {
    const { product, 
            product_unit, 
            product_specification, 
            value } = req?.body; 

    const productSpecificationValue = new ProductSpecificationValue({
        user: req?.user_id, 
        product, 
        product_unit, 
        product_specification, 
        value 
    }); 

    productSpecificationValue.save()
        .then(() => {
            res.status(201).json({ success: `Product specification value ${productSpecificationValue._id} added`, data: productSpecificationValue });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const getProductSpecificationValue = asyncHandler(async (req, res) => { 
    const { id } = req?.params;
	const productSpecificationValue = await ProductSpecificationValue.findOne({ _id: id })
		.select(['-created_at', '-updated_at', '-deleted_at'])
		.lean();

	if (!productSpecificationValue) return res.status(404).json({ message: `No product specification value matches product specification value ${id}!` });
	res.status(200).json({ data: productSpecificationValue });
}); 

const updateProductSpecificationValue = asyncHandler(async (req, res) => {
    const { product, 
            product_unit, 
            product_specification, 
            value } = req?.body; 

    const { id } = req?.params; 

    const productSpecificationValue = await ProductSpecificationValue.findOne({ _id: id }).exec();
    if (!productSpecificationValue) return res.status(404).json({ message: "Product specification value not found!" }); 

    if (product) productSpecificationValue.product = product; 
    if (product_unit) productSpecificationValue.product_unit = product_unit;  
    if (product_specification) productSpecificationValue.product_specification = product_specification;  
    if (value) productSpecificationValue.value = value;  

    productSpecificationValue.save()
        .then(() => { 
			res.status(200).json({ success: `Product specification value record updated.`, data: productSpecificationValue });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const deleteProductSpecificationValue = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const productSpecificationValue = await ProductSpecificationValue.findOne({ _id: id }).exec();

    if (!productSpecificationValue) return res.status(404).json({ message: `No product specification value matches the product specification value ${id}!` }); 

    if (productSpecificationValue.deleted_at == '') {
        productSpecificationValue.deleted_at = new Date().toISOString();
        productSpecificationValue.deleted_by = req?.user_id;
    }

    productSpecificationValue.save()
        .then(() => { 
			res.status(200).json({ success: `Product specification value record deleted.`, data: productSpecificationValue });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const restoreProductSpecificationValue = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const productSpecificationValue = await ProductSpecificationValue.findOne({ _id: id }).exec();

    if (!productSpecificationValue) return res.status(404).json({ message: `No product specification value matches the product specification value ${id}!` }); 

    if (productSpecificationValue.deleted_at != '') {
        productSpecificationValue.deleted_at = '';
        productSpecificationValue.deleted_by = '';
    };

    productSpecificationValue.save()
        .then(() => { 
			res.status(200).json({ success: `Deleted product specification value record restored.`, data: productSpecificationValue });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const destroyProductSpecificationValue = asyncHandler(async (req, res) => {
    const { id } = req?.params;
	const productSpecificationValue = await ProductSpecificationValue.findOne({ _id: id }).exec();

	if (!productSpecificationValue) return res.status(404).json({ message: `No product specification value matches the product specification value ${id}!` }); 

	await productSpecificationValue.deleteOne(); 

	res.status(200).json({ success: `Product specification value ${productSpecificationValue?._id} has been permanently deleted.`, data: `${productSpecificationValue}` });
}); 


export { getProductSpecificationValues, 
		createProductSpecificationValue, 
		getProductSpecificationValue, 
		updateProductSpecificationValue, 
		deleteProductSpecificationValue, 
        restoreProductSpecificationValue, 
        destroyProductSpecificationValue }; 