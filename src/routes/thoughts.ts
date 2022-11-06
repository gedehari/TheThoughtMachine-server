import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import dataSource from '../orm/dataSource';
import { Thought } from '../orm/entities/Thought';

const route = Router();

route.get('/', async (req: Request, res: Response) => {
    const thoughts = await dataSource.getRepository(Thought).find();
    res.json(thoughts);
});

route.get('/:id', async (req: Request, res: Response) => {
    const thought = await dataSource.getRepository(Thought).findOneBy({
        id: parseInt(req.params.id)
    });
    res.json(thought);
});

route.post('/', async (req: Request, res: Response) => {
    const body = req.body as object;

    if (!('author' in body) || !('message' in body)) {
        res.status(StatusCodes.BAD_REQUEST);
        res.send("bad request");
        return;
    }

    const thought = dataSource.getRepository(Thought).create();
    thought.author = req.body['author'];
    thought.message = req.body['message'];

    const results = await dataSource.getRepository(Thought).save(thought);
    res.json(results);
});

export default route;
