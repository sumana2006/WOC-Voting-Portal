import "dotenv/config"
import app from './app.js'
import { connectDB, sequelize } from "./db/db.js";
import { Voter } from "./models/Voter.js";
import { EC_Student } from "./models/EC_Student.js";
import { EC_Staff } from "./models/EC_Staff.js";

(async () => {
    try {
        // Connect to Postrgres
        await connectDB();
        await EC_Staff.sync({ alter: true }); 
        await EC_Student.sync({ alter: true }); 
        await Voter.sync({ alter: true }); 
        console.log("Tables synchronized successfully!");
        await sequelize.sync({ force: true }); // Sync the database and create tables

        // Create a new voter
        // const userCreated = await Voter.create({
        //     name: "Aaditya",
        //     voterId: "b23me1001",
        // });

        // console.log("Created Voter:", userCreated.toJSON());

        // const allVoters = await Voter.findAll();
        // console.log("All Voters:", allVoters);

        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error during server initialization:", error);
    }
})();
