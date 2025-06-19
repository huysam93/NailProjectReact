const { getDB } = require('../database');

exports.getAllReviews = (req, res) => {
    const db = getDB();
    db.all('SELECT * FROM reviews', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createReview = (req, res) => {
    const { customer_name, content, rating } = req.body;
    const db = getDB();
    db.run('INSERT INTO reviews (customer_name, content, rating) VALUES (?, ?, ?)', [customer_name, content, rating], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, customer_name, content, rating });
    });
};

exports.updateReview = (req, res) => {
    const { customer_name, content, rating } = req.body;
    const db = getDB();
    db.run('UPDATE reviews SET customer_name = ?, content = ?, rating = ? WHERE id = ?', [customer_name, content, rating, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Review updated', changes: this.changes });
    });
};

exports.deleteReview = (req, res) => {
    const db = getDB();
    db.run('DELETE FROM reviews WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Review deleted', changes: this.changes });
    });
};
