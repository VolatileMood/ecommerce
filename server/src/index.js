const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const startServer = async () => {
  const app = express();
  dotenv.config();

  // Initialize middlewares.
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
