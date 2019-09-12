import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Post', new Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    author: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    category: [
        { type: Schema.Types.ObjectId, ref: 'Category' }
    ]
}), 'posts');