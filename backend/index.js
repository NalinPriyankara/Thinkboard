import express from 'express';
import Routes from './src/routes/Routes.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();    //used to add the mongodb url to .env file due to security issues

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

//middelware
app.use(express.json());

app.use('/api/notes', Routes);

app.listen(5001, () => {
    console.log('Server started on PORT:', PORT);
})

