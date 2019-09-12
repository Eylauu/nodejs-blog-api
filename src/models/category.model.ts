import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Category', new Schema({
    name: String,
    posts: [
        { type: Schema.Types.ObjectId, ref: 'Post' }
    ]
}), 'categories');