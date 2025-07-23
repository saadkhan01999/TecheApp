import React from 'react';
import { Cloud, BookOpen, Download, Share2, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  startJoining,
  finishJoining,
  toggleLike,
  startDownload,
  updateDownloadProgress,
  finishDownload
} from '../store/slices/storyBooksSlice';

const StoryBooks = () => {
  const dispatch = useAppDispatch();
  const {
    totalBooks,
    isJoining,
    isLiked,
    downloadProgress,
    isDownloading,
    lastUpdated,
    totalSize,
    cloudSyncEnabled
  } = useAppSelector(state => state.storyBooks);

  const handleJoin = () => {
    dispatch(startJoining());
    setTimeout(() => {
      dispatch(finishJoining());
      console.log('Joined Story Books session');
    }, 2000);
  };

  const handleSkip = () => {
    console.log('Skipped Story Books session');
  };

  const handleDownload = () => {
    dispatch(startDownload());
    
    const interval = setInterval(() => {
      dispatch(updateDownloadProgress(Math.min(downloadProgress + 10, 100)));
      
      if (downloadProgress >= 90) {
        clearInterval(interval);
        setTimeout(() => {
          dispatch(finishDownload());
        }, 200);
      }
    }, 200);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Story Books Collection',
          text: 'Check out this amazing story books collection!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  };

  const handleToggleLike = () => {
    dispatch(toggleLike());
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Story Books</h2>
        <div className="flex items-center space-x-2">
          <Cloud className={`w-5 h-5 sm:w-6 sm:h-6 ${cloudSyncEnabled ? 'text-red-500' : 'text-gray-400'}`} />
          <span className="text-xs text-gray-500 hidden sm:inline">
            {cloudSyncEnabled ? 'Cloud Sync' : 'Offline'}
          </span>
        </div>
      </div>
      
      <div className="relative mb-4">
        <img
          src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
          alt="Story books"
          className="w-full h-32 sm:h-40 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
        
        {/* Overlay content */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleToggleLike}
            className={`p-2 rounded-full transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white/80 text-gray-700 rounded-full hover:bg-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">{totalBooks} Books Available</span>
        </div>
      </div>

      {/* Download Progress */}
      {isDownloading && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Downloading...</span>
            <span className="text-sm text-gray-600">{downloadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button 
            onClick={handleJoin}
            disabled={isJoining}
            className="flex items-center justify-center space-x-2 bg-red-500 text-white px-4 sm:px-6 py-2 rounded-xl font-semibold hover:bg-red-600 disabled:bg-red-300 transition-colors text-sm w-full sm:w-auto"
          >
            {isJoining ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Joining...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                <span>Join</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center space-x-2 border border-red-500 text-red-500 px-4 py-2 rounded-xl font-semibold hover:bg-red-50 disabled:opacity-50 transition-colors text-sm w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
        
        <button 
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-700 font-semibold transition-colors text-sm"
        >
          Skip
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Last updated: {lastUpdated}</span>
          <span>Size: {totalSize}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryBooks;