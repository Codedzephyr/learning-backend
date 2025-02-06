const { AppError,UnauthorizedError } = require('./custom-errors');

// creating custom middleware
const logRequests = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); //as we learnt before next passes control to the next middleware or route handler
}

// Authentication middleware
const authenticate = (req, next) => {
    const token = req.headers.authorization;
    if (token === 'your-secret-token') {
      next(); 
    } else {
      throw new UnauthorizedError(); //throwing an error will be handled by the error handling middleware
      // res.status(401).json({ error: 'Unauthorized' }); 
    }
  };

  //centralized error handling middleware
  const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 

    if (err instanceof AppError) { 
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  };
  
  module.exports = {
    logRequests,
    authenticate,
    errorHandler
  };