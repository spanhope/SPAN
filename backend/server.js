const express = require('express');
const cors = require('cors');
const path = require('path');

try { require('dotenv').config({ path: path.join(__dirname, '.env') }); } catch (_) { }

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Bypass-Tunnel-Reminder']
}));
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
    res.json({ status: 'ok', message: 'SPAN Blog API is running' });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});

const { initDB } = require('./db');

module.exports = { app, initDB };

if (require.main === module) {
    initDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`\n🚀 SPAN Blog API running at http://localhost:${PORT}`);
                console.log(`   Blog:        http://localhost:${PORT}/blog.html`);
                console.log(`   Blog Post:   http://localhost:${PORT}/blog-single.html?id=1`);
                console.log(`   Upload API:  POST http://localhost:${PORT}/api/upload`);
                console.log(`   API Docs:    http://localhost:${PORT}/api/posts\n`);
            });
        })
        .catch(err => {
            console.error('❌ Failed to initialise database:', err.message);
            process.exit(1);
        });
}