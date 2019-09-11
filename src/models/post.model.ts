import mongoose from 'mongoose';

export default mongoose.model('Post', new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}), 'posts');