import express from 'express';
import Post from '../models/post.model';
import mongoose from 'mongoose';

export default class PostController {
    /**
     * Récupère tous les article
     * @param req 
     * @param res 
     */
    public static get(req: express.Request, res: express.Response) {
        Post.find()
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send(err));
    }

    /**
     * Insert un nouvel article
     * @param req 
     * @param res 
     */
    public static create(req: express.Request, res: express.Response) {
        const postData = req.body;
        const post = new Post(postData);

        post.save()
            .then(createdPost => res.status(201).send(createdPost))
            .catch(err => res.status(500).send(err));
    }

    /**
     * Récupère un article à partir de son ID
     * @param req 
     * @param res 
     */
    public static find(req: express.Request, res: express.Response) {
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
    public static update(req: express.Request, res: express.Response) {
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
    public static delete(req: express.Request, res: express.Response) {
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