const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const env = require("./env");

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.databaseSsl
    ? {
        rejectUnauthorized: env.databaseRejectUnauthorized,
      }
    : false,
});

async function initDatabase() {
  const schemaPath = path.join(__dirname, "..", "..", "db", "init.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  await pool.query(schemaSql);
}

module.exports = {
  pool,
  initDatabase,
};

