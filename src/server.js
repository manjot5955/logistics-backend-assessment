require("dotenv").config();
const sequelize = require("./config/database");
const app = require("./app");
require("./models");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log("Connected to DB:", process.env.DB_NAME);
    console.log("DB USER:", process.env.DB_USER);
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // try {
    //     await sequelize.sync({ alter: true });
    //     console.log("Tables synced");
    // } catch (error) {
    //     console.log("Tables synced errorrrrrr", error);
    // }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to DB:", error.message);
  }
}

startServer();
