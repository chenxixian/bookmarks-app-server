/// <reference path='../../typings/index.d.ts' />
import * as express from 'express';
import {Request, Response} from 'express';

import { Users } from '../models';

import { msg_404, msg_500, logError } from '../helpers';

const UserRouter = express.Router();

export default UserRouter;

UserRouter.get('/', (req: Request, res: Response) => {
  Users.find({})
    .then(docs => docs.length ? res.json({data: docs}) : res.status(204).json(msg_404))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Retriving The Documents.'));
    });
});

UserRouter.post('/', (req: Request, res: Response) => {
  const User = new Users(req.body);
  User.save()
    .then(docs => res.status(201).json({data: docs}))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Creating The Document.'));
    });
});

UserRouter.get('/:user_id', (req: Request, res: Response) => {
  let docID = req.params.user_id;
  Users.findById(docID)
    .then(docs => docs ? res.json({data: docs}) : res.status(404).json(msg_404))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Retriving The Document.'));
    });
});

UserRouter.put('/:user_id', (req: Request, res: Response) => {
  let docID = req.params.user_id;
  let updateBody = req.body;

  Users.findByIdAndUpdate(docID, updateBody)
    .then(docs => docs ? res.json({data: docs}) : res.status(404).json(msg_404))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Updating The Document.'));
    });
});

UserRouter.delete('/:user_id', (req: Request, res: Response) => {
  let docID = req.params.user_id;
  Users.findByIdAndRemove(docID)
    .then(docs => docs ? res.json({data: docs}) : res.status(404).json(msg_404))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Deleting The Document.'));
    });
});
