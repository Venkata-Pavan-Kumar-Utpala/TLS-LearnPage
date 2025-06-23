import React, { useState, useEffect } from 'react';
import { Trophy, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const XPBadge = () => {
  const { user, isAuthenticated } = useAuth();
  const [totalXP, setTotalXP] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchXP = async () => {
      console.log('XPBadge: isAuthenticated =', isAuthenticated, 'user =', user);

      if (!isAuthenticated || !user?._id) {
        console.log('XPBadge: Not authenticated or no user ID');
        setLoading(false);
        return;
      }

      try {
        console.log('XPBadge: Fetching XP for user:', user._id);
        const response = await fetch(`/api/user-progress/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        console.log('XPBadge: Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('XPBadge: XP data received:', data);
          const total = (data.totalCourseXP || 0) + (data.totalExerciseXP || 0);
          setTotalXP(total);
        } else {
          console.log('XPBadge: Response not ok, setting XP to 0');
          // For new users with no progress, show 0 XP
          setTotalXP(0);
        }
      } catch (error) {
        console.error('XPBadge: Error fetching XP:', error);
        setTotalXP(0);
      } finally {
        setLoading(false);
      }
    };

    fetchXP();
  }, [isAuthenticated, user]);

  const getXPLevel = () => {
    if (totalXP >= 1000) return { level: 'Expert', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30', icon: Trophy };
    if (totalXP >= 500) return { level: 'Advanced', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30', icon: Star };
    if (totalXP >= 200) return { level: 'Intermediate', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30', icon: Star };
    return { level: 'Beginner', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30', icon: Trophy };
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse">
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    );
  }

  const levelInfo = getXPLevel();
  const Icon = levelInfo.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 ${levelInfo.bgColor} rounded-full transition-all duration-300 hover:scale-105`}>
      <Icon className={`w-4 h-4 ${levelInfo.color}`} />
      <span className={`text-sm font-medium ${levelInfo.color}`}>
        {totalXP} XP
      </span>
      <span className={`text-xs ${levelInfo.color} opacity-75`}>
        {levelInfo.level}
      </span>
    </div>
  );
};

export default XPBadge;
