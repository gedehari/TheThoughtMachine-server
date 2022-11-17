import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LessThan, LessThanOrEqual } from 'typeorm';

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
    const from = parseInt(req.query['from'] as string) || 0;
    if (from < 0) {
        res.status(StatusCodes.BAD_REQUEST);
        res.send("Bad request: invalid from");
        return;
    }

    const thoughts = await dataSource.getRepository(Thought).find({
        where: from === 0 ? undefined : [{id: LessThanOrEqual(from)}],
        order: {id: 'DESC'},
        take: limit,
        cache: true
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
