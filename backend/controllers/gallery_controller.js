const { getDB } = require('../database');


exports.getGalleryImages = (req, res) => {
    const db = getDB();
    db.all('SELECT * FROM gallery_images', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.addGalleryImage = (req, res) => {
    const { image_base64, tag } = req.body;
    const db = getDB();
    if (!image_base64) {
        return res.status(400).json({ error: 'Image data is required.' });
    }
    db.run('INSERT INTO gallery_images (image_base64, tag) VALUES (?, ?)', [image_base64, tag], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, image_base64, tag });
    });
};

exports.deleteGalleryImage = (req, res) => {
    const db = getDB();
    db.run('DELETE FROM gallery_images WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Gallery image deleted', changes: this.changes });
    });
};
