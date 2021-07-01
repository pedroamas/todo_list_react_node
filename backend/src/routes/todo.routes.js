import {Router} from 'express';
const router = Router();
import * as todoCtr from '../controllers/todo.controllers';

router.get('/' , todoCtr.getTodo);
router.post('/' , todoCtr.createTodo);
router.put('/:todoId' , todoCtr.updateTodoById);
router.delete('/:todoId' , todoCtr.deleteTodoById);

export default router;