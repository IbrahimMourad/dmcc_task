require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const apiRouter = require('./routes');
const middlewares = require('./middleware');
const PORT = 3000;
const app = express();

// middlewares
app.use(express.json());
app.use(morgan(middlewares.myLogger));
app.use(middlewares.checkAuth);
app.use('/api', apiRouter);

// DB CONNECT

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on Port: ${process.env.PORT || PORT}`);
});
