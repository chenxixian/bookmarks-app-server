/// <reference path='../typings/index.d.ts' />

import * as path from 'path';

import { Request, Response } from 'express';

import * as Express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as debug from 'debug';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as session from 'express-session';
import * as favicon from 'serve-favicon';


import * as colors from 'colors';


const app = Express();
const ENV = process.env.NODE_ENV || 'development';

// Configuration
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'mt__bookmarks api',
  resave: true,
  saveUninitialized: true
}));

const APIENTRYPOINT = 'api/v1/';

// Routes
import { HomeRouter, BookmarksRouter, UsersRouter, AuthRouter } from './routes';

app.use(`/${APIENTRYPOINT}`, HomeRouter);
app.use(`/${APIENTRYPOINT}bookmarks`, BookmarksRouter);
app.use(`/${APIENTRYPOINT}users`, UsersRouter);
app.use(`/${APIENTRYPOINT}authenticate`, AuthRouter);

if (ENV === 'development') {
  app.use((err: any, req: Request, res: Response, next: Function) => {
    res.status(500).json({
      error: err,
      message: err.message
    });
  });
}

app.use((err: any, req: Request, res: Response, next: Function) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

app.use((req: Request, res: Response) => {
  res.status(400).json({
    message: `The URL '${req.url}' is not an API entry point or does not expose an ${req.method} method. Check Docs`
  });
});


export default app;
