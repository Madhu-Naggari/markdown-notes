const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL,
  databaseSsl: process.env.DATABASE_SSL === "true",
  databaseRejectUnauthorized:
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
  jwtSecret:
    process.env.JWT_SECRET ||
    process.env.JWT_ACCESS_SECRET ||
    "your_access_secret_key",
  jwtExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1d",
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
};

