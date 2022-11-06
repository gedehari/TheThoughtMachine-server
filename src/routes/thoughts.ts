import { NextFunction, Request, Response, Router } from 'express';

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
    res.send(req.body);
});

export default route;
