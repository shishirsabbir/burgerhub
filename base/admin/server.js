// imports
import "dotenv/config";
import app from "./app.js";
import sequelize from "./config/database.js";

// listen to the app
const PORT = process.env.PORT || 8000;

// start server function
async function startServer() {
    try {
        // authenticate connection
        await sequelize.authenticate();
        console.log("--- Database Connected!✅ ---");

        // sync models
        await sequelize.sync({ alter: true });
        // console.log("Models Synced");

        app.listen(PORT, () => {
            console.log(`Listening from port ${PORT}...`);
        });
    } catch (err) {
        console.log("--- Database Error! ❌ ---");
        console.error(err);

        // exit node process
        process.exit(1);
    }
}

// running the server
startServer();
