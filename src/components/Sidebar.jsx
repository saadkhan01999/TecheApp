import React from 'react';
import { User, BookOpen, Calendar, CheckSquare, Trophy, ChevronDown, Home, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveMenuItem, toggleExpandedCourses, setMobileMenuOpen } from '../store/slices/uiSlice';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { activeMenuItem, isMobileMenuOpen, expandedCourses } = useAppSelector(state => state.ui);
  const { courses } = useAppSelector(state => state.courses);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'courses', label: 'Courses', icon: BookOpen, hasSubmenu: true },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  const handleItemClick = (itemId) => {
    if (itemId === 'courses') {
      dispatch(toggleExpandedCourses());
    }
    dispatch(setActiveMenuItem(itemId));
    
    if (window.innerWidth < 1024) {
      dispatch(setMobileMenuOpen(false));
    }
  };

  const handleCourseClick = (courseId) => {
    dispatch(setActiveMenuItem(courseId));
    if (window.innerWidth < 1024) {
      dispatch(setMobileMenuOpen(false));
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(setMobileMenuOpen(false))}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white h-full shadow-lg transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 sm:p-6 h-full overflow-y-auto">
          <div className="flex items-center mb-6 sm:mb-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center">
              <Home className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="ml-3 text-lg sm:text-xl font-semibold">Teche</span>
          </div>
          
          <nav className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 sm:py-3 rounded-lg text-left transition-all duration-200 ${
                    activeMenuItem === item.id
                      ? 'bg-red-50 text-red-600 border-l-4 border-red-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
                    <span className="text-sm sm:text-base">{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      expandedCourses ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {item.id === 'courses' && expandedCourses && (
                  <div className="ml-6 sm:ml-8 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {courses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => handleCourseClick(course.id)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded text-sm transition-all duration-200 ${
                          activeMenuItem === course.id
                            ? 'text-red-500 font-medium bg-red-50'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{course.name}</span>
                        {course.isActive && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;