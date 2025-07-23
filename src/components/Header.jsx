import React from 'react';
import { Search, Bell, MessageCircle, Settings, Menu, X, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleMobileMenu, setSearchQuery, setSearchFocused } from '../store/slices/uiSlice';
import { setLanguage } from '../store/slices/authSlice';
import { markAllAsRead } from '../store/slices/notificationsSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen, searchQuery, isSearchFocused } = useAppSelector(state => state.ui);
  const { user } = useAppSelector(state => state.auth);
  const { unreadCounts } = useAppSelector(state => state.notifications);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleNotificationClick = (type) => {
    console.log(`${type} notification clicked`);
    dispatch(markAllAsRead(type === 'messages' ? 'message' : type === 'alerts' ? 'alert' : 'setting'));
  };

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language));
  };

  return (
    <header className="relative z-30 px-4 py-3 text-white bg-red-500 sm:px-6 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={() => dispatch(toggleMobileMenu())}
          className="p-2 transition-colors rounded-lg lg:hidden hover:bg-red-600"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Search bar */}
        <div className="flex items-center flex-1 max-w-2xl mx-4 sm:mx-8">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:w-5 sm:h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              onFocus={() => dispatch(setSearchFocused(true))}
              onBlur={() => dispatch(setSearchFocused(false))}
              placeholder="Search here"
              className={`w-full pl-8 sm:pl-10 pr-4 py-2 bg-white/20 rounded-lg placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base transition-all duration-200 ${
                isSearchFocused ? 'bg-white/30' : ''
              }`}
            />
          </form>
        </div>
        
        {/* Right side icons and profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notification icons */}
          <div className="items-center hidden space-x-3 sm:flex">
            <button
              onClick={() => handleNotificationClick('messages')}
              className="relative p-2 transition-colors rounded-lg hover:bg-red-600"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCounts.messages > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-semibold text-black bg-yellow-400 rounded-full -top-1 -right-1 sm:w-5 sm:h-5">
                  {unreadCounts.messages}
                </span>
              )}
            </button>
            
            <button
              onClick={() => handleNotificationClick('alerts')}
              className="relative p-2 transition-colors rounded-lg hover:bg-red-600"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCounts.alerts > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-semibold text-black bg-green-400 rounded-full -top-1 -right-1 sm:w-5 sm:h-5">
                  {unreadCounts.alerts}
                </span>
              )}
            </button>
            
            <button
              onClick={() => handleNotificationClick('settings')}
              className="relative p-2 transition-colors rounded-lg hover:bg-red-600"
            >
              <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCounts.settings > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-blue-400 rounded-full -top-1 -right-1 sm:w-5 sm:h-5">
                  {unreadCounts.settings}
                </span>
              )}
            </button>
          </div>
          
          {/* Profile section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 overflow-hidden bg-white rounded-full sm:w-10 sm:h-10">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="items-center hidden space-x-2 sm:flex">
              <span className="text-sm font-medium sm:text-base">{user?.name}</span>
              <div className="relative">
                <select 
                  value={user?.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="pr-4 text-xs font-medium bg-[#EF4444] border-none appearance-none cursor-pointer text-sm:text-sm focus:outline-nonebla"
                >
                  <option value="EN">EN</option>
                  <option value="FR">FR</option>
                  <option value="ES">ES</option>
                  <option value="DE">DE</option>
                  <option value="IT">IT</option>
                </select>
                <ChevronDown className="absolute right-0 w-3 h-3 transform -translate-y-1/2 pointer-events-none top-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;