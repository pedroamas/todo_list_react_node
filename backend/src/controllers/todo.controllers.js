import Todo from '../models/Todo';


export const getTodo = async (req , res) => {
    const todos = await Todo.find({deleted: false}); 
    res.json(todos);
}

export const createTodo = async (req , res) => {
    const {name , completed } = req.body;
    const newTodo = new Todo({name , completed });
    const TodoSave = await newTodo.save();
    res.status(201).json(TodoSave);
}

export const updateTodoById = async (req , res) => {
    const updatedTodo = await Todo.findOneAndUpdate({_id: req.params.todoId} , req.body, {
        new: true
    });
    res.status(200).json(updatedTodo);
}

export const deleteTodoById = async (req , res) => {
   await Todo.findOneAndUpdate({_id: req.params.todoId} , {deleted: true}, {
        new: true
    });
    res.status(204).json();
}
