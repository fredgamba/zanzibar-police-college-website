<<<<<<< HEAD
// Mock API service for development
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Sample data
const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'Administrator', is_active: true },
  { id: 2, username: 'editor', email: 'editor@example.com', role: 'Editor', is_active: true },
  { id: 3, username: 'viewer', email: 'viewer@example.com', role: 'Viewer', is_active: true },
];

const mockPosts = [
  {
    id: 1,
    title: 'Welcome to Police Academy',
    content: '<p>Welcome to Dar es Salaam Police Academy</p>',
    excerpt: 'Welcome message for new students',
    post_type: 'news',
    is_published: true,
    created_at: new Date().toISOString(),
    author: 'Admin',
  },
  {
    id: 2,
    title: 'Important Announcement',
    content: '<p>Important information for all students</p>',
    excerpt: 'Please read this important announcement',
    post_type: 'announcement',
    is_published: true,
    created_at: new Date().toISOString(),
    author: 'Admin',
  },
];

const mockContact = {
  id: 1,
  address: 'Dar es Salaam Police Academy, Tanzania',
  phone: '+255 22 123 4567',
  email: 'info@dpa.ac.tz',
  working_hours: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM',
  map_embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15859.293119189995!2d39.208443!3d-6.792999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDcnMzQuOCJTIDM5wrAxMiczMC40IkU!5e0!3m2!1sen!2stz!4v1633081600000!5m2!1sen!2stz" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
  additional_info: 'For emergencies, call our 24/7 hotline.',
};

export const mockApiService = {
  // Users
  getUsers: async () => {
    await delay(500);
    return { data: mockUsers };
  },

  // Posts
  getPosts: async () => {
    await delay(500);
    return { data: mockPosts };
  },

  // Contact
  getContact: async () => {
    await delay(300);
    return { data: mockContact };
  },

  // Create post
  createPost: async (data) => {
    await delay(800);
    console.log('Mock: Creating post', data);
    const newPost = {
      ...data,
      id: Date.now(),
      created_at: new Date().toISOString(),
      author: 'Current User',
    };
    mockPosts.unshift(newPost);
    return { data: newPost };
  },

  // Update contact
  updateContact: async (id, data) => {
    await delay(600);
    console.log('Mock: Updating contact', data);
    Object.assign(mockContact, data);
    return { data: mockContact };
  },
};

// Check if we should use mock API
export const shouldUseMockApi = () => {
  return process.env.NODE_ENV === 'development';
};
=======
// Mock API service for development
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Sample data
const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'Administrator', is_active: true },
  { id: 2, username: 'editor', email: 'editor@example.com', role: 'Editor', is_active: true },
  { id: 3, username: 'viewer', email: 'viewer@example.com', role: 'Viewer', is_active: true },
];

const mockPosts = [
  {
    id: 1,
    title: 'Welcome to Police Academy',
    content: '<p>Welcome to Dar es Salaam Police Academy</p>',
    excerpt: 'Welcome message for new students',
    post_type: 'news',
    is_published: true,
    created_at: new Date().toISOString(),
    author: 'Admin',
  },
  {
    id: 2,
    title: 'Important Announcement',
    content: '<p>Important information for all students</p>',
    excerpt: 'Please read this important announcement',
    post_type: 'announcement',
    is_published: true,
    created_at: new Date().toISOString(),
    author: 'Admin',
  },
];

const mockContact = {
  id: 1,
  address: 'Dar es Salaam Police Academy, Tanzania',
  phone: '+255 22 123 4567',
  email: 'info@dpa.ac.tz',
  working_hours: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM',
  map_embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15859.293119189995!2d39.208443!3d-6.792999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDcnMzQuOCJTIDM5wrAxMiczMC40IkU!5e0!3m2!1sen!2stz!4v1633081600000!5m2!1sen!2stz" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
  additional_info: 'For emergencies, call our 24/7 hotline.',
};

export const mockApiService = {
  // Users
  getUsers: async () => {
    await delay(500);
    return { data: mockUsers };
  },

  // Posts
  getPosts: async () => {
    await delay(500);
    return { data: mockPosts };
  },

  // Contact
  getContact: async () => {
    await delay(300);
    return { data: mockContact };
  },

  // Create post
  createPost: async (data) => {
    await delay(800);
    console.log('Mock: Creating post', data);
    const newPost = {
      ...data,
      id: Date.now(),
      created_at: new Date().toISOString(),
      author: 'Current User',
    };
    mockPosts.unshift(newPost);
    return { data: newPost };
  },

  // Update contact
  updateContact: async (id, data) => {
    await delay(600);
    console.log('Mock: Updating contact', data);
    Object.assign(mockContact, data);
    return { data: mockContact };
  },
};

// Check if we should use mock API
export const shouldUseMockApi = () => {
  return process.env.NODE_ENV === 'development';
};
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
