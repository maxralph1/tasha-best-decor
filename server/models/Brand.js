import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const brandSchema = new Schema({ 
        user: { type: Schema.Types.ObjectId, ref: 'User' }, 
        title: { 
            type: String, 
            maxLength: 245, 
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
        logo: {
            type: String, 
            default: ''
        },
        web_address: {
            type: String, 
            default: ''
        },
        facebook: {
            type: String, 
            default: ''
        },
        instagram: {
            type: String, 
            default: ''
        },
        twitter_x: {
            type: String, 
            default: ''
        }, 
        other_social: {
            type: String, 
            default: ''
        }, 
        other_social_handle: {
            type: String, 
            default: ''
        }, 
        deleted_at: { type: String, default: null }, 
        deleted_by: { type: Schema.Types.ObjectId, ref: 'User' }, 
    }, 
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);


let Brand = mongoose.model("Brand", brandSchema);
export default Brand; 