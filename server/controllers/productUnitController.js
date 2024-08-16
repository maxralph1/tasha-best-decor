import asyncHandler from 'express-async-handler'; 
import ProductUnit from '../models/ProductUnit.js'; 


const getProductUnits = asyncHandler(async (req, res) => {
	const productUnits = await ProductUnit.find().sort('-created_at').lean(); 
    if (!productUnits?.length) return res.status(404).json({ message: "No product units found!" });

	res.json({ data: productUnits });
});

const createProductUnit = asyncHandler(async (req, res) => {
    const { discount, 
            product, 
            sku, 
            title, 
            description, 
            purchase_price, 
            retail_price, 
            initial_discount_value, 
            sold, 
            is_product_default } = req?.body; 

    const productUnit = new ProductUnit({
        added_by: req?.user_id, 
        discount, 
        product, 
        sku, 
        title, 
        description, 
        purchase_price, 
        retail_price, 
        initial_discount_value, 
        sold, 
        is_product_default 
    }); 

    productUnit.save()
        .then(() => {
            res.status(201).json({ success: `Product unit ${productUnit._id} added`, data: productUnit });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const getProductUnit = asyncHandler(async (req, res) => { 
    const { id } = req?.params;
	const productUnit = await ProductUnit.findOne({ _id: id })
		.select(['-created_at', '-updated_at', '-deleted_at'])
		.lean();

	if (!productUnit) return res.status(404).json({ message: `No product unit matches product unit ${id}!` });
	res.status(200).json({ data: productUnit });
}); 

const updateProductUnit = asyncHandler(async (req, res) => {
    const { added_by, 
            bought_by, 
            discount, 
            product, 
            sku, 
            title, 
            description, 
            purchase_price, 
            retail_price, 
            initial_discount_value, 
            sold, 
            is_product_default } = req?.body; 

    const { id } = req?.params; 

    const productUnit = await ProductUnit.findOne({ _id: id }).exec();
    if (!productUnit) return res.status(404).json({ message: "Product unit not found!" }); 

    if (added_by) productUnit.added_by = added_by; 
    if (bought_by) productUnit.bought_by = bought_by; 
    if (discount) productUnit.discount = discount; 
    if (product) productUnit.product = product; 
    if (sku) productUnit.sku = sku; 
    if (title) productUnit.title = title;  
    if (description) productUnit.description = description; 
    if (purchase_price) productUnit.purchase_price = purchase_price; 
    if (retail_price) productUnit.retail_price = retail_price; 
    if (initial_discount_value) productUnit.initial_discount_value = initial_discount_value; 
    if (sold) productUnit.sold = sold; 
    if (is_product_default) productUnit.is_product_default = is_product_default; 

    if (is_product_default == 'true') {
        let previousDefaults = await ProductUnit.find({ is_product_default: true }).exec(); 
        previousDefaults.forEach(previousDefault => {
            // Set all the previous defaults to "false".
        });
    };

    productUnit.save()
        .then(() => { 
			res.status(200).json({ success: `Product unit record updated.`, data: productUnit });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const deleteProductUnit = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const productUnit = await ProductUnit.findOne({ _id: id }).exec();

    if (!productUnit) return res.status(404).json({ message: `No product unit matches the product unit ${id}!` }); 

    if (productUnit.deleted_at == '') {
        productUnit.deleted_at = new Date().toISOString();
        productUnit.deleted_by = req?.user_id;
    }

    productUnit.save()
        .then(() => { 
			res.status(200).json({ success: `Product unit record deleted.`, data: productUnit });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const restoreProductUnit = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const productUnit = await ProductUnit.findOne({ _id: id }).exec();

    if (!productUnit) return res.status(404).json({ message: `No product unit matches the product unit ${id}!` }); 

    if (productUnit.deleted_at != '') {
        productUnit.deleted_at = '';
        productUnit.deleted_by = '';
    };

    productUnit.save()
        .then(() => { 
			res.status(200).json({ success: `Deleted product unit record restored.`, data: productUnit });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const destroyProductUnit = asyncHandler(async (req, res) => {
    const { id } = req?.params;
	const productUnit = await ProductUnit.findOne({ _id: id }).exec();

	if (!productUnit) return res.status(404).json({ message: `No product unit matches the product unit ${id}!` }); 

	await productUnit.deleteOne(); 

	res.status(200).json({ success: `Product unit ${productUnit?._id} has been permanently deleted.`, data: `${productUnit}` });
}); 


export { getProductUnits, 
		createProductUnit, 
		getProductUnit, 
		updateProductUnit, 
		deleteProductUnit, 
        restoreProductUnit, 
        destroyProductUnit }; 