const serverless = require('serverless-http');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SPAN API is running', env: process.env.TURSO_DB_URL ? 'Turso connected' : 'No DB' });
});

app.get('/api/stats', (req, res) => {
    res.json([
        { key: 'people_helped', value: 98520 },
        { key: 'volunteers_trained', value: 306 },
        { key: 'peer_counsellors', value: 84 },
        { key: 'workshops_held', value: 1369 }
    ]);
});

app.get('/api/posts', (req, res) => {
    res.json({ data: [], total: 0, message: 'Posts endpoint - needs backend integration' });
});

module.exports = { app };

exports.handler = serverless(app);