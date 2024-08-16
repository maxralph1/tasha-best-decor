import asyncHandler from 'express-async-handler'; 
import Order from '../models/Order.js'; 
import OrderItem from '../models/OrderItem.js';


const getOrderItems = asyncHandler(async (req, res) => {
	const orderItems = await OrderItem.find().sort('-created_at').lean(); 
    if (!orderItems?.length) return res.status(404).json({ message: "No order items found!" });

	res.json({ data: orderItems });
});

const createOrderItem = asyncHandler(async (req, res) => {
    const { product, 
            order, 
            quantity, 
            price } = req?.body; 

    const orderItem = new OrderItem({
        user: req?.user_id, 
        product, 
        order, 
        quantity, 
        price 
    }); 

    orderItem.save()
        .then(() => {
            res.status(201).json({ success: `Order item ${orderItem._id} added`, data: orderItem });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const getOrderItem = asyncHandler(async (req, res) => {
	const orderItem = await OrderItem.findOne({ _id: req?.params?.id })
		.select(['-created_at', '-updated_at', '-deleted_at'])
		.lean();

	if (!orderItem) return res.status(404).json({ message: `No order item matches order item ${req?.params?.id}!` }); 
    
	res.status(200).json({ data: orderItem });
}); 

const updateOrderItem = asyncHandler(async (req, res) => {
    const { product, 
            order, 
            quantity, 
            price } = req?.body; 

    const { id } = req?.params; 

    const orderItem = await OrderItem.findOne({ _id: id }).exec();
    if (!orderItem) return res.status(404).json({ message: "OrderItem not found!" }); 

    if (product) orderItem.product = product; 
    if (order) orderItem.order = order; 
    if (quantity) orderItem.quantity = quantity; 
    if (price) orderItem.price = price; 

    orderItem.save()
        .then(() => { 
			res.status(200).json({ success: `Order item record updated.`, data: orderItem });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const deleteOrderItem = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const orderItem = await OrderItem.findOne({ _id: id }).exec();

    if (!orderItem) return res.status(404).json({ message: `No order item matches the order item ${id}!` }); 

    if (orderItem.deleted_at == '') {
        orderItem.deleted_at = new Date().toISOString();
        orderItem.deleted_by = req?.user_id;
    }

    orderItem.save()
        .then(() => { 
			res.status(200).json({ success: `Order item record deleted.`, data: orderItem });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const restoreOrderItem = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const orderItem = await OrderItem.findOne({ _id: id }).exec();

    if (!orderItem) return res.status(404).json({ message: `No order item matches the order item ${id}!` }); 

    if (orderItem.deleted_at != '') {
        orderItem.deleted_at = '';
        orderItem.deleted_by = '';
    };

    orderItem.save()
        .then(() => { 
			res.status(200).json({ success: `Deleted order item record restored.`, data: orderItem });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const destroyOrderItem = asyncHandler(async (req, res) => {
    const { id } = req?.params;
	const orderItem = await OrderItem.findOne({ _id: id }).exec();

	if (!orderItem) return res.status(404).json({ message: `No order item matches the order item ${id}!` }); 

	await orderItem.deleteOne(); 

	res.status(200).json({ success: `Order item ${orderItem?.code} has been permanently deleted.`, data: `${orderItem}` });
}); 


export { getOrderItems, 
		createOrderItem, 
		getOrderItem, 
		updateOrderItem, 
		deleteOrderItem, 
        restoreOrderItem, 
        destroyOrderItem }; 