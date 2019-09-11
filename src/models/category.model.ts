import mongoose from 'mongoose';

export default mongoose.model('category', new mongoose.Schema({
    name: String,
}), 'categories');