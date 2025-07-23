import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [
    {
      id: '1',
      title: 'The Adventure Begins',
      author: 'John Writer',
      cover: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'An exciting adventure story for young readers',
      pages: 120,
      isDownloaded: true,
      isLiked: false,
      category: 'Adventure',
      rating: 4.5,
      size: '2.1 MB'
    }
  ],
  totalBooks: 24,
  isJoining: false,
  isLiked: false,
  downloadProgress: 0,
  isDownloading: false,
  lastUpdated: '2 hours ago',
  totalSize: '45.2 MB',
  cloudSyncEnabled: true,
  error: null,
};

const storyBooksSlice = createSlice({
  name: 'storyBooks',
  initialState,
  reducers: {
    startJoining: (state) => {
      state.isJoining = true;
    },
    finishJoining: (state) => {
      state.isJoining = false;
    },
    toggleLike: (state) => {
      state.isLiked = !state.isLiked;
    },
    startDownload: (state) => {
      state.isDownloading = true;
      state.downloadProgress = 0;
    },
    updateDownloadProgress: (state, action) => {
      state.downloadProgress = action.payload;
    },
    finishDownload: (state) => {
      state.isDownloading = false;
      state.downloadProgress = 100;
    },
  },
});

export const {
  startJoining,
  finishJoining,
  toggleLike,
  startDownload,
  updateDownloadProgress,
  finishDownload,
} = storyBooksSlice.actions;

export default storyBooksSlice.reducer;