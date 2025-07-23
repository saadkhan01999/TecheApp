import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentMeeting: {
    id: 'location-4',
    title: 'Location N°4',
    date: 'July 24, 2024',
    time: '09:00-10:00',
    duration: '1 hour',
    link: 'googlemeet/?call=Sam',
    participants: [
      { id: '1', name: 'John', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', isOnline: true },
      { id: '2', name: 'Sarah', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', isOnline: true },
      { id: '3', name: 'Mike', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', isOnline: false },
      { id: '4', name: 'Emma', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', isOnline: true },
    ],
    totalParticipants: 16,
    videoSettings: 'Everyone',
    isLive: true,
    isJoining: false,
  },
  upcomingMeetings: [],
  pastMeetings: [],
  isLoading: false,
  error: null,
};

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    startJoiningMeeting: (state, action) => {
      const meetingId = action.payload;
      if (state.currentMeeting.id === meetingId) {
        state.currentMeeting.isJoining = true;
      }
    },
    finishJoiningMeeting: (state, action) => {
      const meetingId = action.payload;
      if (state.currentMeeting.id === meetingId) {
        state.currentMeeting.isJoining = false;
      }
    },
    setMeetingLive: (state, action) => {
      const { meetingId, isLive } = action.payload;
      if (state.currentMeeting.id === meetingId) {
        state.currentMeeting.isLive = isLive;
      }
    },
  },
});

export const {
  startJoiningMeeting,
  finishJoiningMeeting,
  setMeetingLive,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;