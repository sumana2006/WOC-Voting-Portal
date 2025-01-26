import express from 'express';
import bodyParser from 'body-parser';

// import routes

const app = express();

// use middlewares
app.use(bodyParser.json());

// cors

// mount routes
app.get('/', (req, res) => {
    res.send('Hello World bye');
  });
export default app;