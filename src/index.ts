import express, { Request, Response, NextFunction } from "express";
const app = express();
import { connectTypeORM, connectMongoDB } from "./loaders/db";
import routes from './routes';

connectTypeORM(); // connect typeorm

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

interface ErrorType {
  message: string;
  status: number;
}

app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;