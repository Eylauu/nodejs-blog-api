import mongoose from 'mongoose';

export default mongoose.model('Category', new mongoose.Schema({
    name: String,
}), 'categories');