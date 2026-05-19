const serverless = require('serverless-http');
const express = require('express');
const path = require('path');

const backendPath = path.join(__dirname, '..', 'backend');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..')));

const postsRouter = require(path.join(backendPath, 'routes', 'posts'));
const commentsRouter = require(path.join(backendPath, 'routes', 'comments'));
const categoriesRouter = require(path.join(backendPath, 'routes', 'categories'));
const newsletterRouter = require(path.join(backendPath, 'routes', 'newsletter'));
const uploadRouter = require(path.join(backendPath, 'routes', 'upload'));
const authRouter = require(path.join(backendPath, 'routes', 'auth'));
const galleryRouter = require(path.join(backendPath, 'routes', 'gallery'));
const testimonialsRouter = require(path.join(backendPath, 'routes', 'testimonials'));
const statsRouter = require(path.join(backendPath, 'routes', 'stats'));

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/posts/:id/comments', commentsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/stats', statsRouter);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SPAN API is running' });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});

const { initDB } = require(path.join(backendPath, 'db'));

initDB().then(() => {
    console.log('Database initialized');
}).catch(err => {
    console.error('DB init failed:', err.message);
});

const handler = serverless(app);
module.exports = { handler };