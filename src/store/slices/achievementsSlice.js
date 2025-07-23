import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  achievements: [
    {
      id: '1',
      title: 'First Course Completed',
      description: 'Completed your first course',
      icon: '🎓',
      category: 'course',
      points: 100,
      isEarned: true,
      earnedAt: new Date(Date.now() - 604800000).toISOString(),
      progress: 1,
      maxProgress: 1,
      rarity: 'common'
    }
  ],
  totalPoints: 600,
  level: 3,
  nextLevelPoints: 1000,
  categories: ['course', 'attendance', 'performance', 'social', 'reading', 'creative'],
  filter: 'all',
  sortBy: 'recent',
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    updateProgress: (state, action) => {
      const { id, progress } = action.payload;
      const achievement = state.achievements.find(a => a.id === id);
      if (achievement && !achievement.isEarned) {
        achievement.progress = Math.min(progress, achievement.maxProgress);
        
        if (achievement.progress >= achievement.maxProgress) {
          achievement.isEarned = true;
          achievement.earnedAt = new Date().toISOString();
          state.totalPoints += achievement.points;
        }
      }
    },
    earnAchievement: (state, action) => {
      const achievement = state.achievements.find(a => a.id === action.payload);
      if (achievement && !achievement.isEarned) {
        achievement.isEarned = true;
        achievement.earnedAt = new Date().toISOString();
        state.totalPoints += achievement.points;
      }
    },
  },
});

export const {
  updateProgress,
  earnAchievement,
} = achievementsSlice.actions;

export default achievementsSlice.reducer;