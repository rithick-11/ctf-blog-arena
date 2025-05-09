
// THIS IS INTENTIONALLY VULNERABLE CODE FOR A CTF CHALLENGE
// DO NOT USE THIS IN PRODUCTION

interface User {
  id: number;
  username: string;
  password: string; // plaintext password - VULNERABLE!
  email: string;
  isAdmin: boolean;
  token?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  date: string;
  imageUrl?: string;
}

interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  date: string;
}

// Intentionally vulnerable data store
export const users: User[] = [
  {
    id: 14789632,
    username: 'admin',
    password: 'Shadowadmin2025', // Very weak password - VULNERABLE!
    email: 'admin@ctfblog.com',
    isAdmin: true,
  },
  {
    id: 21478963,
    username: 'user1',
    password: 'pa$$w0rd123',
    email: 'user1@example.com',
    isAdmin: false,
  },
  {
    id: 32147896,
    username: 'user2',
    password: 'qwerty!@#',
    email: 'user2@example.com',
    isAdmin: false,
  },
];

export const posts: Post[] = [
  {
    id: 1,
    title: 'Welcome to CTF Blog',
    content: 'This is the first post on our vulnerable blog platform. Can you find the secrets?',
    authorId: 14789632,
    date: '2023-05-01',
    imageUrl: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'Security Through Obscurity',
    content: 'We\'ve hidden some important information in the page source. No one will ever look there!',
    authorId: 14789632,
    date: '2023-05-05',
    imageUrl: 'https://images.unsplash.com/photo-1593073862407-a02d6ca2ac1e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'My First Post',
    content: 'Hello everyone! I\'m new here and excited to share my thoughts.',
    authorId: 21478963,
    date: '2023-05-10',
    imageUrl: 'https://images.unsplash.com/photo-1519499845530-629d44771de7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'Web Security Basics',
    content: 'Today we\'ll talk about basic web security principles that everyone should know.',
    authorId: 14789632,
    date: '2023-05-15',
    imageUrl: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
];

export const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    userId: 21478963,
    content: 'Great first post!',
    date: '2023-05-01',
  },
  {
    id: 2,
    postId: 1,
    userId: 32147896,
    content: 'Looking forward to more content.',
    date: '2023-05-02',
  },
  {
    id: 3,
    postId: 2,
    userId: 21478963,
    content: 'Interesting approach to security...',
    date: '2023-05-06',
  },
];

// VULNERABLE authentication function - no hashing, simple token generation
export const login = (username: string, password: string) => {
  // Intentionally vulnerable - sql injection sim
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Generate a simple token (vulnerable)
    user.token = btoa(`${user.username}:${user.id}:${user.isAdmin}`);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

// VULNERABLE - allows any user data to be changed
export const updateUser = (userId: number, data: Partial<User>) => {
  const index = users.findIndex(u => u.id === userId);
  if (index >= 0) {
    users[index] = { ...users[index], ...data };
    // Update localStorage if this is the current user
    if (getCurrentUser()?.id === userId) {
      localStorage.setItem('currentUser', JSON.stringify(users[index]));
    }
    return users[index];
  }
  return null;
};

export const getUsers = () => {
  return users;
};

export const getPosts = () => {
  return posts;
};

export const getPost = (id: number) => {
  return posts.find(p => p.id === id);
};

export const getPostComments = (postId: number) => {
  return comments.filter(c => c.postId === postId);
};

export const getUserById = (id: number) => {
  return users.find(u => u.id === id);
};

export const addPost = (post: Omit<Post, 'id' | 'date'>) => {
  const newPost: Post = {
    ...post,
    id: posts.length + 1,
    date: new Date().toISOString().split('T')[0],
  };
  posts.push(newPost);
  return newPost;
};

export const addComment = (comment: Omit<Comment, 'id' | 'date'>) => {
  const newComment: Comment = {
    ...comment,
    id: comments.length + 1,
    date: new Date().toISOString().split('T')[0],
  };
  comments.push(newComment);
  return newComment;
};

export const deletePost = (id: number) => {
  const index = posts.findIndex(p => p.id === id);
  if (index >= 0) {
    posts.splice(index, 1);
    return true;
  }
  return false;
};

export const register = (username: string, password: string, email: string) => {
  // Check if username already exists
  if (users.some(u => u.username === username)) {
    return null;
  }
  
  const newUser: User = {
    id: users.length + 1,
    username,
    password, // Intentionally stored in plaintext - VULNERABLE!
    email,
    isAdmin: false,
  };
  
  users.push(newUser);
  return newUser;
};
