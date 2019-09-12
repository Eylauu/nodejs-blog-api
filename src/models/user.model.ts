import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', new Schema({
    username: String,
    email: String,
    password: String,
    role: { type: Array, default: ['ROLE_USER'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    posts: [
        { type: Schema.Types.ObjectId, ref: 'Post' }
    ]
}), 'users');