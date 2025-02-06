import express from 'express';
import bodyParser from 'body-parser';

// import routes
import registrationRouter from "./routes/registration.routes.js"
import voterRegistrationRouter from "./routes/voter_registration.routes.js"

const app = express();

// use middlewares
app.use(bodyParser.json());

// cors

// mount routes
app.get('/', (req, res) => {
    res.send('Hello World bye');
  });

app.use("/api/register",registrationRouter);
app.use("/api/voter",voterRegistrationRouter);


export default app;