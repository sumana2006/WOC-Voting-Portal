import "dotenv/config"
import app from './app.js'
import { connectDB } from "./db/db.js";

(async () => {
    try {
        // Connect to Postrgres
        await connectDB();

        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error during server initialization:", error);
    }
})();
