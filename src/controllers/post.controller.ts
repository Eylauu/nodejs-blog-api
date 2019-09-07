import express from 'express';

export default class PostController {
    private static posts: Object[] = [
        {
            id: 1,
            title: "Post 1",
            content: "Lorem ipsum...",
            createdAt: new Date(),
            updatedAt: null
        },
        {
            id: 2,
            title: "Post 2",
            content: "Lorem ipsum...",
            createdAt: new Date(),
            updatedAt: null
        }
    ];

    public static get(req: express.Request, res: express.Response) {
        res.json({ meta: { code: 200 }, posts: PostController.posts }).status(200);
    }

    public static create(req: express.Request, res: express.Response) {
        res.json({ meta: { code: 201 } }).status(201);
    }

    public static find(req: express.Request, res: express.Response) {
        res.json({ meta: { code: 200 }, data: req.params }).status(200);
    }

    public static update(req: express.Request, res: express.Response) {
        res.json({ meta: { code: 200 } }).status(200);
    }

    public static delete(req: express.Request, res: express.Response) {
        res.json({ meta: { code: 200 } }).status(200);
    }
}