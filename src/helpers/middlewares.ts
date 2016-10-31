/// <reference path='../../typings/index.d.ts' />
import { Request, Response } from 'express';

import { Bookmarks }from '../models';

import { tokens, logError, msg_404, msg_500 } from './';

export const middlewares = {
  logged,
  isMine
};

/**
 * Revisa si hay un token valido y fija el req.userid al id del usuario dueño del token
 * @param {Request}  req  Se espera que contenga el token en el body o en la cabezera
 * @param {Response} res  se usara para devolver un error de autenticacion en caso de fallar el token
 * @param {Function} next Es la siguiente ruta en espera de este middleware
 */
function logged(req: Request, res: Response, next: Function) {
  let token = req.body.token || req.headers['x-access-token'];
  if (token) {
    tokens.decode(token)
      .then(decoded => {
        req['userid'] = decoded;
        next();
      })
      .catch(err =>  {
        logError(err);
        return res.status(401).json({
          message: 'Invalid Access Token'
        });
      });
  } else {
    return res.status(401).json({
      message: 'No token Provided'
    });
  }
}

/**
 * Comprueba que el recurso solicitado pertenezca al usuario dueño del token enviado
 * y verifica que dicho recurso exista
 * @param {Request}  req  Se espera que contenga un body.bookmark_id y un userid
 * @param {Response} res  Se usara para devolver un error de autenticacion, parametros o NOT_FOUND
 * @param {Function} next ES la siguiente ruta en espera de que esta verificacion pase
 */
function isMine(req: Request, res: Response, next: Function) {
  const docID = req.params.bookmark_id;
  const userID = req['userid'];
  if (!docID || !userID) { return res.status(400).json({ message: 'Wrong Params!'}); }
  Bookmarks.findById(docID)
    .then(doc => {
      if (!doc) { return res.status(404).json(msg_404); }
      let creatorID = doc['creator'].toString();
      if (creatorID !== userID) {
        return res.status(403).json({message: 'The resource does not belong to you.'});
      } else {
        next();
      }
    })
    .catch(err => {
      logError(err);
      res.status(500).json(msg_500(err));
    });
}
