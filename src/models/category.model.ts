import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Category', new Schema({
    name: { type: String, required: true },
    posts: [
        { type: Schema.Types.ObjectId, ref: 'Post' }
    ]
}), 'categories');