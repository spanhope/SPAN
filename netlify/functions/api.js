const serverless = require('serverless-http');

let app;
let initDB;

try {
  const server = require('../backend/server');
  app = server.app;
  initDB = server.initDB;
} catch (err) {
  console.error('Failed to load backend:', err.message);
}

let dbInitialized = false;

exports.handler = async (event, context) => {
    if (!app) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server not initialized" })
        };
    }

    if (!dbInitialized && initDB) {
        try {
            await initDB();
            dbInitialized = true;
            console.log("Database initialized");
        } catch (err) {
            console.error("DB Init Failed:", err.message);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "DB Init Failed" })
            };
        }
    }
    
    const handler = serverless(app);
    return await handler(event, context);
};