import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Set PORT to a free port or stop the other process.`);
        process.exit(1);
      }
      console.error("Server failed to start:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
