const bcrypt = require('bcrypt');
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

exports.logout = async (req, res, next) => {};

exports.refresh_token = async (req, res, next) => {};
