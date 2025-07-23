import React from 'react';
import { ChevronRight, Play, Clock, Users, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedLevel, enrollInCourse, updateCourseProgress } from '../store/slices/coursesSlice';

const FilmmakingCourse = () => {
  const dispatch = useAppDispatch();
  const { courses, selectedLevel, enrolledCourses } = useAppSelector(state => state.courses);
  
  const filmmakingCourse = courses.find(course => course.id === 'filmmaking');
  
  if (!filmmakingCourse) return null;

  const handleLevelClick = (levelId) => {
    dispatch(setSelectedLevel(selectedLevel === levelId ? null : levelId));
  };

  const handleEnroll = (levelId) => {
    if (!enrolledCourses.includes(levelId)) {
      dispatch(enrollInCourse(levelId));
      console.log(`Enrolled in ${levelId} course`);
    }
  };

  const handleStartCourse = (levelId) => {
    console.log(`Starting ${levelId} course`);
    const currentProgress = filmmakingCourse.levels.find(l => l.id === levelId)?.progress || 0;
    const newProgress = Math.min(currentProgress + 10, 100);
    dispatch(updateCourseProgress({ courseId: levelId, progress: newProgress }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
      <div className="mb-4 sm:mb-6">
        <img
          src={filmmakingCourse.image}
          alt="Filmmaking setup"
          className="w-full h-32 sm:h-48 object-cover rounded-xl mb-4"
        />
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-900">{filmmakingCourse.name}</h2>
      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
        {filmmakingCourse.description}
      </p>
      
      <div className="space-y-3">
        {filmmakingCourse.levels.map((level) => (
          <div key={level.id} className="space-y-2">
            <div
              onClick={() => handleLevelClick(level.id)}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border-l-4 cursor-pointer transition-all duration-200 ${level.color} ${level.bgColor} hover:shadow-md ${
                selectedLevel === level.id ? 'ring-2 ring-red-200' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{level.name}</h3>
                  <div className="flex items-center space-x-2">
                    {level.isEnrolled && level.progress > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${level.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-green-600 font-medium">{level.progress}%</span>
                      </div>
                    )}
                    <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 ${
                      selectedLevel === level.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{level.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{level.students} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    <span>{level.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded content */}
            {selectedLevel === level.id && (
              <div className="ml-4 p-4 bg-gray-50 rounded-xl animate-in slide-in-from-top-2 duration-200">
                <p className="text-gray-600 mb-4 text-sm">{level.description}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  {level.isEnrolled ? (
                    <button
                      onClick={() => handleStartCourse(level.id)}
                      className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-600 transition-colors text-sm"
                    >
                      <Play className="w-4 h-4" />
                      <span>Continue Learning</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(level.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-600 transition-colors text-sm"
                    >
                      Enroll Now
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm">
                    Preview
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmmakingCourse;