import express from 'express';
import { pageRouter } from './router/pageRouter.js';
import { apiRouter } from './router/apiRouter.js';
import { PORT } from './env.js';

const app = express();

app.use((req, res, next) =>{
    req.cookies = {};

    const cookieStr = req.headers.cookie;
    if(!cookieStr){
        return next();

    }

    const cookieParts = cookieStr
    .split(';')
    .map(s => s.trim().split('='));

    for(const [key, value] of cookieParts){
        req.cookies[key] = value;
    }

    next();
  
});

app.use(express.json());
app.use(express.static('public'));
app.use('/', apiRouter);
app.use('/', pageRouter);

app.listen(PORT, () => {
    console.log(`Serveris: http://localhost:${PORT}`);
});