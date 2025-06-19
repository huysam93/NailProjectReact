const { getDB } = require('../database');

exports.getAbout = (req, res) => {
    const db = getDB();
    db.get('SELECT * FROM about WHERE id = 1', [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
};

exports.updateAbout = (req, res) => {
    const { content } = req.body;
    const db = getDB();
    db.run('UPDATE about SET content = ? WHERE id = 1', [content], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'About content updated', changes: this.changes });
    });
};
