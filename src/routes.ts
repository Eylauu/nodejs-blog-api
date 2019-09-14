import { Router } from 'express';
import PostController from './controllers/post.controller';
import CategoryController from './controllers/category.controller';
import UserController from './controllers/user.controller';

const router = Router();

// Find all
router.get('/posts', PostController.get);
router.get('/categories', CategoryController.get);
router.get('/users', UserController.get);

// Create
router.post('/posts', PostController.create);
router.post('/categories', CategoryController.create);
router.post('/users', UserController.create);

// CRUD
router.route('/posts/:postId')
    .get(PostController.find)
    .put(PostController.update)
    .delete(PostController.delete)

router.route('/categories/:categoryId')
    .get(CategoryController.find)
    .put(CategoryController.update)
    .delete(CategoryController.delete)

router.route('/users/:userId')
    .get(UserController.find)
    .put(UserController.update)
    .delete(UserController.delete)

// Export
export default router;