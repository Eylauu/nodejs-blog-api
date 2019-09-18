import mongoose, { Schema } from 'mongoose';
import { PostInterface } from './post.model';

export const Category = mongoose.model('Category', new Schema({
    name: { type: String, required: true },
    posts: [
        { type: Schema.Types.ObjectId, ref: 'Post' }
    ]
}), 'categories');

export interface CategoryInterface {
    name: string;
    posts: PostInterface;
}