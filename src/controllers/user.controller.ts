import { Request, Response } from 'express';
import User from '../models/user.model';
import mongoose from 'mongoose';

export default class UserController {
    /**
     * Récupère tous les utilisateurs
     * @param req 
     * @param res 
     */
    public static get(req: Request, res: Response): void {
        User.find()
            .then(users => res.status(200).send(users))
            .catch(err => res.status(500).send(err));
    }

    /**
     * Insert un nouvel utilisateur
     * @param req 
     * @param res 
     */
    public static create(req: Request, res: Response): void {
        const userData = req.body;
        const user = new User(userData);

        user.save()
            .then(createdUser => res.status(201).send(createdUser))
            .catch(err => res.status(500).send(err));
    }

    /**
     * Récupère un utilisateur à partir de son ID
     * @param req 
     * @param res 
     */
    public static find(req: Request, res: Response): void {
        const { userId } = req.params;

        User.findById(userId)
            .then(user => res.status(200).send(user))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid user ID.' })
                }
                res.status(500).send(err)
            });
    }

    /**
     * Met à jour un utilisateur à partir de son ID
     * @param req 
     * @param res 
     */
    public static update(req: Request, res: Response): void {
        const { userId } = req.params;
        const userData = req.body;

        User.findByIdAndUpdate(userId, userData)
            .then(updatedUser => res.status(200).send(updatedUser))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid user ID.' })
                }
                res.status(500).send(err)
            });
    }

    /**
     * Supprime un utilisateur à partir de son ID
     * @param req 
     * @param res 
     */
    public static delete(req: Request, res: Response): void {
        const { userId } = req.params;

        User.findByIdAndDelete(userId)
            .then(deletedUser => res.status(200).json({ "success": 'User successfully deleted.' }))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid user ID.' })
                }
                res.status(500).send(err)
            });
    }
}