const bcrypt = require("bcrypt");
const { pool } = require("../config/database");
const env = require("../config/env");

function normalizeEmail(email) {
  return email ? email.trim().toLowerCase() : "";
}

function normalizeName(name) {
  return name ? name.trim() : "";
}

async function findUserByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
}

async function findUserProfileById(id) {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id],
  );

  return result.rows[0] || null;
}

async function emailExistsForAnotherUser(email, userId) {
  const result = await pool.query(
    "SELECT id FROM users WHERE email = $1 AND id != $2",
    [email, userId],
  );

  return result.rows.length > 0;
}

async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, env.bcryptSaltRounds);
  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [normalizeName(name), normalizeEmail(email), hashedPassword],
  );

  return result.rows[0];
}

async function verifyUser(email, password) {
  const user = await findUserByEmail(normalizeEmail(email));

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  };
}

async function updateUser(userId, { name, email, password }) {
  const hashedPassword = password
    ? await bcrypt.hash(password, env.bcryptSaltRounds)
    : null;

  const result = await pool.query(
    `UPDATE users
     SET name = $1,
         email = $2,
         password = COALESCE($3, password)
     WHERE id = $4
     RETURNING id, name, email, created_at`,
    [normalizeName(name), normalizeEmail(email), hashedPassword, userId],
  );

  return result.rows[0] || null;
}

module.exports = {
  normalizeEmail,
  normalizeName,
  findUserByEmail,
  findUserProfileById,
  emailExistsForAnotherUser,
  createUser,
  verifyUser,
  updateUser,
};

