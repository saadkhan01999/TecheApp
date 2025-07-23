import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [
    {
      id: 'filmmaking',
      name: 'Filmmaking',
      description: 'Learn the art of storytelling through film with our comprehensive course, working with the artists and editors enhancing the director\'s portfolio.',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructor: 'John Director',
      duration: '12 weeks',
      students: 89,
      rating: 4.6,
      progress: 75,
      isEnrolled: true,
      isActive: true,
      levels: [
        {
          id: 'basic',
          name: 'Basic',
          time: '09:00 - 10:00',
          duration: '1 hour',
          students: 24,
          rating: 4.5,
          color: 'border-l-red-500',
          bgColor: 'bg-red-50',
          description: 'Introduction to filmmaking basics',
          progress: 75,
          isEnrolled: true
        },
        {
          id: 'advanced',
          name: 'Advanced',
          time: '09:30 - 10:30',
          duration: '1 hour',
          students: 18,
          rating: 4.8,
          color: 'border-l-yellow-500',
          bgColor: 'bg-yellow-50',
          description: 'Advanced techniques and storytelling',
          progress: 0,
          isEnrolled: false
        },
        {
          id: 'basic3',
          name: 'Basic 3 years',
          time: '11:00 - 12:00',
          duration: '1 hour',
          students: 32,
          rating: 4.3,
          color: 'border-l-green-500',
          bgColor: 'bg-green-50',
          description: 'Comprehensive 3-year program',
          progress: 0,
          isEnrolled: false
        },
        {
          id: 'advanced3',
          name: 'Advanced 3 years',
          time: '12:00 - 13:00',
          duration: '1 hour',
          students: 15,
          rating: 4.9,
          color: 'border-l-purple-500',
          bgColor: 'bg-purple-50',
          description: 'Professional filmmaking mastery',
          progress: 0,
          isEnrolled: false
        }
      ]
    },
    {
      id: 'english',
      name: 'English Grammar',
      description: 'Master English grammar with comprehensive lessons and practical exercises.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructor: 'Sarah Johnson',
      duration: '8 weeks',
      students: 156,
      rating: 4.4,
      progress: 0,
      isEnrolled: false,
      isActive: false,
      levels: []
    },
    {
      id: 'design',
      name: 'Graphic Design',
      description: 'Learn modern graphic design principles and tools.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructor: 'Mike Creative',
      duration: '10 weeks',
      students: 203,
      rating: 4.7,
      progress: 0,
      isEnrolled: false,
      isActive: false,
      levels: []
    }
  ],
  selectedCourse: null,
  selectedLevel: null,
  enrolledCourses: ['basic'],
  courseCreation: {
    courseName: 'Filmmaker',
    password: '',
    verificationCode: ['', '', '', '', '', ''],
    isVerifying: false,
    verificationStatus: 'idle',
    errors: {}
  },
  isLoading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = state.courses.find(course => course.id === action.payload) || null;
    },
    setSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
    },
    enrollInCourse: (state, action) => {
      const courseId = action.payload;
      if (!state.enrolledCourses.includes(courseId)) {
        state.enrolledCourses.push(courseId);
      }
      
      // Update course enrollment status
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        course.isEnrolled = true;
      }
      
      // Update level enrollment status
      state.courses.forEach(course => {
        const level = course.levels.find(l => l.id === courseId);
        if (level) {
          level.isEnrolled = true;
        }
      });
    },
    updateCourseProgress: (state, action) => {
      const { courseId, progress } = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        course.progress = progress;
      }
      
      // Update level progress
      state.courses.forEach(course => {
        const level = course.levels.find(l => l.id === courseId);
        if (level) {
          level.progress = progress;
        }
      });
    },
    setCourseCreationField: (state, action) => {
      const { field, value } = action.payload;
      state.courseCreation[field] = value;
    },
    setVerificationCode: (state, action) => {
      const { index, value } = action.payload;
      state.courseCreation.verificationCode[index] = value;
    },
    setVerificationErrors: (state, action) => {
      state.courseCreation.errors = action.payload;
    },
    startVerification: (state) => {
      state.courseCreation.isVerifying = true;
      state.courseCreation.verificationStatus = 'idle';
    },
    verificationSuccess: (state) => {
      state.courseCreation.isVerifying = false;
      state.courseCreation.verificationStatus = 'success';
      state.courseCreation.errors = {};
    },
    verificationFailure: (state, action) => {
      state.courseCreation.isVerifying = false;
      state.courseCreation.verificationStatus = 'error';
      state.courseCreation.errors = action.payload;
    },
    resetVerificationCode: (state) => {
      state.courseCreation.verificationCode = ['', '', '', '', '', ''];
      state.courseCreation.errors = {};
      state.courseCreation.verificationStatus = 'idle';
    },
    clearCourseErrors: (state) => {
      state.courseCreation.errors = {};
      state.error = null;
    },
  },
});

export const {
  setSelectedCourse,
  setSelectedLevel,
  enrollInCourse,
  updateCourseProgress,
  setCourseCreationField,
  setVerificationCode,
  setVerificationErrors,
  startVerification,
  verificationSuccess,
  verificationFailure,
  resetVerificationCode,
  clearCourseErrors,
} = coursesSlice.actions;

export default coursesSlice.reducer;