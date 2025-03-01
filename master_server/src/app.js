import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

// import routes
import ecRouter from "./routes/ec.routes.js"
import candidateRouter from "./routes/candidate.routes.js"
import evmRouter from "./routes/evm.routes.js"
import voterRouter from "./routes/voter.routes.js"
import votingRouter from "./routes/voting.routes.js"

const app = express();

// use middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// cors

// mount routes
app.get('/', (req, res) => {
  res.send('Hello World bye');
});

app.use("/api/ec", ecRouter);
app.use("/api/candidate", candidateRouter)
app.use("/api/voter", voterRouter);
app.use("/api/evm", evmRouter);
app.use("/api/vote-cast", votingRouter);


export default app;