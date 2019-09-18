import mongoose, { Schema } from 'mongoose';
import { UserInterface } from './user.model';
import { CategoryInterface } from './category.model';

export const Post = mongoose.model('Post', new Schema({
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

export interface PostInterface {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: UserInterface;
    category: CategoryInterface
}