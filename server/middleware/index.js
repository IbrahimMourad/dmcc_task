const myLogger = function (tokens, req, res) {
  return [
    '\n************\n',
    `Request Method: ${tokens.method(req, res)} \n`,
    `Request Path: ${tokens.url(req, res)} \n`,
    `Response Status: ${tokens.status(req, res)} \n`,
    `Time Taken to process the request: (${tokens['response-time'](
      req,
      res
    )}) ms \n`,
    '************\n',
  ].join('');
};

/* Middleware to check if user is Admin
    idealy i should check type of the user but i dont have the actual user data 
    so i created a variable isAdmin just to simulate the process
    toggle the value of isAdmin to true or false
 */
const checkAuth = (req, res, next) => {
  const isAdmin = true;
  if (isAdmin) {
    next();
  } else {
    res.status(404).send({ message: 'Unauthorized Access' });
  }
};
module.exports = { myLogger, checkAuth };
