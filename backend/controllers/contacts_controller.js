const { getDB } = require('../database');
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'huysam93@gmail.com', // Replace with your email from environment variables
    pass: 'your-app-password'    // Replace with your email app password
  }
});

exports.getAllContacts = (req, res) => {
    const db = getDB();
    db.all('SELECT * FROM contacts ORDER BY created_at DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createContact = (req, res) => {
    const { name, email, message } = req.body;
    const db = getDB();

    db.run('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', [name, email, message], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: 'huysam93@gmail.com',
            subject: 'New Contact Message from NanaNail Website',
            html: `
                <h3>You have a new contact message:</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending contact email:', error);
            }
        });

        res.status(201).json({ id: this.lastID, name, email, message });
    });
};

exports.deleteContact = (req, res) => {
    const db = getDB();
    db.run('DELETE FROM contacts WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Contact deleted', changes: this.changes });
    });
};
