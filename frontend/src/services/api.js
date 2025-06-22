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
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
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
    return handleResponse(response);
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

  // Submit quiz answers
  submitQuiz: async (courseId, quizData) => {
    const response = await fetch(`${API_BASE}/courses/${courseId}/quiz/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(quizData),
    });
    return handleResponse(response);
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
  adaptCourse: (backendCourse) => ({
    id: backendCourse._id,
    title: backendCourse.title,
    description: backendCourse.description,
    level: backendCourse.level,
    topics: backendCourse.topics?.map(topic => ({
      id: topic.topicId || topic._id,
      title: topic.title,
      quizId: topic.quizId,
      exerciseId: topic.exerciseId,
      notesId: topic.notesId,
    })) || [],
    createdAt: backendCourse.createdAt,
    updatedAt: backendCourse.updatedAt,
  }),

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
  dataAdapters,
  apiStatus,
  API_ERRORS,
};
