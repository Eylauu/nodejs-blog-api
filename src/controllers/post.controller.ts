import express from 'express';

export default class PostController {
    static findAll(req: express.Request, res: express.Response) {
        let posts: any = [
            {
                title: "Post 1",
                content: "Lorem ipsum...",
                createdAt: new Date(),
                updatedAt: null
            },
            {
                title: "Post 2",
                content: "Lorem ipsum...",
                createdAt: new Date(),
                updatedAt: null
            }
        ];
        res.json({ posts: posts });
    }

    static create(req: express.Request, res: express.Response) {
        res.json({ success: true });
    }

    static read(req: express.Request, res: express.Response) {
        res.json({ post: req.params });
    }

    static update(req: express.Request, res: express.Response) {
        res.json({ success: true });
    }

    static delete(req: express.Request, res: express.Response) {
        res.json({ success: true });
    }
}