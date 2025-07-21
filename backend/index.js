import express from 'express';
import Routes from './src/routes/Routes.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './src/middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();    //used to add the mongodb url to .env file due to security issues

const app = express();
const PORT = process.env.PORT || 5001;

//middelware
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());    //parse JSON bodies: req.body
app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log(`Rerq method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use('/api/notes', Routes);

connectDB().then(() => {
    app.listen(5001, () => {
    console.log('Server started on PORT:', PORT);
    });
});


