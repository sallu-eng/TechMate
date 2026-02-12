import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Flame, 
  Bell, 
  Search, 
  Menu, 
  MoreVertical,
  Clock,
  CheckCircle,
  PlayCircle,
  User
} from 'lucide-react';

// --- DEMO DATA (Fallback if API fails) ---
const MOCK_DATA = {
    user: { name: "Alex Johnson", level: "Intermediate Dev" },
    topicsLearned: 42,
    quizzesTaken: 15,
    averageScore: 88,
    streak: 12,
    progressData: [
        { day: 'Mon', hours: 2.5 },
        { day: 'Tue', hours: 4.0 },
        { day: 'Wed', hours: 3.2 },
        { day: 'Thu', hours: 5.5 },
        { day: 'Fri', hours: 1.8 },
        { day: 'Sat', hours: 6.0 },
        { day: 'Sun', hours: 3.5 },
    ],
    recentActivity: [
        { type: 'quiz', title: 'React Hooks Mastery', date: '2 hours ago', score: '9/10' },
        { type: 'note', title: 'Redux State Management', date: '5 hours ago', score: null },
        { type: 'video', title: 'Intro to Tailwind CSS', date: '1 day ago', score: null },
        { type: 'quiz', title: 'JavaScript ES6 Features', date: '2 days ago', score: '8/10' },
    ],
    courses: [
        { name: "Advanced React Patterns", progress: 75, total: 20, completed: 15 },
        { name: "Node.js Backend API", progress: 45, total: 32, completed: 14 },
        { name: "UI/UX Fundamentals", progress: 10, total: 12, completed: 1 },
    ]
};

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isUsingMock, setIsUsingMock] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Attempt to fetch real data
                const response = await fetch('http://localhost:5000/api/dashboard/stats');
                if (!response.ok) throw new Error("API Error");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.warn("API unavailable, switching to Mock Data mode.");
                // Fallback to Mock Data smoothly
                setTimeout(() => {
                    setStats(MOCK_DATA);
                    setIsUsingMock(true);
                }, 800); // Small delay to simulate network
            } finally {
                setTimeout(() => setIsLoading(false), 800);
            }
        };

        fetchStats();
    }, []);

    // --- SUB-COMPONENTS ---
    
    const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
                    <p className={`text-xs font-semibold mt-2 ${color === 'orange' ? 'text-orange-600' : 'text-green-600'}`}>
                        {subtext}
                    </p>
                </div>
                <div className={`p-4 rounded-full bg-${color}-50`}>
                    <Icon className={`w-8 h-8 text-${color}-500`} />
                </div>
            </div>
        </div>
    );

    const LoadingSkeleton = () => (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-pulse">
            <div className="h-8 bg-gray-200 w-1/4 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-64 bg-gray-200 rounded-xl"></div>
                <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
        </div>
    );

    if (isLoading) return <div className="min-h-screen bg-gray-50 flex pt-20 justify-center"><LoadingSkeleton /></div>;

    if (!stats) return <div className="p-8 text-center text-red-500">Critical Error loading application.</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex">
            
            {/* Sidebar (Desktop & Mobile) */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="p-6 flex items-center justify-between border-b">
                    <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
                        <BookOpen size={28} />
                        <span>EduDash</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500"><Menu /></button>
                </div>
                <nav className="p-4 space-y-2">
                    {['Dashboard', 'My Courses', 'Assignments', 'Analytics', 'Settings'].map((item, idx) => (
                        <a key={idx} href="#" className={`block px-4 py-3 rounded-lg flex items-center space-x-3 ${idx === 0 ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                            {idx === 0 && <TrendingUp size={20} />}
                            {idx === 1 && <BookOpen size={20} />}
                            {idx === 2 && <CheckCircle size={20} />}
                            {idx === 3 && <TrendingUp size={20} />}
                            {idx === 4 && <User size={20} />}
                            <span className="font-medium">{item}</span>
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 transition-all">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-6 py-4">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600"><Menu /></button>
                        
                        <div className="hidden md:flex relative w-96">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                            <input type="text" placeholder="Search for courses, skills..." className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="relative cursor-pointer">
                                <Bell className="text-gray-600 w-6 h-6 hover:text-indigo-600 transition-colors" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-gray-800">{stats.user?.name || "User"}</p>
                                    <p className="text-xs text-gray-500">{stats.user?.level || "Student"}</p>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {stats.user?.name?.charAt(0) || "U"}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 max-w-7xl mx-auto">
                    {/* Alert for Demo Mode */}
                    {isUsingMock && (
                        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r shadow-sm flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="text-yellow-700 text-sm font-medium">⚠️ API Unreachable. Showing Demo Data.</span>
                            </div>
                        </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard 
                            title="Topics Learned" 
                            value={stats.topicsLearned} 
                            subtext="+12% this week" 
                            icon={BookOpen} 
                            color="blue" 
                        />
                        <StatCard 
                            title="Quizzes Taken" 
                            value={stats.quizzesTaken} 
                            subtext="Top 10% Rank" 
                            icon={Trophy} 
                            color="purple" 
                        />
                        <StatCard 
                            title="Avg. Score" 
                            value={`${stats.averageScore}%`} 
                            subtext="Consistent!" 
                            icon={TrendingUp} 
                            color="green" 
                        />
                        <StatCard 
                            title="Streak" 
                            value={`${stats.streak} Days`} 
                            subtext="Keep it up!" 
                            icon={Flame} 
                            color="orange" 
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Left Column: Charts & Courses */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Chart Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">Learning Activity</h2>
                                    <select className="text-sm border-gray-200 rounded-lg text-gray-500 bg-gray-50 p-2 outline-none">
                                        <option>This Week</option>
                                        <option>Last Week</option>
                                    </select>
                                </div>
                                
                                <div className="flex items-end justify-between h-64 mt-4 px-2">
                                    {stats.progressData.map((data, index) => (
                                        <div key={index} className="flex flex-col items-center group w-full mx-1">
                                            <div className="relative w-full flex justify-center">
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded z-10 whitespace-nowrap">
                                                    {data.hours} Hours
                                                </div>
                                                {/* Bar */}
                                                <div 
                                                    className="w-full max-w-[40px] bg-indigo-100 rounded-t-lg group-hover:bg-indigo-500 transition-all duration-500 ease-out relative overflow-hidden"
                                                    style={{ height: `${data.hours * 25}px` }}
                                                >
                                                    {/* Gradient Overlay */}
                                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/20 to-transparent"></div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-400 mt-3">{data.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Active Courses Progress */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">In Progress Courses</h2>
                                <div className="space-y-6">
                                    {stats.courses?.map((course, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between items-end mb-1">
                                                <h4 className="font-semibold text-gray-700">{course.name}</h4>
                                                <span className="text-xs text-gray-500">{course.completed}/{course.total} Modules</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2.5">
                                                <div 
                                                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000" 
                                                    style={{ width: `${course.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Activity & Recommendations */}
                        <div className="space-y-8">
                            
                            {/* Recent Activity */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
                                    <MoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
                                </div>
                                <div className="space-y-6">
                                    {stats.recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-start group">
                                            <div className={`mt-1 p-2 rounded-lg flex-shrink-0 ${
                                                activity.type === 'quiz' ? 'bg-green-100 text-green-600' :
                                                activity.type === 'note' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                            }`}>
                                                {activity.type === 'quiz' && <Trophy size={16} />}
                                                {activity.type === 'note' && <BookOpen size={16} />}
                                                {activity.type === 'video' && <PlayCircle size={16} />}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors cursor-pointer">{activity.title}</p>
                                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                                    <Clock size={12} className="mr-1" />
                                                    <span>{activity.date}</span>
                                                    {activity.score && <span className="ml-2 font-medium text-green-600">• Score: {activity.score}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
                                    View All Activity
                                </button>
                            </div>

                            {/* Daily Motivation / Upsell */}
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold mb-2">Pro Membership</h3>
                                    <p className="text-indigo-100 text-sm mb-4">Unlock advanced analytics and unlimited quizzes.</p>
                                    <button className="bg-white text-indigo-600 text-sm font-bold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                                        Upgrade Now
                                    </button>
                                </div>
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black opacity-20 rounded-full blur-xl"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;