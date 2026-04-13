const app = require("./app");
const env = require("./config/env");
const { initDatabase } = require("./config/database");

async function startServer() {
  try {
    await initDatabase();
    console.log("Database is ready");

    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

