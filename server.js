const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
//Route Files

const bootcamps = require('./routes/bootcamp');

//Load ENV variables
dotenv.config({ path: './config/config.env' });

const app = express();
app.use(express.json());
//database connection
connectDB();
//Mount Routes

//Create a middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
console.log(`${process.env.MONGO_URI}`);

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} on Port ${process.env.PORT}`
      .yellow.bold
  )
);

// Handled unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error:${err.message}`.red.bold);
  // Close the server and exit
  server.close(() => process.exit(1));
});
