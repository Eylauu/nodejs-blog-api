import express from 'express';

export default class CategoryController {
    static findAll(req: express.Request, res: express.Response) {
        let categories: any = [
            {
                name: "Catégorie 1"
            },
            {
                name: "Catégorie 2"
            }
        ];
        res.json({ categories: categories });
    }

    static create(req: express.Request, res: express.Response) {
        res.json({ success: true });
    }

    static read(req: express.Request, res: express.Response) {
        res.json({ category: req.params });
    }

    static update(req: express.Request, res: express.Response) {
        res.json({ success: true });
    }

    static delete(req: express.Request, res: express.Response) {
        res.json({ success: true });
    }
}