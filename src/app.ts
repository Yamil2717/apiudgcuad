import express from 'express';
import routes from './routes/routes';
import helmet from 'helmet';
import cors from 'cors';

let app = express();

// MiddleWares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

export default app;