const path = require('path');
const serverless = require('serverless-http');

let app;
let initDB;

const backendPath = path.join(__dirname, '..', 'backend', 'server');

try {
  console.log('Loading backend from:', backendPath);
  const server = require(backendPath);
  app = server.app;
  initDB = server.initDB;
  console.log('Backend loaded successfully');
} catch (err) {
  console.error('Failed to load backend:', err.message);
  console.error('Stack:', err.stack);
}

let dbInitialized = false;

exports.handler = async (event, context) => {
    console.log('Event path:', event.path);
    
    if (!app) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server not initialized", message: "Backend failed to load" })
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
                body: JSON.stringify({ error: "DB Init Failed", details: err.message })
            };
        }
    }
    
    try {
        const handler = serverless(app);
        return await handler(event, context);
    } catch (err) {
        console.error('Handler error:', err.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Handler error", details: err.message })
        };
    }
};