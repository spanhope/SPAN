const express = require('express');
const router = express.Router();
const { run, all } = require('../db');

router.delete('/subscribers/:id', async (req, res, next) => {
    try {
        await run('DELETE FROM newsletter_subscribers WHERE id = ?', [req.params.id]);
        res.json({ message: 'Subscriber deleted' });
    } catch (err) { next(err); }
});

router.get('/subscribers', async (req, res, next) => {
    try {
        const subscribers = await all('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC');
        res.json(subscribers);
    } catch (err) { next(err); }
});

router.post('/subscribe', async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'A valid email address is required' });
        }
        await run(
            'INSERT INTO newsletter_subscribers (email) VALUES (?)',
            [email.trim().toLowerCase()]
        );
        res.json({ message: 'Thank you for subscribing to our newsletter!' });
    } catch (err) {
        if (err.message && err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'This email is already subscribed.' });
        }
        next(err);
    }
});

module.exports = router;