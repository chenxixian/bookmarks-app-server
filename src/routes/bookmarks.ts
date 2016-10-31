/// <reference path='../../typings/index.d.ts' />
import * as express from 'express';
import {Request, Response} from 'express';

import { Bookmarks } from '../models';

import { msg_404, msg_500, logError, middlewares } from '../helpers';

const BookmarksRouter = express.Router();

export default BookmarksRouter;

/**
 * Protect All Entry Points
 * @param {Function} middlewares.logged Funcion que comprueba si el usuario esta loggeado
 */
BookmarksRouter.use(middlewares.logged);

BookmarksRouter.get('/', (req: Request, res: Response) => {
  let userid = req['userid'];
  Bookmarks.find({creator: userid})
    .then(docs => docs.length ? res.json({data: docs}) : res.status(204).json(msg_404))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Retriving The Documents.'));
    });
});

BookmarksRouter.post('/', (req: Request, res: Response) => {
  let userid = req['userid'];
  const Bookmark = new Bookmarks(Object.assign({}, req.body, {creator: userid}));
  Bookmark.save()
    .then(doc => res.status(201).json({data: doc}))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Creating The Document.'));
    });
});

BookmarksRouter.get('/:bookmark_id', middlewares.isMine, (req: Request, res: Response) => {
  let docID = req.params.bookmark_id;
  let userid = req['userid'];
  Bookmarks.findById(docID)
    .then(doc => res.json({data: doc}))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Creating The Document.'));
    });
});

BookmarksRouter.put('/:bookmark_id', middlewares.isMine, (req: Request, res: Response) => {
  let docID = req.params.bookmark_id;
  let updateBody = req.body;

  Bookmarks.findByIdAndUpdate(docID, updateBody)
    .then(docs => res.json({data: docs}))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Updating The Document.'));
    });
});

BookmarksRouter.delete('/:bookmark_id', middlewares.isMine, (req: Request, res: Response) => {
  let docID = req.params.bookmark_id;

  Bookmarks.findByIdAndRemove(docID)
    .then(docs => res.json({data: docs}))
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err, 'Error Deleting The Document.'));
    });
});
