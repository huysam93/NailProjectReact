const express = require('express');
const cors = require('cors');
const { initializeDB } = require('./database');


const authRoutes = require('./routes/auth');
const aboutRoutes = require('./routes/about');
const serviceRoutes = require('./routes/services');
const galleryRoutes = require('./routes/gallery');
const sliderRoutes = require('./routes/slider');
const reviewRoutes = require('./routes/reviews');
const contactRoutes = require('./routes/contacts');
const appointmentRoutes = require('./routes/appointments');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json({ limit: '10mb' }));


initializeDB();


app.use('/api', authRoutes);
app.use('/api', aboutRoutes);
app.use('/api', serviceRoutes);
app.use('/api', galleryRoutes);
app.use('/api', sliderRoutes);
app.use('/api', reviewRoutes);
app.use('/api', contactRoutes);
app.use('/api', appointmentRoutes);


app.get('/', (req, res) => {
    res.send('NanaNail API is running...');
});

import path from 'path';
import { fileURLToPath } from 'url';

// fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
