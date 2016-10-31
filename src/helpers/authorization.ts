/// <reference path='../../typings/index.d.ts' />
import * as colors from 'colors';
import * as jwt from 'jsonwebtoken';

import { Users, IUser } from '../models';

import { logError } from './handlers';

import app from '../';

export const tokens = {
  decode,
  encode
};

export const users = {
  login
};

/**
 * Generador De Tokens
 * @param {any}       payload La carga o el contenido real del Token
 * @param {string = 1 hora} en formato {@link https://github.com/zeit/ms zeit/ms}
 */
function encode(payload: any, expiration: string = '1h') {
  return jwt.sign(payload, app.get('secret'), {
    expiresIn: expiration
  });
}

/**
 * Desencriptacion de un token
 * @param {string} token El token generado a desencriptar
 * @returns {Promise.<Object|Error>} El contenido del token o un error si es invalido
 */
function decode(token: string) {
  const promise = new Promise((resolve, reject) => {
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded._doc._id);
      }
    });
  });

  return promise;
}

/**
 * Sirve para Loggear un usuario comprobando todo
 * @param {string} name     Nombre del Usuario
 * @param {string} password Contraseña
 * @return {Promise.<Object|Error>} Puede ser el usuario o un errorCode | Siempre sera un error conectando a la DB
 */
function login(name: string, password: string): Promise<any> {
  let promise = new Promise((resolve, reject) => {
    Users.findOne({ name })
      .then((user: any) => {
        if (!user) {
          resolve({ errorCode: 404 });
        } else {
          user.comparePassword(password, (err, matched) => {
            if (err) { reject(err); }
            if (!matched) { resolve({ errorCode: 401}); }
            resolve({ user });
          });
        }
      }).catch(err => {
        reject(err);
      });
  });

  return promise;
}
