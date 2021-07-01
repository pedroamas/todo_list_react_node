require('dotenv').config()
import mongoose from 'mongoose';

mongoose.connect(process.env.DB_HOST , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
})
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error));
