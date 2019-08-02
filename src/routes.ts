import express from 'express';
import PostController from './controllers/post.controller';
import CategoryController from './controllers/category.controller';

const router = express.Router();

// Find all
router.get('/posts', PostController.findAll);
router.get('/categories', CategoryController.findAll);

// Create a psot
router.post('/post', PostController.create);

// Post CRUD
router.route('/post/:postId')
    .get(PostController.read)
    .post(PostController.update)
    .delete(PostController.delete)

// Create a category
router.post('/category', CategoryController.create);

// Category CRUD
router.route('/category/:categoryId')
    .get(CategoryController.read)
    .post(CategoryController.update)
    .delete(CategoryController.delete)

export default router;