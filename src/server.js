require("dotenv").config();
const sequelize = require("./config/database");
const app = require("./app");
require("./models"); 
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log("Connecting to DB...");

    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Unable to connect to DB:", error.message);
    process.exit(1); 
  }
}

startServer();