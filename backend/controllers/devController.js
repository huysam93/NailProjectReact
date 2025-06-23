const path = require('path');

exports.downloadDatabase = (req, res) => {
  const filePath = path.join(__dirname, '../nananail.db'); // hoặc ./database/database.db nếu bạn đặt ở nơi khác

  res.download(filePath, 'nananail.db', (err) => {
    if (err) {
      console.error('❌ Lỗi khi tải database:', err);
      res.status(500).send('Không thể tải file');
    }
  });
};
