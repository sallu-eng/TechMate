const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
// Allow requests from your React Frontend (usually port 5173 or 3000)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

// Parse JSON bodies (req.body)
app.use(express.json());

// Logger (prints requests to console)
app.use(morgan('dev'));

// --- MOCK DATABASE (In-Memory) ---
// In a real app, you would use MongoDB, PostgreSQL, etc.

const USER_DATA = {
    id: 1,
    name: "Alex Johnson",
    email: "student@demo.com",
    role: "student",
    level: "Intermediate Dev",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
};

const DASHBOARD_STATS = {
    topicsLearned: 42,
    quizzesTaken: 15,
    averageScore: 88,
    streak: 12,
    recentActivity: [
        { type: 'quiz', title: 'React Hooks Mastery', date: '2 hours ago', score: '9/10' },
        { type: 'note', title: 'Redux State Management', date: '5 hours ago', score: null },
        { type: 'video', title: 'Intro to Tailwind CSS', date: '1 day ago', score: null },
        { type: 'quiz', title: 'JavaScript ES6 Features', date: '2 days ago', score: '8/10' },
    ],
    progressData: [
        { day: 'Mon', hours: 2.5 },
        { day: 'Tue', hours: 4.0 },
        { day: 'Wed', hours: 3.2 },
        { day: 'Thu', hours: 5.5 },
        { day: 'Fri', hours: 1.8 },
        { day: 'Sat', hours: 6.0 },
        { day: 'Sun', hours: 3.5 },
    ],
    courses: [
        { name: "Advanced React Patterns", progress: 75, total: 20, completed: 15 },
        { name: "Node.js Backend API", progress: 45, total: 32, completed: 14 },
        { name: "UI/UX Fundamentals", progress: 10, total: 12, completed: 1 },
    ]
};

// --- HELPER: Simulate Network Delay ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- ROUTES ---

// 1. Health Check
app.get('/', (req, res) => {
    res.send('EduDash API is running...');
});

// 2. Dashboard Stats (Used by Dashboard.jsx)
app.get('/api/dashboard/stats', async (req, res) => {
    // Simulate a 1-second database delay to show off your loading skeletons
    await delay(1000); 
    
    // Return the mock data merged with user info
    res.json({
        user: USER_DATA,
        ...DASHBOARD_STATS
    });
});

// 3. Login Endpoint (Used by LoginPage.jsx)
app.post('/api/auth/login', async (req, res) => {
    await delay(1500); // Simulate processing

    const { email, password } = req.body;

    // Simple Mock Validation
    if (email === "student@demo.com" && password === "password") {
        res.status(200).json({
            success: true,
            token: "fake-jwt-token-123456",
            user: USER_DATA
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }
});

// 4. Signup Endpoint (Used by SignupPage.jsx)
app.post('/api/auth/signup', async (req, res) => {
    await delay(2000);
    const { fullName, email, password } = req.body;

    if (!email || !password || !fullName) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Mock success
    res.status(201).json({
        success: true,
        message: "Account created successfully!",
        user: { name: fullName, email }
    });
});

// 5. Course Roadmap (Used by RoadmapPage.jsx)
app.get('/api/courses', async (req, res) => {
    await delay(800);
    res.json(DASHBOARD_STATS.courses);
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`
    🚀 Server is running!
   
    Local:   http://localhost:${PORT}
    Stats:   http://localhost:${PORT}/api/dashboard/stats
    
    `);
});