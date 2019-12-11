import express from 'express';
import todoController from '../controllers/todos'

const router = express.Router();

router.get('/api/v1/todos', todoController.getAllTodos);
router.post('/api/v1/todos', todoController.createTodo);
router.get('/api/v1/todos/:id', todoController.getTodo);
router.delete('/api/v1/todos/:id', todoController.deleteTodo)
router.put('/api/v1/todos/:id', todoController.updateTodo);

export default router;