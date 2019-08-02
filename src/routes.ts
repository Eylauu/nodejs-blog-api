import express from 'express';

const router = express.Router();

router.get('/posts', (req, res) => {
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
})

router.get('/categories', (req, res) => {
    let categories: any = [
        {
            name: "Catégorie 1"
        }
        {
            name: "Catégorie 2"
        }
    ];
    res.json({ categories: categories });
})

router.post('/post', (req, res) => {
    res.json({ success: true });
})

router.route('/post/:postId')
    .get((req, res) => {
        res.json({ post: req.params })
    })
    .post((req, res) => {
        res.json({ success: true })
    })
    .delete((req, res) => {
        res.json({ success: true })
    })

router.post('/category', (req, res) => {
    res.json({ success: true })
})

router.route('/category/:categoryId')
    .get((req, res) => {
        res.json({ category: req.params })
    })
    .post((req, res) => {
        res.json({ success: true })
    })
    .delete((req, res) => {
        res.json({ success: true })
    })

export default router;