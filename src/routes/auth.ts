/// <reference path='../../typings/index.d.ts' />
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { msg_404, msg_500, logError, tokens, users } from '../helpers';

const AuthRouter = express.Router();
export default AuthRouter;

AuthRouter.post('/', (req: Request, res: Response) => {
  let { name, password } = req.body;
  users.login(name, password)
    .then(response => {
      if (response.user) {
        let oneDay = '1d';
        let token = tokens.encode(response.user, oneDay);
        res.status(200).json({ token });
      } else {
        if (response.errorCode === 404) { res.status(200).json(msg_404); }
        if (response.errorCode === 401) {
          res.status(200).json({ message: 'Authentication failed. Wrong Password' });
        }
      }
    })
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Retriving The User.'));
    });
});
AuthRouter.post('/decode', (req: Request, res: Response) => {
  let { token } = req.body;
  tokens.decode(token)
    .then(data => res.status(200).json({ data }))
    .catch(err => {
       logError(err);
      res.status(500).json(msg_500(err, 'Error Processing The Token.'));
    });
});
