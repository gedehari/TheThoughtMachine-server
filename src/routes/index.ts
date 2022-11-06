import { NextFunction, Request, Response, Router } from 'express';
import dataSource from '../orm/dataSource';
import { Thought } from '../orm/entities/Thought';

const route = Router();

route.get('/', async (req: Request, res: Response) => {
    res.json({message: "You're in!"});
});

export default route;
