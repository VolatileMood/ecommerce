const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./routes');

const startServer = async () => {
  const app = express();
  // Loads environment variables from '.env' into process.env.
  dotenv.config();

  // Initialize middlewares.
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // REST API
  app.use('/api', routes);

  // Error handler
  app.use((err, _req, res, _next) => {
    const { statusCode, message } = err;

    res.status(statusCode).json({
      status: 'error',
      message,
    });
  });

  // Catch all requests to not defined routes.
  app.use('*', (req, res) => {
    res.status(404).json({
      status: 'error',
      message: `Cannot find "${req.originalUrl}" route.`,
    });
  });

  // Start express server with given port.
  app.listen(process.env.PORT, (error) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(`Server listening on port ${process.env.PORT}.`);
  });
};

startServer();
