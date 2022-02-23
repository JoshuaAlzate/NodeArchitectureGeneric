
import { Router, Request, Response, NextFunction } from "express";
import { Wrapper } from '../types/wrapper';
import { Route } from '../types/route';

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
    for (const f of middleware) {
        f(router);
    }
};

export const applyRoutes = (routes: Route[], router: Router) => {
    routes.forEach(route => {
        
        (router as any)[route.method](`/${route.path}`, (req: Request, res: Response, next: NextFunction) => {
                const result = (new (route.controller as any))[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
    });
};