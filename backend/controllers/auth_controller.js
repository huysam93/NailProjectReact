const { getDB } = require('../database');
const bcrypt = require('bcryptjs');



exports.login = (req, res) => {
    const { username, password } = req.body;
    const db = getDB();

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password_hash);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        res.status(200).json({ message: 'Login successful' });
    });
};
