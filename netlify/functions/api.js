const serverless = require('serverless-http');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SPAN API is running' });
});

app.get('/api/stats', (req, res) => {
    const stats = [
        { key: 'people_helped', value: 98520 },
        { key: 'volunteers_trained', value: 306 },
        { key: 'peer_counsellors', value: 84 },
        { key: 'workshops_held', value: 1369 }
    ];
    res.json(stats);
});

app.get('/api/posts', (req, res) => {
    res.json({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 });
});

app.get('/api/testimonials', (req, res) => {
    res.json([]);
});

app.get('/api/gallery', (req, res) => {
    res.json([]);
});

app.get('/api/categories', (req, res) => {
    res.json([]);
});

app.get('/api/categories/blog', (req, res) => {
    res.json([]);
});

app.get('/api/categories/gallery', (req, res) => {
    res.json([]);
});

app.post('/api/auth/login', (req, res) => {
    res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/newsletter/subscribe', (req, res) => {
    res.json({ message: 'Subscribed' });
});

const handler = serverless(app);
module.exports = { handler };