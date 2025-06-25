// API Service Layer for TechLearn Solutions
// This handles all communication with the backend

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');

  // Also check for 'token' key as backup for legacy compatibility
  const backupToken = localStorage.getItem('token');

  const finalToken = token || backupToken;

  return {
    'Content-Type': 'application/json',
    ...(finalToken && { Authorization: `Bearer ${finalToken}` })
  };
};

// Authentication API
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },
};

// Course API
export const courseAPI = {
  // Get all courses
  getAllCourses: async () => {
    const response = await fetch(`${API_BASE}/courses`, {
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    // Backend returns { count, courses }, we need just the courses array
    return data.courses || [];
  },

  // Get specific course by ID
  getCourse: async (courseId) => {
    const response = await fetch(`${API_BASE}/courses/${courseId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get quiz for specific topic
  getQuiz: async (courseId, topicId) => {
    const response = await fetch(`${API_BASE}/courses/${courseId}/topics/${topicId}/quiz`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Submit quiz answers (legacy - for full quiz submission)
  submitQuiz: async (courseId, quizData) => {
    const response = await fetch(`${API_BASE}/courses/${courseId}/quiz/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(quizData),
    });
    return handleResponse(response);
  },

  // Submit individual quiz answer (new flow)
  submitQuizAnswer: async (courseId, topicId, questionId, selectedOption, quizId = null) => {
    try {
      let actualQuizId = quizId;

      // If quizId is not provided, try to get it from course data
      if (!actualQuizId) {
        console.log('Quiz ID not provided, fetching from course data...');
        const courseData = await courseAPI.getCourse(courseId);
        const topic = courseData.topics?.find(t => t._id === topicId);
        actualQuizId = topic?.quizId;

        if (!actualQuizId) {
          throw new Error('Quiz ID not found for this topic');
        }
      }

      console.log('Submitting quiz answer:', { courseId, quizId: actualQuizId, questionId, selectedOption });

      // Submit the answer with the correct quizId
      const response = await fetch(`${API_BASE}/courses/${courseId}/quiz/submit`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          quizId: actualQuizId,
          questionId,
          selectedOption
        }),
      });

      return handleResponse(response);
    } catch (error) {
      console.error('Error in submitQuizAnswer:', error);
      throw error;
    }
  },
};

// User Progress API
export const progressAPI = {
  // Get user progress
  getUserProgress: async (userId) => {
    const response = await fetch(`${API_BASE}/user-progress/${userId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Payment API
export const paymentAPI = {
  // Check eligibility for certification
  checkEligibility: async (userId, courseId) => {
    const response = await fetch(`${API_BASE}/certificate/${userId}/${courseId}/status`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Submit payment for certification
  payCertificateFee: async (paymentData) => {
    const response = await fetch(`${API_BASE}/certificate/pay`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(paymentData),
    });
    return handleResponse(response);
  },

  // Get all payments (admin only)
  getAllPayments: async () => {
    const response = await fetch(`${API_BASE}/certificate/payments`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Exercise API
export const exerciseAPI = {
  // Submit exercise
  submitExercise: async (courseId, exerciseId) => {
    const response = await fetch(`${API_BASE}/exercises/${courseId}/${exerciseId}/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Data Adapters - Transform backend data to frontend format
export const dataAdapters = {
  // Adapt course data from backend to frontend format
  adaptCourse: (backendCourse) => {
    // Default gradients and icons for different course types
    const getDefaultVisuals = (title) => {
      const titleLower = title.toLowerCase();
      if (titleLower.includes('javascript')) {
        return { gradient: 'from-yellow-400 via-orange-400 to-red-500', icon: '⚡' };
      } else if (titleLower.includes('python')) {
        return { gradient: 'from-blue-400 via-green-400 to-yellow-500', icon: '🐍' };
      } else if (titleLower.includes('java')) {
        return { gradient: 'from-red-500 via-orange-500 to-yellow-500', icon: '☕' };
      } else if (titleLower.includes('c++')) {
        return { gradient: 'from-blue-600 via-purple-600 to-blue-800', icon: '⚙️' };
      } else if (titleLower.includes('c ')) {
        return { gradient: 'from-gray-500 via-blue-500 to-gray-700', icon: '🔧' };
      } else {
        return { gradient: 'from-purple-500 via-pink-500 to-purple-600', icon: '📚' };
      }
    };

    const visuals = getDefaultVisuals(backendCourse.title);

    return {
      id: backendCourse._id,
      title: backendCourse.title,
      description: backendCourse.description || 'Learn programming concepts and build practical skills',
      level: backendCourse.level,
      gradient: visuals.gradient,
      icon: visuals.icon,
      price: "Free", // Default to free for now since backend doesn't have pricing
      difficulty: backendCourse.level, // Add difficulty alias for filtering
      topics: backendCourse.topics?.map(topic => ({
        id: topic.topicId || topic._id,
        title: topic.title,
        quizId: topic.quizId,
        exerciseId: topic.exerciseId,
        notesId: topic.notesId,
      })) || [],
      createdAt: backendCourse.createdAt,
      updatedAt: backendCourse.updatedAt,
    };
  },

  // Adapt quiz data from backend to frontend format
  adaptQuiz: (backendQuiz) => ({
    topic: backendQuiz.topic,
    questions: backendQuiz.questions?.map(question => ({
      id: question._id,
      question: question.question,
      options: question.options,
      correct: question.correctAnswer, // Transform property name
      explanation: question.explanation,
    })) || [],
  }),

  // Adapt user progress data
  adaptUserProgress: (backendProgress) => ({
    userId: backendProgress.userId,
    courseXP: Object.fromEntries(backendProgress.courseXP || new Map()),
    exerciseXP: Object.fromEntries(backendProgress.exerciseXP || new Map()),
    totalCourseXP: backendProgress.totalCourseXP || 0,
    totalExerciseXP: backendProgress.totalExerciseXP || 0,
    completedQuizzes: backendProgress.completedQuizzes || [],
    completedExercises: backendProgress.completedExercises || [],
  }),
};

// API Status checker
export const apiStatus = {
  // Check if backend is running
  checkHealth: async () => {
    try {
      const response = await fetch(`${API_BASE.replace('/api', '')}/`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  },
};

// Error types for better error handling
export const API_ERRORS = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
};

export default {
  authAPI,
  courseAPI,
  progressAPI,
  exerciseAPI,
  paymentAPI,
  dataAdapters,
  apiStatus,
  API_ERRORS,
};
