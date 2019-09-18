import mongoose, { Schema } from 'mongoose';
import { PostInterface } from './post.model';

export const User = mongoose.model('User', new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Array, default: ['ROLE_USER'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    posts: [
        { type: Schema.Types.ObjectId, ref: 'Post' }
    ]
}), 'users');

export interface UserInterface extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    role: Array<string>,
    createdAt: Date,
    updatedAt: Date,
    posts: PostInterface
}