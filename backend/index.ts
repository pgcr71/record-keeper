import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./src/routes/routes";
import * as path from 'path';
import {verify} from './src/controller/auth';
import { rest } from "lodash";

createConnection().then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    var staticFilesLocation = path.join(__dirname, '..', '..', 'dist/record-keeper');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});

    // register express routes from defined application routes
    Routes.forEach(route => {
      const func = (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            result
            .then(result => result !== null && result !== undefined ? (res.send(result)) : undefined)
            .catch(err => {res.sendStatus(400)});

        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    }
      if(route.auth) {
        (app as any)[route.method](route.route, verify, func );
      }
        (app as any)[route.method](route.route, func);
    });

    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
