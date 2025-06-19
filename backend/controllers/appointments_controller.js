const { getDB } = require('../database');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'huysam93@gmail.com',
    pass: 'your-app-password'
  }
});

exports.getAllAppointments = (req, res) => {
    const db = getDB();
    const sql = `
        SELECT a.id, a.customer_name, a.appointment_date, a.status, s.name as service_name 
        FROM appointments a
        LEFT JOIN services s ON a.service_id = s.id
        ORDER BY a.appointment_date DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createAppointment = (req, res) => {
    const { customer_name, service_id, appointment_date } = req.body;
    const db = getDB();

    const sqlGetService = 'SELECT name FROM services WHERE id = ?';
    db.get(sqlGetService, [service_id], (err, service) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!service) return res.status(404).json({ error: 'Service not found' });

        db.run('INSERT INTO appointments (customer_name, service_id, appointment_date) VALUES (?, ?, ?)', [customer_name, service_id, appointment_date], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            
            const mailOptions = {
                from: '"NanaNail Booking" <huysam93@gmail.com>',
                to: 'huysam93@gmail.com',
                subject: 'New Appointment Booking',
                html: `
                    <h3>New appointment booked:</h3>
                    <p><strong>Name:</strong> ${customer_name}</p>
                    <p><strong>Service:</strong> ${service.name}</p>
                    <p><strong>Date:</strong> ${new Date(appointment_date).toLocaleString('vi-VN')}</p>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.error('Error sending admin email for booking:', error);
            });

            res.status(201).json({ id: this.lastID, customer_name, service_id, appointment_date });
        });
    });
};

exports.updateAppointmentStatus = (req, res) => {
    const { status } = req.body;
    const db = getDB();
    db.run('UPDATE appointments SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Appointment status updated', changes: this.changes });
    });
};

exports.deleteAppointment = (req, res) => {
    const db = getDB();
    db.run('DELETE FROM appointments WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Appointment deleted', changes: this.changes });
    });
};
