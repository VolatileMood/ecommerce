const jwt = require('jsonwebtoken');
const AppError = require('../utilities/appError');
const db = require('../database');

const protect = async (req, _res, next) => {
  // Destructure authorization header from request.
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new AppError(401, 'Authorization header is required.');
    }
    // Example authorization structure: Bearer lsfjalsdfjwpeijpw23423lkj
    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      throw new AppError(401, 'Invalid access token.');
    }
    // Verify access token.
    const { userId, tokenVersion } = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    // Look for user with given id and token version.
    const userArray = await db('users')
      .select()
      .where({ id: userId, token_version: tokenVersion });
    if (userArray.length === 0) {
      throw new AppError(401, 'Invalid access token.');
    }
    // Assign user object as property to request.
    req.user = userArray[0];
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
