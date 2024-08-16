import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const productUnitSchema = new Schema({
        added_by: { type: Schema.Types.ObjectId, ref: 'User' },  
        bought_by: { type: Schema.Types.ObjectId, ref: 'User' },  
        discount: { type: Schema.Types.ObjectId, ref: 'Discount' },  
        product: { type: Schema.Types.ObjectId, ref: 'Product' }, 
        sku: { 
            type: String, 
            required: true 
        }, 
        title: { 
            type: String, 
            required: true 
        }, 
        slug: { 
            type: String, 
            required: true 
        }, 
        description: { 
            type: String, 
            required: true 
        }, 
        purchase_price: { 
            type: String, 
            required: true 
        }, 
        retail_price: { 
            type: String, 
            required: true 
        }, 
        initial_discount_value: { 
            type: String, 
            required: true 
        }, 
        sold: { type: Boolean, default: false }, 
        is_product_default: { type: Boolean, default: false }, 
        deleted_at: { type: String, default: null }, 
        deleted_by: { type: Schema.Types.ObjectId, ref: 'User' }, 
    }, 
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);


let ProductUnit = mongoose.model("ProductUnit", productUnitSchema);
export default ProductUnit; 