// UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [xp, setXp] = useState(0);
  const [recentExercises, setRecentExercises] = useState([]);
  const [progress, setProgress] = useState({
    courseProgress: 0,
    goalsProgress: 0,
  });
  const [activities, setActivities] = useState({});

  // Fetch user + dashboard data
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.user);
      setXp(data.xpPoints.totalXP);
      setRecentExercises(data.recentExercises);
      setProgress({
        courseProgress: data.courseProgress.progressPercent,
        goalsProgress: 40, // can be updated once backend supports it
      });
      setActivities(data.calendarActivity);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load user data');
      console.error('Error fetching user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update XP in backend and state
  const updateXp = async (newXp) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/xp/add', { xp: newXp }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setXp(newXp);
    } catch (err) {
      console.error('Error updating XP:', err);
    }
  };

  // Mark calendar activity
  const markActivity = async (date, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/progress/update-calender', { date, status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setActivities(prev => ({
        ...prev,
        [date]: status,
      }));
    } catch (err) {
      console.error('Error updating calendar activity:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const value = {
    user,
    isLoading,
    error,
    xp,
    recentExercises,
    progress,
    activities,
    updateXp,
    markActivity,
    refetchUserData: fetchUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};



// // UserContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   // User data state
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // User progress data
//   const [progress, setProgress] = useState({
//     courseProgress: 0,
//     goalsProgress: 0,
//   });

//   // XP points
//   const [xp, setXp] = useState(0);

//   // Recent exercises
//   const [recentExercises, setRecentExercises] = useState([]);

//   // Calendar activities
//   const [activities, setActivities] = useState({});

//   // Fetch user data
//   const fetchUserData = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       // Using mock data since backend isn't available
//       const mockData = {
//         user: {
//           firstName: "John",
//           lastName: "Doe",
//           email: "john@example.com"
//         },
//         xpPoints: {
//           totalXP: 1250
//         },
//         recentExercises: [
//           { id: 1, name: "React Basics", completed: true },
//           { id: 2, name: "State Management", completed: false }
//         ],
//         courseProgress: {
//           progressPercent: 65
//         },
//         calendarActivity: {
//           "2023-11-01": "completed",
//           "2023-11-02": "missed"
//         }
//       };

//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 800));

//       setUser(mockData.user);
//       setXp(mockData.xpPoints.totalXP);
//       setRecentExercises(mockData.recentExercises);
//       setProgress({
//         courseProgress: mockData.courseProgress.progressPercent,
//         goalsProgress: 40 // Default value
//       });
//       setActivities(mockData.calendarActivity);

//     } catch (err) {
//       setError(err.message || "Failed to load user data");
//       console.error("Error fetching user data:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   // Context value
//   const value = {
//     user,
//     isLoading,
//     error,
//     xp,
//     recentExercises,
//     progress,
//     activities,
//     updateXp: (newXp) => setXp(newXp),
//     markActivity: (date, status) => setActivities(prev => ({
//       ...prev,
//       [date]: status
//     })),
//     refetchUserData: fetchUserData // Allow manual refresh
//   };

//   return (
//     <UserContext.Provider value={value}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };
