const { getDB } = require('../database');

exports.getSliderImages = (req, res) => {
    const db = getDB();
    db.all('SELECT * FROM slider_images', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.addSliderImage = (req, res) => {
    const db = getDB();
    const { image_base64 } = req.body;
    if (!image_base64) {
        return res.status(400).json({ error: 'Image data is required.' });
    }
    db.run('INSERT INTO slider_images (image_base64) VALUES (?)', [image_base64], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, image_base64 });
    });
};

exports.deleteSliderImage = (req, res) => {
    const db = getDB();
    db.run('DELETE FROM slider_images WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Slider image deleted', changes: this.changes });
    });
};
