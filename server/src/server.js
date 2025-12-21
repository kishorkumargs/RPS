import app from './app.js';
import connectDB from './config/db.js';
import "./config/env.js";

const PORT = process.env.PORT || 3000;
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log("Server running at http://localhost:3000")
    });
}

startServer();