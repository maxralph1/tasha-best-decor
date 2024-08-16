import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const productSpecificationSchema = new Schema({ 
        added_by: { type: Schema.Types.ObjectId, ref: 'User' }, 
        product: { type: Schema.Types.ObjectId, ref: 'Product' }, 
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
        deleted_at: { type: String, default: null }, 
        deleted_by: { type: Schema.Types.ObjectId, ref: 'User' }, 
    }, 
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);


let ProductSpecification = mongoose.model("ProductSpecification", productSpecificationSchema);
export default ProductSpecification; 