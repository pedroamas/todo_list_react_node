require('dotenv').config()
import app from './app.js';
import './database';
app.listen(process.env.PORT , () => console.log("Escuchando port: " + process.env.PORT));