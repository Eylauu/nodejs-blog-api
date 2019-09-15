import { Router } from 'express';
import PostController from './controllers/post.controller';
import CategoryController from './controllers/category.controller';
import UserController from './controllers/user.controller';
import JwtController from './controllers/jwt.controller';

const router = Router();

// Authentication
router.post('/authentication_token', JwtController.authenticate);

// Find all
router.get('/posts', JwtController.verifyToken, PostController.get);
router.get('/categories', JwtController.verifyToken, CategoryController.get);
router.get('/users', JwtController.verifyToken, UserController.get);

// Create
router.post('/posts', JwtController.verifyToken, PostController.create);
router.post('/categories', JwtController.verifyToken, CategoryController.create);
router.post('/users', UserController.create);

// CRUD
router.route('/posts/:postId')
    .get(JwtController.verifyToken, PostController.find)
    .put(JwtController.verifyToken, PostController.update)
    .delete(JwtController.verifyToken, PostController.delete)

router.route('/categories/:categoryId')
    .get(JwtController.verifyToken, CategoryController.find)
    .put(JwtController.verifyToken, CategoryController.update)
    .delete(JwtController.verifyToken, CategoryController.delete)

router.route('/users/:userId')
    .get(JwtController.verifyToken, UserController.find)
    .put(JwtController.verifyToken, UserController.update)
    .delete(JwtController.verifyToken, UserController.delete)

// Export
export default router;