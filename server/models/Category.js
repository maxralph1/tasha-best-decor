import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({ 
        added_by: { type: Schema.Types.ObjectId, ref: 'User' }, 
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


let Category = mongoose.model("Category", categorySchema);
export default Category; 