import { Request, Response } from 'express';
import { Post } from '../models/post.model';
import mongoose from 'mongoose';
import { CreateValidations, UpdateValidations } from '../validations/post.validation';

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
    public static create(req: Request, res: Response) {
        const postData = req.body;
        const { error } = CreateValidations.validate(postData);

        if (error) return res.status(400).json(error);

        Post.findOne({ title: postData.title })
            .then((post: mongoose.Document | null) => {
                if (post) return res.status(400).json({ error: "Article déjà existant." });

                const newPost = new Post(postData);
                newPost.save()
                    .then(createdPost => res.status(201).send(createdPost))
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => {
                res.status(500).send(err);
            })
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
    public static update(req: Request, res: Response) {
        const { postId } = req.params;
        const postData = req.body;
        const { error } = UpdateValidations.validate(postData);

        if (error) return res.status(400).json(error);

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