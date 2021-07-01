import express from 'express';
import pkg from '../package.json'
import todoRouter from './routes/todo.routes'
import cors from 'cors';


const app = express(); 
app.set('pkg' , pkg);
app.use(express.json());
app.use(cors());
app.use('/api/todo' , todoRouter);

app.get('/' , (req , res) => {
    res.json({
        "name": app.get('pkg').name,
        "author": app.get('pkg').author,
        "description": app.get('pkg').description,
        "version": app.get('pkg').version
    });
})

export default app;