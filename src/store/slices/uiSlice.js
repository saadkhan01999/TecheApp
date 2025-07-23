import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMenuItem: 'courses',
  isMobileMenuOpen: false,
  expandedCourses: true,
  searchQuery: '',
  isSearchFocused: false,
  theme: 'light',
  sidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveMenuItem: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleExpandedCourses: (state) => {
      state.expandedCourses = !state.expandedCourses;
    },
    setExpandedCourses: (state, action) => {
      state.expandedCourses = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchFocused: (state, action) => {
      state.isSearchFocused = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const {
  setActiveMenuItem,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleExpandedCourses,
  setExpandedCourses,
  setSearchQuery,
  setSearchFocused,
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
} = uiSlice.actions;

export default uiSlice.reducer;