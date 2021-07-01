import {Schema , model} from 'mongoose';

const todoSchema = new Schema({
    name: String,
    completed: Boolean,
    deleted: {
        type: Boolean,
        default: false
    }
    
} , {
    timestamps: true,
    versionKey:false
});

export default model('Todo' , todoSchema);