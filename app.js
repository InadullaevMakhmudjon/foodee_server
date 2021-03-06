import socket from 'socket.io';
import express, { json, urlencoded } from 'express';
import { join, resolve } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';

const app = express();
app.io = socket();
// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, './client/build')));
app.use('/images', express.static('images'));

indexRouter(app);

// catch 404 and forward to error handler
app.get('/*', (req, res) => {
  res.sendFile(`${resolve(__dirname)}/client/build/index.html`);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
