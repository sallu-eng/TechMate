import React from 'react';
import { 
  Check, 
  Lock, 
  Play, 
  Map, 
  Star, 
  Clock, 
  ChevronRight,
  Trophy,
  Award
} from 'lucide-react';

// --- MOCK DATA ---
const ROADMAP_DATA = [
  {
    id: 1,
    title: "HTML5 Fundamentals",
    description: "Structure of the web. Tags, attributes, and semantic HTML.",
    status: "completed", // completed, current, locked
    xp: 500,
    duration: "2h 30m",
    topics: ["Tags", "Forms", "SEO", "Accessibility"]
  },
  {
    id: 2,
    title: "CSS3 Styling & Flexbox",
    description: "Making things look good. Box model, colors, and layout engines.",
    status: "completed",
    xp: 750,
    duration: "4h 15m",
    topics: ["Selectors", "Box Model", "Flexbox", "Grid"]
  },
  {
    id: 3,
    title: "JavaScript Basics",
    description: "The logic of the web. Variables, loops, and functions.",
    status: "current",
    xp: 1000,
    duration: "6h 00m",
    topics: ["Variables", "Functions", "DOM Manipulation", "Events"]
  },
  {
    id: 4,
    title: "Advanced JavaScript",
    description: "Deep dive into closures, async/await, and prototypes.",
    status: "locked",
    xp: 1200,
    duration: "5h 45m",
    topics: ["Promises", "Async/Await", "Closures", "this keyword"]
  },
  {
    id: 5,
    title: "React.js Ecosystem",
    description: "Component-based architecture and state management.",
    status: "locked",
    xp: 2000,
    duration: "10h 00m",
    topics: ["Components", "Hooks", "Context API", "Redux"]
  }
];

const RoadmapPage = () => {
  // Calculate Progress
  const totalSteps = ROADMAP_DATA.length;
  const completedSteps = ROADMAP_DATA.filter(i => i.status === 'completed').length;
  const progressPercent = (completedSteps / totalSteps) * 100;
  const totalXP = ROADMAP_DATA.reduce((acc, curr) => acc + (curr.status === 'completed' ? curr.xp : 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* --- HEADER --- */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
          <Map className="text-indigo-600" size={40} />
          Learning Roadmap
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Track your journey from beginner to Full Stack Developer.
        </p>

        {/* Progress Summary Card */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row justify-between items-center max-w-2xl mx-auto">
           <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                <Trophy size={24} />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500 font-semibold uppercase">Total XP Earned</p>
                <p className="text-2xl font-bold text-gray-900">{totalXP.toLocaleString()}</p>
              </div>
           </div>

           <div className="w-full md:w-1/2">
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-gray-600">Course Progress</span>
                <span className="text-indigo-600">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
           </div>
        </div>
      </div>

      {/* --- TIMELINE --- */}
      <div className="max-w-3xl mx-auto relative">
        
        {/* The Vertical Line (Background) */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full hidden md:block"></div>

        <div className="space-y-12 relative">
          {ROADMAP_DATA.map((item, index) => {
            const isCompleted = item.status === 'completed';
            const isCurrent = item.status === 'current';
            const isLocked = item.status === 'locked';

            return (
              <div key={item.id} className={`relative flex flex-col md:flex-row gap-6 ${isLocked ? 'opacity-70 grayscale' : ''}`}>
                
                {/* Visual Node (Circle on the line) */}
                <div className="hidden md:flex flex-col items-center absolute left-0 w-16 h-full z-10">
                   <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-sm transition-all duration-300 bg-white
                      ${isCompleted ? 'border-green-500 text-green-500' : 
                        isCurrent ? 'border-indigo-600 text-indigo-600 scale-110 shadow-indigo-200' : 
                        'border-gray-300 text-gray-400'}
                   `}>
                      {isCompleted && <Check size={32} strokeWidth={3} />}
                      {isCurrent && <Play size={32} fill="currentColor" className="ml-1" />}
                      {isLocked && <Lock size={28} />}
                   </div>
                   
                   {/* Connector Line Coloring */}
                   {index !== ROADMAP_DATA.length - 1 && (
                      <div className={`w-1 flex-1 mt-2 mb-2 rounded ${isCompleted ? 'bg-green-500' : 'bg-transparent'}`}></div>
                   )}
                </div>

                {/* Mobile Line Fix (Hidden on Desktop) */}
                <div className="md:hidden flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        isCompleted ? 'bg-green-100 border-green-500 text-green-600' :
                        isCurrent ? 'bg-indigo-100 border-indigo-600 text-indigo-600' :
                        'bg-gray-100 border-gray-300 text-gray-400'
                    }`}>
                         {isCompleted ? <Check size={16} /> : isCurrent ? <Play size={16} fill="currentColor"/> : <Lock size={16} />}
                    </div>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Module {index + 1}</span>
                </div>

                {/* Content Card */}
                <div className={`flex-1 md:ml-24 bg-white p-6 rounded-2xl border transition-all duration-300 group
                    ${isCurrent ? 'border-indigo-600 shadow-xl shadow-indigo-100 transform scale-[1.02]' : 'border-gray-100 shadow-md hover:shadow-lg'}
                `}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className={`text-xl font-bold ${isCurrent ? 'text-indigo-700' : 'text-gray-800'}`}>
                                {item.title}
                            </h3>
                            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                        {/* XP Badge */}
                        <div className="hidden sm:flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">
                            <Star size={12} fill="currentColor" />
                            {item.xp} XP
                        </div>
                    </div>

                    {/* Topics Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {item.topics.map((topic, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded border border-gray-200">
                                {topic}
                            </span>
                        ))}
                    </div>

                    {/* Footer / Action Area */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center text-gray-400 text-xs font-medium">
                            <Clock size={14} className="mr-1" />
                            {item.duration}
                        </div>

                        {isCurrent ? (
                            <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                Start Learning <ChevronRight size={16} />
                            </button>
                        ) : isCompleted ? (
                            <button className="flex items-center gap-2 text-green-600 px-5 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                                Review Module <Check size={16} />
                            </button>
                        ) : (
                            <button disabled className="flex items-center gap-2 text-gray-400 px-5 py-2 rounded-lg font-semibold bg-gray-50 cursor-not-allowed">
                                <Lock size={16} /> Locked
                            </button>
                        )}
                    </div>
                </div>

              </div>
            );
          })}
        </div>
        
        {/* End of Road Reward */}
        <div className="mt-16 flex flex-col items-center justify-center text-center opacity-60">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <Award size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-400">Frontend Certification</h3>
            <p className="text-sm text-gray-400">Complete all modules to unlock</p>
        </div>

      </div>
    </div>
  );
};

export default RoadmapPage;