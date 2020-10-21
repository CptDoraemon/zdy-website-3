import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as mysql from 'mysql';
import * as MySQLSession from 'express-mysql-session';
import * as passport from 'passport';
import {ConnectionConfig} from "mysql";

dotenv.config();
const MySQLStore = MySQLSession(session);
const options: ConnectionConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
export const CONNECTION = mysql.createPool(options);
const SESSION_STORE = new MySQLStore({
  schema: {
    tableName: process.env.SESSION_TABLE,
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}, CONNECTION);

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: process.env.SESSION_SECRECT,
    store: SESSION_STORE
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });
  await app.listen(5000);

  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
