import mongoose from 'mongoose';

export default mongoose.model('User', new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: Array, default: ['ROLE_USER'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}), 'users');