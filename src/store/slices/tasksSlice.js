import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    {
      id: '1',
      title: 'Complete Filmmaking Assignment',
      description: 'Submit your first video project',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      status: 'pending',
      priority: 'high',
      category: 'Assignment',
      courseId: 'filmmaking',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    }
  ],
  filter: 'all',
  sortBy: 'dueDate',
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
      }
    },
    markOverdueTasks: (state) => {
      const now = new Date().getTime();
      state.tasks.forEach(task => {
        if (task.status === 'pending' && new Date(task.dueDate).getTime() < now) {
          task.status = 'overdue';
        }
      });
    },
  },
});

export const {
  addTask,
  toggleTaskStatus,
  markOverdueTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;