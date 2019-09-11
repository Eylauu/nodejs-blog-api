import express from 'express';
import Category from '../models/category.model';
import mongoose from 'mongoose';

export default class CategoryController {
    /**
     * Récupère toutes les catégories
     * @param req 
     * @param res 
     */
    public static get(req: express.Request, res: express.Response) {
        Category.find()
            .then(categories => res.status(200).send(categories))
            .catch(err => res.status(500).send(err));
    }

    /**
     * Insert une nouvelle catégorie
     * @param req 
     * @param res 
     */
    public static create(req: express.Request, res: express.Response) {
        const categoryData = req.body;
        const category = new Category(categoryData);

        category.save()
            .then(createdCategory => res.status(201).send(createdCategory))
            .catch(err => res.status(500).send(err));
    }

    /**
     * Récupère une catégorie à partir de son ID
     * @param req 
     * @param res 
     */
    public static find(req: express.Request, res: express.Response) {
        const { categoryId } = req.params;

        Category.findById(categoryId)
            .then(category => res.status(200).send(category))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid category ID.' })
                }
                res.status(500).send(err)
            });
    }

    /**
     * Met à jour une catégorie à partir de son ID
     * @param req 
     * @param res 
     */
    public static update(req: express.Request, res: express.Response) {
        const { categoryId } = req.params;
        const categoryData = req.body;

        Category.findByIdAndUpdate(categoryId, categoryData)
            .then(updatedCategory => res.status(200).send(updatedCategory))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid category ID.' })
                }
                res.status(500).send(err)
            });
    }

    /**
     * Supprime une catégorie à partir de son ID
     * @param req 
     * @param res 
     */
    public static delete(req: express.Request, res: express.Response) {
        const { categoryId } = req.params;

        Category.findByIdAndDelete(categoryId)
            .then(deletedCategory => res.status(200).json({ "success": 'Category successfully deleted.' }))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid category ID.' })
                }
                res.status(500).send(err)
            });
    }
}