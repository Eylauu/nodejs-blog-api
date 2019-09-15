import { Request, Response } from 'express';
import Category from '../models/category.model';
import CategoryValidations from '../validations/category.validation';
import mongoose from 'mongoose';

export default class CategoryController {
    /**
     * Récupère toutes les catégories
     * @param req 
     * @param res 
     */
    public static get(req: Request, res: Response): void {
        Category.find()
            .then(categories => res.status(200).send(categories))
            .catch(err => res.status(500).send(err));
    }

    /**
     * Insert une nouvelle catégorie
     * @param req 
     * @param res 
     */
    public static create(req: Request, res: Response) {
        const categoryData = req.body;
        const { error } = CategoryValidations.validate(categoryData);

        if (error) return res.status(400).json(error);

        Category.findOne({ name: categoryData.name })
            .then((category: mongoose.Document | null) => {
                if (category) return res.status(400).json({ error: "Catégorie déjà existante." });

                const newCategory = new Category(categoryData);
                newCategory.save()
                    .then(createdCategory => res.status(201).send(createdCategory))
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }

    /**
     * Récupère une catégorie à partir de son ID
     * @param req 
     * @param res 
     */
    public static find(req: Request, res: Response): void {
        const { categoryId } = req.params;

        Category.findById(categoryId)
            .then(category => res.status(200).send(category))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid category ID.' });
                }
                res.status(500).send(err);
            });
    }

    /**
     * Met à jour une catégorie à partir de son ID
     * @param req 
     * @param res 
     */
    public static update(req: Request, res: Response) {
        const { categoryId } = req.params;
        const categoryData = req.body;
        const { error } = CategoryValidations.validate(categoryData);

        if (error) return res.status(400).json(error);

        Category.findByIdAndUpdate(categoryId, categoryData)
            .then(updatedCategory => res.status(200).send(updatedCategory))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid category ID.' });
                }
                res.status(500).send(err);
            });
    }

    /**
     * Supprime une catégorie à partir de son ID
     * @param req 
     * @param res 
     */
    public static delete(req: Request, res: Response): void {
        const { categoryId } = req.params;

        Category.findByIdAndDelete(categoryId)
            .then(deletedCategory => res.status(200).json({ "success": 'Category successfully deleted.' }))
            .catch(err => {
                if (err instanceof mongoose.Error.CastError) {
                    res.status(404).json({ "error": 'Invalid category ID.' });
                }
                res.status(500).send(err);
            });
    }
}