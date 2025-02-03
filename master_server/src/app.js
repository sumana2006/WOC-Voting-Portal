import express from 'express';
import bodyParser from 'body-parser';

// import routes
import registrationRouter from "./routes/registration.js"

const app = express();

// use middlewares
app.use(bodyParser.json());

// cors

// mount routes
app.get('/', (req, res) => {
    res.send('Hello World bye');
  });

app.use("/api/register",registrationRouter)

export default app;