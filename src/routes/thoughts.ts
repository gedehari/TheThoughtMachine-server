import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import dataSource from '../orm/dataSource';
import { Thought } from '../orm/entities/Thought';

interface ThoughtRequest {
    title: string,
    author: string,
    message: string
}

const route = Router();

route.get('/', async (req: Request, res: Response) => {
    const limit = parseInt(req.query['limit'] as string) || 10;
    if (limit <= 0) {
        res.status(StatusCodes.BAD_REQUEST);
        res.send("Bad request: invalid limit");
        return;
    }
    const page = parseInt(req.query['page'] as string) || 0;

    const thoughts = await dataSource.getRepository(Thought).find({
        order: {id: 'DESC'},
        take: limit,
        skip: limit * page
    });

    res.json(thoughts);
});

route.get('/:id', async (req: Request, res: Response) => {
    const thought = await dataSource.getRepository(Thought).findOneBy({
        id: parseInt(req.params.id)
    });
    res.json(thought);
});

route.post('/', async (req: Request, res: Response) => {
    const body = req.body as ThoughtRequest;

    if (body.title == undefined) {
        res.status(StatusCodes.BAD_REQUEST);
        res.send("Bad request: title undefined");
        return;
    }

    if (body.author == undefined) {
        res.status(StatusCodes.BAD_REQUEST);
        res.send("Bad request: author undefined");
        return;
    }

    if (body.message == undefined) {
        res.status(StatusCodes.BAD_REQUEST);
        res.send("Bad request: message undefined");
        return;
    }

    const thought = dataSource.getRepository(Thought).create();
    thought.title = body.title;
    thought.author = body.author;
    thought.message = body.message;

    const results = await dataSource.getRepository(Thought).save(thought);
    res.json(results);
});

export default route;
