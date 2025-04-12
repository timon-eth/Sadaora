import axios from 'axios';

const apiService = {
  // Auth endpoints
  login: async (email, password) => {
    return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      email,
      password,
    });
  },

  register: async (email, password, name) => {
    return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
      email,
      password,
      name,
    });
  },

  // Profile endpoints
  getProfile: async (token) => {
    return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  updateProfile: async (token, data) => {
    return await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/profile/me`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  deleteProfile: async (token) => {
    return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Feed endpoints
  getFeed: async (token, pageNum, interestsFilter = '') => {
    const endpoint = interestsFilter 
      ? `${import.meta.env.VITE_API_BASE_URL}/feed/filter?page=${pageNum}&interests=${interestsFilter}`
      : `${import.meta.env.VITE_API_BASE_URL}/feed?page=${pageNum}`;

    return await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Follow endpoints
  getFollowStatus: async (token, profileId) => {
    return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/${profileId}/follow`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  followUser: async (token, profileId) => {
    return await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/profile/${profileId}/follow`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  unfollowUser: async (token, profileId) => {
    return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/profile/${profileId}/follow`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Post endpoints
  createPost: async (token, content, imageUrl) => {
    return await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/posts`,
      { content, imageUrl },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  getPosts: async (token, pageNum) => {
    return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts?page=${pageNum}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Like endpoints
  likePost: async (token, postId) => {
    return await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  unlikePost: async (token, postId) => {
    return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/like`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default apiService; 