const { getDB } = require('../database');

exports.recordVisit = (req, res) => {
    console.log('✅ Recording visit');
    const db = getDB();

    const ip_address =
        req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    const { user_agent, page_url } = req.body;

    const sql =
        'INSERT INTO visitors (ip_address, user_agent, page_url, visit_time) VALUES (?, ?, ?, datetime("now"))';

    db.run(sql, [ip_address, user_agent, page_url], function (err) {
        if (err) {
            console.error('❌ DB insert error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
};
exports.getVisitorStats = (req, res) => {
    const db = getDB();
    const { start_date, end_date } = req.query;

    let sql = `
        SELECT 
            date(visit_time) as visit_date,
            COUNT(*) as visit_count,
            COUNT(DISTINCT ip_address) as unique_visitors
        FROM visitors
    `;

    const params = [];
    if (start_date && end_date) {
        sql += ' WHERE visit_time BETWEEN ? AND ?';
        params.push(`${start_date} 00:00:00`, `${end_date} 23:59:59`);
    }

    sql += ' GROUP BY date(visit_time) ORDER BY visit_date';

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};