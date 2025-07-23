import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setMobileMenuOpen } from './store/slices/uiSlice';
import { markOverdueTasks } from './store/slices/tasksSlice';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CourseCreation from './components/CourseCreation';
import FilmmakingCourse from './components/FilmmakingCourse';
import LocationCard from './components/LocationCard';
import StoryBooks from './components/StoryBooks';

const AppContent = () => {
  const dispatch = useAppDispatch();
  const { activeMenuItem, isMobileMenuOpen } = useAppSelector(state => state.ui);
  const { user } = useAppSelector(state => state.auth);
  const { tasks } = useAppSelector(state => state.tasks);
  const { achievements, totalPoints, level } = useAppSelector(state => state.achievements);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        dispatch(setMobileMenuOpen(false));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Mark overdue tasks periodically
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(markOverdueTasks());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-gray-600">{user?.role}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold mb-2 text-gray-900">Courses Enrolled</h4>
                  <p className="text-2xl font-bold text-red-500">3</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold mb-2 text-gray-900">Total Points</h4>
                  <p className="text-2xl font-bold text-green-500">{totalPoints}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold mb-2 text-gray-900">Current Level</h4>
                  <p className="text-2xl font-bold text-blue-500">{level}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'calendar':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Calendar</h2>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-semibold text-gray-600">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="p-2 text-center hover:bg-gray-100 rounded cursor-pointer">
                  {i > 6 && i < 32 ? i - 6 : ''}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="font-semibold">Filmmaking - Basic</p>
                <p className="text-sm text-gray-600">Today, 09:00 - 10:00</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-semibold">Location N°4 Meeting</p>
                <p className="text-sm text-gray-600">Today, 09:00 - 10:00</p>
              </div>
            </div>
          </div>
        );
      
      case 'tasks':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Tasks</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className={`p-4 rounded-xl border-l-4 ${
                  task.status === 'completed' 
                    ? 'bg-green-50 border-green-500' 
                    : task.status === 'overdue'
                    ? 'bg-red-50 border-red-500'
                    : 'bg-yellow-50 border-yellow-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold ${
                        task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </p>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button className={`px-3 py-1 rounded text-sm font-medium ${
                      task.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : task.status === 'overdue'
                        ? 'bg-red-500 text-white'
                        : 'bg-yellow-500 text-white hover:bg-yellow-600'
                    }`}>
                      {task.status === 'completed' ? 'Completed' : 
                       task.status === 'overdue' ? 'Overdue' : 'Mark Done'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'achievements':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
              <div className="text-right">
                <p className="text-sm text-gray-500">Level {level}</p>
                <p className="text-lg font-bold text-red-500">{totalPoints} Points</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  achievement.isEarned 
                    ? 'border-yellow-300 bg-yellow-50 shadow-md' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className={`font-semibold mb-1 ${
                      achievement.isEarned ? 'text-yellow-700' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm mb-2 ${
                      achievement.isEarned ? 'text-yellow-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        achievement.rarity === 'legendary' ? 'bg-purple-100 text-purple-700' :
                        achievement.rarity === 'epic' ? 'bg-orange-100 text-orange-700' :
                        achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {achievement.rarity}
                      </span>
                      <span className="text-xs font-medium text-gray-600">
                        {achievement.points} pts
                      </span>
                    </div>
                    
                    {achievement.isEarned && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                          Earned
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'filmmaking':
      case 'english':
      case 'design':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FilmmakingCourse />
            <div className="space-y-6">
              <LocationCard />
              <StoryBooks />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
            <div className="xl:col-span-1">
              <CourseCreation />
            </div>
            <div className="xl:col-span-1">
              <FilmmakingCourse />
            </div>
            <div className="xl:col-span-1 space-y-4 lg:space-y-6">
              <LocationCard />
              <StoryBooks />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;