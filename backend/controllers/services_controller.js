const { getDB } = require('../database');

exports.getAllServices = (req, res) => {
    const db = getDB();
    db.all('SELECT * FROM services', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createService = (req, res) => {
    const db = getDB();
    const { name, description, price } = req.body;
    db.run('INSERT INTO services (name, description, price) VALUES (?, ?, ?)', [name, description, price], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, description, price });
    });
};

exports.updateService = (req, res) => {
    const db = getDB();
    const { name, description, price } = req.body;
    db.run('UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Service updated', changes: this.changes });
    });
};

exports.deleteService = (req, res) => {
    const db = getDB();
    db.run('DELETE FROM services WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Service deleted', changes: this.changes });
    });
};
