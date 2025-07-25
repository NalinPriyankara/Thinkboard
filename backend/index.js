import express from 'express';
import Routes from './src/routes/Routes.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './src/middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';

dotenv.config();    //used to add the mongodb url to .env file due to security issues

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middelware

if(process.env.NODE_ENV !== 'production') {
    app.use(cors({
    origin: 'http://localhost:5173'
}));
}
app.use(express.json());    //parse JSON bodies: req.body
app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log(`Rerq method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use('/api/notes', Routes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

connectDB().then(() => {
    app.listen(5001, () => {
    console.log('Server started on PORT:', PORT);
    });
});


