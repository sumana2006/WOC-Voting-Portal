import express from 'express';
import bodyParser from 'body-parser';

// import routes

const app = express();

// use middlewares
app.use(bodyParser.json());

// cors

// mount routes

export default app;