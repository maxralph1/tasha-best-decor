import asyncHandler from 'express-async-handler'; 
import SubCategory from '../models/SubCategory.js'; 


const getSubCategories = asyncHandler(async (req, res) => {
	const subCategories = await SubCategory.find().sort('-created_at').lean(); 
    if (!subCategories?.length) return res.status(404).json({ message: "No sub-categories found!" });

	res.json({ data: subCategories });
});

const createSubCategory = asyncHandler(async (req, res) => {
    const { category, 
            title, 
            description } = req?.body; 

    const subCategory = new SubCategory({
        added_by: req?.user_id, 
        category, 
        title, 
        description
    }); 

    subCategory.save()
        .then(() => {
            res.status(201).json({ success: `Category ${subCategory._id} added`, data: subCategory });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const getSubCategory = asyncHandler(async (req, res) => { 
    const { id } = req?.params;

	const subCategory = await SubCategory.findOne({ _id: id })
		.select(['-created_at', '-updated_at', '-deleted_at'])
		.lean();

	if (!subCategory) return res.status(404).json({ message: `No sub-category matches category ${req?.params?.id}!` });
	res.status(200).json({ data: subCategory });
}); 

const updateSubCategory = asyncHandler(async (req, res) => {
    const { category, 
            title, 
            description } = req?.body; 

    const { id } = req?.params; 

    const subCategory = await SubCategory.findOne({ _id: id }).exec();
    if (!subCategory) return res.status(404).json({ message: "Sub-category not found!" }); 

    if (category) subCategory.category = category; 
    if (title) subCategory.title = title; 
    if (description) subCategory.description = description; 

    subCategory.save()
        .then(() => { 
			res.status(200).json({ success: `Sub-category record updated.`, data: subCategory });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const deleteSubCategory = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const subCategory = await SubCategory.findOne({ _id: id }).exec();

    if (!subCategory) return res.status(404).json({ message: `No sub-category matches the sub-category ${id}!` }); 

    if (subCategory.deleted_at == '') {
        subCategory.deleted_at = new Date().toISOString();
        subCategory.deleted_by = req?.user_id;
    }

    subCategory.save()
        .then(() => { 
			res.status(200).json({ success: `Sub-category record deleted.`, data: subCategory });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const restoreSubCategory = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const subCategory = await SubCategory.findOne({ _id: id }).exec();

    if (!subCategory) return res.status(404).json({ message: `No sub-category matches the sub-category ${id}!` }); 

    if (subCategory.deleted_at != '') {
        subCategory.deleted_at = '';
        subCategory.deleted_by = '';
    };

    subCategory.save()
        .then(() => { 
			res.status(200).json({ success: `Deleted sub-category record restored.`, data: subCategory });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const destroySubCategory = asyncHandler(async (req, res) => {
    const { id } = req?.params;

	const subCategory = await SubCategory.findOne({ _id: id }).exec();

	if (!subCategory) return res.status(404).json({ message: `No sub-category matches the sub-category ${id}!` }); 

	await subCategory.deleteOne(); 

	res.status(200).json({ success: `Sub-category ${subCategory?._id} has been permanently deleted.`, data: `${subCategory}` });
}); 


export { getSubCategories, 
		createSubCategory, 
		getSubCategory, 
		updateSubCategory, 
		deleteSubCategory, 
        restoreSubCategory, 
        destroySubCategory }; 