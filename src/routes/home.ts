/// <reference path='../../typings/index.d.ts' />
import * as express from 'express';
import {Request, Response} from 'express';
const HomeRouter = express.Router();

export default HomeRouter;

HomeRouter.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'OK'
  });
});
