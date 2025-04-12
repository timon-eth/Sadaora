import axios from 'axios';
const apiURL = import.meta.env.VITE_API_BASE_URL || 'https://172.86.113.102/api';

const apiService = {
  // Auth endpoints
  login: async (email, password) => {
    return await axios.post(`${apiURL}/auth/login`, {
      email,
      password,
    });
  },

  register: async (email, password, name) => {
    return await axios.post(`${apiURL}/auth/signup`, {
      email,
      password,
      name,
    });
  },

  // Profile endpoints
  getProfile: async (token) => {
    return await axios.get(`${apiURL}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  updateProfile: async (token, data) => {
    return await axios.put(
      `${apiURL}/profile/me`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  deleteProfile: async (token) => {
    return await axios.delete(`${apiURL}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Feed endpoints
  getFeed: async (token, pageNum, interestsFilter = '') => {
    const endpoint = interestsFilter 
      ? `${apiURL}/feed/filter?page=${pageNum}&interests=${interestsFilter}`
      : `${apiURL}/feed?page=${pageNum}`;

    return await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Follow endpoints
  getFollowStatus: async (token, profileId) => {
    return await axios.get(`${apiURL}/profile/${profileId}/follow`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  followUser: async (token, profileId) => {
    return await axios.post(
      `${apiURL}/profile/${profileId}/follow`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  unfollowUser: async (token, profileId) => {
    return await axios.delete(`${apiURL}/profile/${profileId}/follow`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Post endpoints
  createPost: async (token, content, imageUrl) => {
    return await axios.post(
      `${apiURL}/posts`,
      { content, imageUrl },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  getPosts: async (token, pageNum) => {
    return await axios.get(`${apiURL}/posts?page=${pageNum}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Like endpoints
  likePost: async (token, postId) => {
    return await axios.post(
      `${apiURL}/posts/${postId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  unlikePost: async (token, postId) => {
    return await axios.delete(`${apiURL}/posts/${postId}/like`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default apiService; 