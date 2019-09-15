import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Post', new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    author: [
        { type: Schema.Types.ObjectId, ref: 'User', required: true }
    ],
    category: [
        { type: Schema.Types.ObjectId, ref: 'Category', required: true }
    ]
}), 'posts');