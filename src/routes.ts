import express from 'express';
import PostController from './controllers/post.controller';
import CategoryController from './controllers/category.controller';

const router = express.Router();

// Find all
router.get('/posts', PostController.get);
router.get('/categories', CategoryController.get);

// Create
router.post('/posts', PostController.create);
router.post('/categories', CategoryController.create);

// CRUD
router.route('/posts/:postId')
    .get(PostController.find)
    .post(PostController.update)
    .delete(PostController.delete)

router.route('/categories/:categoryId')
    .get(CategoryController.find)
    .post(CategoryController.update)
    .delete(CategoryController.delete)

// Export
export default router;