const serverless = require('serverless-http');
const path = require('path');

let app;
let initDB;

try {
  const server = require('../../backend/server');
  app = server.app;
  initDB = server.initDB;
} catch (err) {
  console.error('Failed to load backend:', err.message);
}

let dbInitialized = false;

const wrappedHandler = serverless(app);

exports.handler = async (event, context) => {
    if (!dbInitialized && initDB) {
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