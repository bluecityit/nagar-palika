const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// Serve uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads', 'tenders');
        // Ensure folder exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'tender-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_palika_key_123';

// Setup SQLite Temp DB
let db;
(async () => {
    db = await open({
        filename: './temp.sqlite',
        driver: sqlite3.Database
    });

    // 1. Create tables without file_url first (if they don't exist)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'admin'
        );
        
        CREATE TABLE IF NOT EXISTS tenders_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            publish_date TEXT NOT NULL,
            closing_date TEXT NOT NULL,
            status TEXT DEFAULT 'Active'
        );
        
        CREATE TABLE IF NOT EXISTS birth_certificates_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            registration_no TEXT UNIQUE,
            name TEXT,
            gender TEXT,
            dob TEXT,
            father_name TEXT,
            mother_name TEXT,
            issue_date TEXT
        );
        
        CREATE TABLE IF NOT EXISTS death_certificates_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            registration_no TEXT UNIQUE,
            deceased_name TEXT,
            gender TEXT,
            dod TEXT,
            father_husband_name TEXT,
            issue_date TEXT
        );
        
        CREATE TABLE IF NOT EXISTS news_table (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            content TEXT NOT NULL,
            updated_at TEXT
        );
    `);

    // 2. Run migrations (Add file_url if it doesn't exist)
    try {
        await db.exec('ALTER TABLE tenders_table ADD COLUMN file_url TEXT;');
        console.log("Added file_url column to tenders_table.");
    } catch (err) {
        // Ignore error if column already exists
    }

    // 3. Seed data
    await db.exec(`
        INSERT OR IGNORE INTO users_table (id, username, password_hash) 
        VALUES (1, 'admin', 'password123');
        
        INSERT OR IGNORE INTO tenders_table (id, title, description, publish_date, closing_date, status, file_url)
        VALUES (1, 'Road Repair in Ward 5', 'Repairing of main road from Station to Clock Tower', '2026-05-20', '2026-06-20', 'Active', NULL);
        
        INSERT OR IGNORE INTO birth_certificates_table (id, registration_no, name, gender, dob, father_name, mother_name, issue_date)
        VALUES (1, 'B-2026-001', 'Rahul Sharma', 'Male', '2026-01-15', 'Amit Sharma', 'Priya Sharma', '2026-02-01');
        
        INSERT OR IGNORE INTO death_certificates_table (id, registration_no, deceased_name, gender, dod, father_husband_name, issue_date)
        VALUES (1, 'D-2026-001', 'Ramesh Patel', 'Male', '2026-03-10', 'Suresh Patel', '2026-03-25');
        
        INSERT OR IGNORE INTO news_table (id, content, updated_at)
        VALUES (1, 'Welcome to the official portal of Nagar Palika Ajmer. The online property tax submission deadline has been extended to June 30, 2026.', datetime('now'));
    `);

    console.log("✅ Temporary SQLite database created and seeded!");
})();

// ==========================================
// PUBLIC ROUTES
// ==========================================

app.get('/api/tenders', async (req, res) => {
    try {
        const rows = await db.all("SELECT * FROM tenders_table ORDER BY publish_date DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching tenders' });
    }
});

app.post('/api/verify/birth', async (req, res) => {
    const { registration_no, dob } = req.body;
    if (!registration_no || !dob) return res.status(400).json({ message: 'Registration number and DOB are required.' });

    try {
        const rows = await db.all(
            "SELECT name, father_name, mother_name, issue_date FROM birth_certificates_table WHERE registration_no = ? AND dob = ?", 
            [registration_no, dob]
        );
        if (rows.length > 0) res.json({ success: true, data: rows[0], message: 'Certificate Verified Successfully.' });
        else res.status(404).json({ success: false, message: 'Record not found. Please check your details.' });
    } catch (error) {
        res.status(500).json({ message: 'Database query failed' });
    }
});

app.post('/api/verify/death', async (req, res) => {
    const { registration_no, dod } = req.body;
    if (!registration_no || !dod) return res.status(400).json({ message: 'Registration number and DOD are required.' });

    try {
        const rows = await db.all(
            "SELECT deceased_name, father_husband_name, issue_date FROM death_certificates_table WHERE registration_no = ? AND dod = ?", 
            [registration_no, dod]
        );
        if (rows.length > 0) res.json({ success: true, data: rows[0], message: 'Certificate Verified Successfully.' });
        else res.status(404).json({ success: false, message: 'Record not found.' });
    } catch (error) {
        res.status(500).json({ message: 'Database query failed' });
    }
});

// ==========================================
// ADMIN ROUTES
// ==========================================

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided!' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or Expired Token!' });
        req.user = user;
        next();
    });
};

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for username: "${username}"`);
    try {
        const users = await db.all("SELECT * FROM users_table WHERE LOWER(username) = LOWER(?)", [username]);
        if (users.length === 0) {
            console.log("User not found in DB.");
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const user = users[0];
        if (password === 'password123') { 
            const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
            res.json({ token, username: user.username, role: user.role });
        } else {
            console.log("Password mismatch.");
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

app.post('/api/tenders', authenticateToken, upload.single('pdf_file'), async (req, res) => {
    const { title, description, publish_date, closing_date, status } = req.body;
    // Generate the URL to serve the file statically if uploaded
    const file_url = req.file ? `/uploads/tenders/${req.file.filename}` : null;
    
    try {
        const result = await db.run(
            "INSERT INTO tenders_table (title, description, publish_date, closing_date, status, file_url) VALUES (?, ?, ?, ?, ?, ?)",
            [title, description, publish_date, closing_date, status || 'Active', file_url]
        );
        res.status(201).json({ id: result.lastID, message: 'Tender created successfully', file_url });
    } catch (error) {
        console.error("Failed to create tender:", error);
        res.status(500).json({ message: 'Failed to create tender' });
    }
});

app.put('/api/tenders/:id', authenticateToken, upload.single('pdf_file'), async (req, res) => {
    const { id } = req.params;
    const { title, description, publish_date, closing_date, status } = req.body;
    
    try {
        // If a new file was uploaded, update the file_url. Otherwise, keep the old one.
        if (req.file) {
            const file_url = `/uploads/tenders/${req.file.filename}`;
            const result = await db.run(
                "UPDATE tenders_table SET title=?, description=?, publish_date=?, closing_date=?, status=?, file_url=? WHERE id=?",
                [title, description, publish_date, closing_date, status, file_url, id]
            );
            if (result.changes === 0) return res.status(404).json({ message: 'Tender not found' });
        } else {
            const result = await db.run(
                "UPDATE tenders_table SET title=?, description=?, publish_date=?, closing_date=?, status=? WHERE id=?",
                [title, description, publish_date, closing_date, status, id]
            );
            if (result.changes === 0) return res.status(404).json({ message: 'Tender not found' });
        }
        res.json({ message: 'Tender updated successfully' });
    } catch (error) {
        console.error("Failed to update tender:", error);
        res.status(500).json({ message: 'Failed to update tender' });
    }
});

app.delete('/api/tenders/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        // Ideally, we should also delete the file from the filesystem here, but we will leave it for now
        const result = await db.run("DELETE FROM tenders_table WHERE id=?", [id]);
        if (result.changes === 0) return res.status(404).json({ message: 'Tender not found' });
        res.json({ message: 'Tender deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete tender' });
    }
});

// ==========================================
// NEWS ROUTES
// ==========================================

// Get the latest news
app.get('/api/news', async (req, res) => {
    try {
        const news = await db.get('SELECT * FROM news_table WHERE id = 1');
        if (news) {
            res.json(news);
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Update the latest news (Protected)
app.put('/api/news', authenticateToken, async (req, res) => {
    try {
        const { content } = req.body;
        await db.run('UPDATE news_table SET content = ?, updated_at = datetime("now") WHERE id = 1', [content]);
        res.json({ message: 'News updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Ajmer Nagar Palika API (SQLite) is running on port ${PORT}`);
});