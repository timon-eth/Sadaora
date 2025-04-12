const apiUrl = 'http://172.86.113.102:5003/api';

const apiService = {
  // Auth endpoints
  login: async (email, password) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return await response.json();
  },

  register: async (email, password, name) => {
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return await response.json();
  },

  // Profile endpoints
  getProfile: async (token) => {
    const response = await fetch(`${apiUrl}/profile/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return await response.json();
  },

  updateProfile: async (token, data) => {
    const response = await fetch(`${apiUrl}/profile/me`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    return await response.json();
  },

  deleteProfile: async (token) => {
    const response = await fetch(`${apiUrl}/profile/me`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to delete profile');
    }
    return await response.json();
  },

  // Feed endpoints
  getFeed: async (token, pageNum, interestsFilter = '') => {
    const endpoint = interestsFilter
      ? `${apiUrl}/feed/filter?page=${pageNum}&interests=${interestsFilter}`
      : `${apiUrl}/feed?page=${pageNum}`;
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch feed');
    }
    return await response.json();
  },

  // Follow endpoints
  getFollowStatus: async (token, profileId) => {
    const response = await fetch(`${apiUrl}/profile/${profileId}/follow`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to get follow status');
    }
    return await response.json();
  },

  followUser: async (token, profileId) => {
    const response = await fetch(`${apiUrl}/profile/${profileId}/follow`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to follow user');
    }
    return await response.json();
  },

  unfollowUser: async (token, profileId) => {
    const response = await fetch(`${apiUrl}/profile/${profileId}/follow`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to unfollow user');
    }
    return await response.json();
  },

  // Post endpoints
  createPost: async (token, content, imageUrl) => {
    const response = await fetch(`${apiUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, imageUrl }),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return await response.json();
  },

  getPosts: async (token, pageNum) => {
    const response = await fetch(`${apiUrl}/posts?page=${pageNum}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to get posts');
    }
    return await response.json();
  },

  // Like endpoints
  likePost: async (token, postId) => {
    const response = await fetch(`${apiUrl}/posts/${postId}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to like post');
    }
    return await response.json();
  },

  unlikePost: async (token, postId) => {
    const response = await fetch(`${apiUrl}/posts/${postId}/like`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to unlike post');
    }
    return await response.json();
  },
};

export default apiService;
