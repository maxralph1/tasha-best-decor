import asyncHandler from 'express-async-handler'; 
import Product from '../models/Product.js'; 


const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find().sort('-created_at').lean(); 
    if (!products?.length) return res.status(404).json({ message: "No products found!" });

	res.json({ data: products });
});

const createProduct = asyncHandler(async (req, res) => {
    const { brand, 
            discount, 
            category, 
            sub_category, 
            title, 
            description, 
            retail_price, 
            initial_discount_value } = req?.body; 

    const product = new Product({
        user: req?.user_id, 
        brand, 
        discount, 
        category, 
        sub_category, 
        title, 
        description, 
        retail_price, 
        initial_discount_value 
    }); 

    product.save()
        .then(() => {
            res.status(201).json({ success: `Product ${product._id} added`, data: product });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const getProduct = asyncHandler(async (req, res) => { 
    const { id } = req?.params;
	const product = await Product.findOne({ _id: id })
		.select(['-created_at', '-updated_at', '-deleted_at'])
		.lean();

	if (!product) return res.status(404).json({ message: `No product matches product ${id}!` });
	res.status(200).json({ data: product });
}); 

const updateProduct = asyncHandler(async (req, res) => {
    const { brand, 
            discount, 
            category, 
            sub_category, 
            title, 
            description, 
            retail_price, 
            initial_discount_value } = req?.body; 

    const { id } = req?.params; 

    const product = await Product.findOne({ _id: id }).exec();
    if (!product) return res.status(404).json({ message: "Product not found!" }); 

    if (brand) product.brand = brand; 
    if (discount) product.discount = discount; 
    if (category) product.category = category; 
    if (sub_category) product.sub_category = sub_category; 
    if (title) product.title = title; 
    if (description) product.description = description; 
    if (retail_price) product.retail_price = retail_price; 
    if (initial_discount_value) product.initial_discount_value = initial_discount_value; 

    product.save()
        .then(() => { 
			res.status(200).json({ success: `Product record updated.`, data: product });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const product = await Product.findOne({ _id: id }).exec();

    if (!product) return res.status(404).json({ message: `No product matches the product ${id}!` }); 

    if (product.deleted_at == '') {
        product.deleted_at = new Date().toISOString();
        product.deleted_by = req?.user_id;
    }

    product.save()
        .then(() => { 
			res.status(200).json({ success: `Product record deleted.`, data: product });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const restoreProduct = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const product = await Product.findOne({ _id: id }).exec();

    if (!product) return res.status(404).json({ message: `No product matches the product ${id}!` }); 

    if (product.deleted_at != '') {
        product.deleted_at = '';
        product.deleted_by = '';
    };

    product.save()
        .then(() => { 
			res.status(200).json({ success: `Deleted product record restored.`, data: product });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const destroyProduct = asyncHandler(async (req, res) => {
    const { id } = req?.params;
	const product = await Product.findOne({ _id: id }).exec();

	if (!product) return res.status(404).json({ message: `No product matches the product ${id}!` }); 

	await product.deleteOne(); 

	res.status(200).json({ success: `Product ${product?._id} has been permanently deleted.`, data: `${product}` });
}); 


export { getProducts, 
		createProduct, 
		getProduct, 
		updateProduct, 
		deleteProduct, 
        restoreProduct, 
        destroyProduct }; 