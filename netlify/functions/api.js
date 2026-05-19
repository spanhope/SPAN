const serverless = require('serverless-http');
const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Test API working' });
});

app.get('/api/test', (req, res) => {
    res.json({ 
        env: {
            turso: !!process.env.TURSO_DB_URL,
            cloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
            jwt: !!process.env.JWT_SECRET
        }
    });
});

module.exports = { app };

exports.handler = serverless(app);