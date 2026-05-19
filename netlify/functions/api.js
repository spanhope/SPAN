const serverless = require('serverless-http');
const { app, initDB } = require('../../backend/server');

let dbInitialized = false;

const wrappedHandler = serverless(app);

exports.handler = async (event, context) => {
    if (!dbInitialized) {
        try {
            await initDB();
            dbInitialized = true;
            console.log("Database initialized in Serverless environment.");
        } catch (err) {
            console.error("Failed to initialize database:", err);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Internal Server Error: DB Init Failed" })
            };
        }
    }
    
    return await wrappedHandler(event, context);
};