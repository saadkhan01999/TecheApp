import React, { useState } from 'react';
import { Calendar, MapPin, Users, Video, Copy, ExternalLink, Clock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startJoiningMeeting, finishJoiningMeeting } from '../store/slices/meetingsSlice';

const LocationCard = () => {
  const dispatch = useAppDispatch();
  const { currentMeeting } = useAppSelector(state => state.meetings);
  const [copied, setCopied] = useState(false);

  const copyMeetingLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${currentMeeting.link}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const joinMeeting = () => {
    dispatch(startJoiningMeeting(currentMeeting.id));
    setTimeout(() => {
      dispatch(finishJoiningMeeting(currentMeeting.id));
      window.open(`https://${currentMeeting.link}`, '_blank');
    }, 1500);
  };

  const addToCalendar = () => {
    const event = {
      title: `${currentMeeting.title} Meeting`,
      start: '2024-07-24T09:00:00',
      end: '2024-07-24T10:00:00',
      description: 'Filmmaking course meeting'
    };
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.replace(/[-:]/g, '').replace('.000', '')}Z/${event.end.replace(/[-:]/g, '').replace('.000', '')}Z&details=${encodeURIComponent(event.description)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-red-500">{currentMeeting.title}</h2>
        <div className="flex items-center space-x-2">
          {currentMeeting.isLive && (
            <>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 hidden sm:inline">Live</span>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Date and Time */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-500">{currentMeeting.date}</p>
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-sm sm:text-base">{currentMeeting.time}</p>
              <button
                onClick={addToCalendar}
                className="text-purple-600 hover:text-purple-700 transition-colors"
                title="Add to calendar"
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Meeting Link */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm sm:text-base truncate">{currentMeeting.link}</p>
            <button
              onClick={copyMeetingLink}
              className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 transition-colors mt-1"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? 'Copied!' : 'Copy link'}</span>
            </button>
          </div>
        </div>
        
        {/* Video Settings */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <Video className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Accept Video</p>
            <p className="font-semibold text-sm sm:text-base">{currentMeeting.videoSettings}</p>
          </div>
        </div>
        
        {/* Participants */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1 sm:-space-x-2">
              {currentMeeting.participants.map((participant, index) => (
                <img
                  key={index}
                  src={participant.avatar}
                  alt={participant.name}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white hover:z-10 hover:scale-110 transition-transform cursor-pointer ${
                    participant.isOnline ? 'ring-2 ring-green-400' : 'opacity-60'
                  }`}
                  title={`${participant.name} ${participant.isOnline ? '(Online)' : '(Offline)'}`}
                />
              ))}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">+{currentMeeting.totalParticipants - currentMeeting.participants.length}</span>
              </div>
            </div>
            <span className="text-xs text-gray-500 ml-2">{currentMeeting.totalParticipants} participants</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={joinMeeting}
            disabled={currentMeeting.isJoining}
            className="flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 disabled:bg-red-300 transition-colors text-sm"
          >
            {currentMeeting.isJoining ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Joining...</span>
              </>
            ) : (
              <>
                <Video className="w-4 h-4" />
                <span>Join Meeting</span>
              </>
            )}
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm">
            Schedule Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;