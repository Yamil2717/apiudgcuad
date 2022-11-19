import express from 'express';
import routes from './routes/routes';

let app = express();

// MiddleWares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

export default app;