import express, { Express, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors'
import path from 'path';

import dataSource from './orm/dataSource';
import index from './routes/index'
import thoughts from './routes/thoughts'

dataSource.initialize()
    .then(() => {
        console.log('DataSource initialized.');
    })
    .catch((reason: any) => {
        console.error('Failed to initialize DataSource', reason);
    });

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/thoughts', thoughts);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(StatusCodes.BAD_REQUEST).json({error: err.message});
});

const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is now running at http://localhost:${port}`);
})
server.timeout = 10000;
