const serverless = require('serverless-http');
const express = require('express');
const path = require('path');

process.chdir(path.join(__dirname));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..')));

const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const categoriesRouter = require('./routes/categories');
const newsletterRouter = require('./routes/newsletter');
const uploadRouter = require('./routes/upload');
const authRouter = require('./routes/auth');
const galleryRouter = require('./routes/gallery');
const testimonialsRouter = require('./routes/testimonials');
const statsRouter = require('./routes/stats');

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

const { initDB } = require('./db');

initDB().then(() => {
    console.log('Database initialized');
}).catch(err => {
    console.error('DB init failed:', err.message);
});

const handler = serverless(app);
module.exports = { handler };