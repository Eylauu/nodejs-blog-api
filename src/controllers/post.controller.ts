import { Request, Response } from 'express';
import Post from '../models/post.model';
import User from '../models/user.model';
import Category from '../models/category.model';
import mongoose from 'mongoose';

export default class PostController {
    /**
     * Récupère tous les article
     * @param req 
     * @param res 
     */
    public static get(req: Request, res: Response): void {
        Post.find()
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send(err));
    }

    /**
     * Insert un nouvel article
     * @param req 
     * @param res 
     */
    public static create(req: Request, res: Response): void {
        const postData = req.body;
        let post = new Post(postData);

        post.save()
            .then(createdPost => res.status(201).send(createdPost))
            .catch(err => res.status(500).send(err));
    }

    /**
     * Récupère un article à partir de son ID
     * @param req 
     * @param res 
     */
    public static find(req: Request, res: Response): void {
        const { postId } = req.params;

        Post.findById(postId)
            .then(post => res.status(200).send(post))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid post ID.' })
                }
                res.status(500).send(err)
            });
    }

    /**
     * Met à jour un article à partir de son ID
     * @param req 
     * @param res 
     */
    public static update(req: Request, res: Response): void {
        const { postId } = req.params;
        const postData = req.body;

        Post.findByIdAndUpdate(postId, postData)
            .then(updatedPost => res.status(200).send(updatedPost))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid post ID.' })
                }
                res.status(500).send(err)
            });
    }

    /**
     * Supprime un article à partir de son ID
     * @param req 
     * @param res 
     */
    public static delete(req: Request, res: Response): void {
        const { postId } = req.params;

        Post.findByIdAndDelete(postId)
            .then(deletedPost => res.status(200).json({ "success": 'Post successfully deleted.' }))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid post ID.' })
                }
                res.status(500).send(err)
            });
    }
}