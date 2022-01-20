const express = require('express');
var morgan = require('morgan');

const apiRouter = require('./routes');
const middlewares = require('./middleware');
const app = express();

// middlewares
app.use(express.json());
app.use(morgan(middlewares.myLogger));
app.use(middlewares.checkAuth);
app.use('/api', apiRouter);

// DB CONNECT

app.listen(process.env.PORT || '3000', () => {
  console.log(`Server is running on Port: ${process.env.PORT || '3000'}`);
});
