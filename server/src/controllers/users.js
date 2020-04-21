const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');
const AppError = require('../utilities/appError');
const createToken = require('../utilities/createToken');

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // 1. Check if email is taken.
    const usersEmail = await db('users').select().where({ email });
    if (usersEmail.length > 0) {
      return res.json({
        status: 'error',
        message: {
          email: 'E-mail is already registered',
        },
      });
    }
    // 2. Encrypt password.
    const hashedPassword = await bcrypt.hash(password, 12);
    // 3. Insert new user into database.
    const newUsers = await db('users')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
      })
      .returning('*');
    const user = newUsers[0];
    // 4. Create access and refresh token.
    const accessToken = createToken(
      { tokenVersion: user.token_version, userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_DURATION
    );
    const refreshToken = createToken(
      { tokenVersion: user.token_version, userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_DURATION
    );
    // 6. Attach refresh token to cookie.
    res.cookie('rft', refreshToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.REFRESH_TOKEN_DURATION),
    });
    // 5. Send user and tokens.
    const { password: omit, ...rest } = user;
    res.status(201).json({
      status: 'success',
      data: {
        user: rest,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1. Look for user with email.
    const userEmail = await db('users').select().where({ email });
    if (userEmail.length === 0) {
      throw new AppError(401, 'Wrong Credentials.');
    }
    const user = userEmail[0];
    // 2. Compare both passwords.
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AppError(401, 'Wrong Credentials.');
    }
    // 3. Create access and refresh token.
    const accessToken = createToken(
      { tokenVersion: user.token_version, userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_DURATION
    );
    const refreshToken = createToken(
      { tokenVersion: user.token_version, userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_DURATION
    );
    // 4. Attach refresh token to cookie.
    res.cookie('rft', refreshToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.REFRESH_TOKEN_DURATION),
    });
    // 5. Send user and tokens.
    const { password: omit, ...rest } = user;
    res.status(201).json({
      status: 'success',
      data: {
        user: rest,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (_req, res, _next) => {
  // Clear refresh token from cookie.
  res.clearCookie('rft');
  res.json({
    status: 'success',
    message: 'Successfully logout.',
  });
};

exports.refreshToken = async (req, res, next) => {
  try {
    console.log('Cookies', req.cookies);
    // 1. Grab refresh token from cookies.
    const { rft } = req.cookies;
    if (!rft) {
      throw new AppError(422, 'Refresh token is required.');
    }
    // 2. Verify refresh token with secret.
    const payload = await jwt.verify(rft, process.env.REFRESH_TOKEN_SECRET);
    // 3. Validate token version.
    const userWithToken = await db('users')
      .select()
      .where({ token_version: payload.tokenVersion, id: payload.userId });
    if (userWithToken.length === 0) {
      throw new AppError(401, 'Invalid refresh token.');
    }
    // 4. Create new access token.
    const accessToken = createToken(
      { tokenVersion: payload.token_version, userId: payload.id },
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_DURATION
    );
    // 5. Send access token.
    res.json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.loadUser = (req, res, next) => {
  try {
    res.json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};
