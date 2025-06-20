const { getDB } = require('../database');

exports.getAllMessages = (req, res) => {
    const db = getDB();
    db.all('SELECT * FROM messages ORDER BY createdAt DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createMessage = (req, res) => {
    const db = getDB();
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Message content cannot be empty.' });
    }
    db.run('INSERT INTO messages (content) VALUES (?)', [content], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, content });
    });
};
