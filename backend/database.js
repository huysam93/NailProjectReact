const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { https } = require('follow-redirects');
require('dotenv').config();

const DB_FILE = './nananail.db';
let db;

// Tải file .db từ Google Drive
function downloadDatabaseBackup(url, destination, callback) {
    const file = fs.createWriteStream(destination);
    https.get(url, (response) => {
        if (response.statusCode !== 200) {
            return callback(new Error(`Failed to download: ${response.statusCode}`));
        }

        response.pipe(file);
        file.on('finish', () => file.close(callback));
    }).on('error', (err) => {
        fs.unlink(destination, () => { }); // Xoá file nếu lỗi
        callback(err);
    });
}

// Khởi tạo DB
function initializeDB() {
    const dbExists = fs.existsSync(DB_FILE);

    const startApp = () => {
        db = new sqlite3.Database(DB_FILE, (err) => {
            if (err) {
                console.error('❌ Error connecting to database:', err.message);
                return;
            }
            console.log('✅ Connected to the NanaNail SQLite database.');

            if (!dbExists) {
                console.log('🧱 Creating and seeding tables...');
                createAndSeedTables();
            }
        });
    };

    if (!dbExists) {
        const backupURL = process.env.DB_BACKUP_URL;
        if (!backupURL) {
            console.warn('⚠️ DB_BACKUP_URL not set. Creating new empty DB...');
            return startApp();
        }

        console.log('📂 Database not found. Downloading from backup URL...');
        downloadDatabaseBackup(backupURL, DB_FILE, (err) => {
            if (err) {
                console.error('❌ Failed to download backup:', err.message);
                console.log('🚧 Proceeding to create new DB instead.');
                startApp();
            } else {
                console.log('✅ Database backup downloaded successfully.');
                startApp();
            }
        });
    } else {
        startApp();
    }
}

// Tạo và seed dữ liệu
function createAndSeedTables() {
    const saltRounds = 10;
    const adminPassword = 'tranconghuy@32';
    const passwordHash = bcrypt.hashSync(adminPassword, saltRounds);

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY,
      content TEXT
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS gallery_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_base64 TEXT NOT NULL,
      tag TEXT
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS slider_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_base64 TEXT NOT NULL
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      content TEXT,
      rating INTEGER CHECK(rating >= 1 AND rating <= 5)
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      service_id INTEGER,
      appointment_date TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (service_id) REFERENCES services(id)
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT,
      user_agent TEXT,
      page_url TEXT,
      visit_time DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

        seedData(passwordHash);
    });
}

// Seed dữ liệu mẫu
function seedData(passwordHash) {
    db.serialize(() => {
        const stmtUsers = db.prepare("INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)");
        stmtUsers.run('nananail', passwordHash);
        stmtUsers.finalize();

        const stmtAbout = db.prepare("INSERT OR IGNORE INTO about (id, content) VALUES (?, ?)");
        stmtAbout.run(1, 'Chào mừng đến với NanaNail! Chúng tôi tự hào mang đến cho bạn những dịch vụ chăm sóc móng chuyên nghiệp và chất lượng nhất tại Đà Lạt. Với đội ngũ kỹ thuật viên tay nghề cao và không gian thư giãn, sang trọng, NanaNail là điểm đến lý tưởng để bạn làm mới bản thân và tận hưởng những phút giây thư thái.');
        stmtAbout.finalize();

        const services = [
            { name: 'Sơn Gel', description: 'Sơn gel cao cấp với nhiều màu sắc thời thượng, bền màu.', price: 150000 },
            { name: 'Đắp bột', description: 'Kỹ thuật đắp bột chuyên nghiệp, tạo form móng chuẩn.', price: 300000 },
            { name: 'Nail Art Design', description: 'Vẽ, đính đá, thiết kế nail theo yêu cầu.', price: 50000 },
            { name: 'Chăm sóc móng tay/chân', description: 'Cắt da, dũa móng, massage tay và chân.', price: 100000 }
        ];
        const stmtServices = db.prepare("INSERT OR IGNORE INTO services (name, description, price) VALUES (?, ?, ?)");
        services.forEach(s => stmtServices.run(s.name, s.description, s.price));
        stmtServices.finalize();

        const reviews = [
            { name: 'Chị Lan Anh', content: 'Dịch vụ rất tốt, nhân viên nhiệt tình, mình rất hài lòng!', rating: 5 },
            { name: 'Bạn Minh Thư', content: 'Mẫu nail xinh xỉu, lần sau sẽ ghé lại.', rating: 5 },
            { name: 'Anh Hùng', content: 'Không gian sạch sẽ, sang trọng. Bạn gái mình rất thích.', rating: 4 }
        ];
        const stmtReviews = db.prepare("INSERT OR IGNORE INTO reviews (customer_name, content, rating) VALUES (?, ?, ?)");
        reviews.forEach(r => stmtReviews.run(r.name, r.content, r.rating));
        stmtReviews.finalize();

        console.log('✅ Database seeded successfully.');
    });
}

// Export
module.exports = {
    initializeDB,
    getDB: () => db
};
