import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [
    {
      id: '1',
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from your instructor',
      timestamp: new Date().toISOString(),
      isRead: false,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'message',
      title: 'Course Update',
      message: 'Filmmaking course has been updated',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isRead: false,
      priority: 'low'
    },
    {
      id: '3',
      type: 'alert',
      title: 'Assignment Due',
      message: 'Your filmmaking assignment is due tomorrow',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      isRead: false,
      priority: 'high'
    }
  ],
  unreadCounts: {
    messages: 2,
    alerts: 1,
    settings: 3,
  },
  isLoading: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      state.notifications.unshift(notification);
      
      // Update unread counts
      if (!notification.isRead) {
        if (notification.type === 'message') {
          state.unreadCounts.messages++;
        } else if (notification.type === 'alert') {
          state.unreadCounts.alerts++;
        } else if (notification.type === 'setting') {
          state.unreadCounts.settings++;
        }
      }
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        
        // Update unread counts
        if (notification.type === 'message') {
          state.unreadCounts.messages = Math.max(0, state.unreadCounts.messages - 1);
        } else if (notification.type === 'alert') {
          state.unreadCounts.alerts = Math.max(0, state.unreadCounts.alerts - 1);
        } else if (notification.type === 'setting') {
          state.unreadCounts.settings = Math.max(0, state.unreadCounts.settings - 1);
        }
      }
    },
    markAllAsRead: (state, action) => {
      const type = action.payload;
      state.notifications
        .filter(n => n.type === type && !n.isRead)
        .forEach(n => n.isRead = true);
      
      if (type === 'message') {
        state.unreadCounts.messages = 0;
      } else if (type === 'alert') {
        state.unreadCounts.alerts = 0;
      } else if (type === 'setting') {
        state.unreadCounts.settings = 0;
      }
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;