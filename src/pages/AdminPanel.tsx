import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUsers, getPosts, deletePost, addPost } from '../lib/data';
import Navbar from '../components/Navbar';
import { Shield, User, FileText, Trash, Plus } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AdminPanel = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', imageUrl: '' });
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.isAdmin) {
      navigate('/login');
      return;
    }
    
    setCurrentUser(user);
    // Get fresh list of users to include newly registered ones
    setUsers(getUsers());
    setPosts(getPosts());
    
    // Hidden flag in HTML comment for source code reviewers
    // <!-- ADMIN FLAG: CTF{4dm1n_p4n3l_4cc3ss3d} -->
  }, [navigate]);

  const handleDeletePost = (id: number) => {
    if (deletePost(id)) {
      setPosts(getPosts());
      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted.",
      });
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const post = addPost({
        title: newPost.title,
        content: newPost.content,
        authorId: currentUser.id,
        imageUrl: newPost.imageUrl || undefined,
      });
      
      setPosts([...posts, post]);
      setNewPost({ title: '', content: '', imageUrl: '' });
      setShowNewPostForm(false);
      
      toast({
        title: "Post created",
        description: "Your new post has been published.",
      });
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary flex items-center">
              <Shield className="mr-2" size={24} />
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {currentUser.username}. Manage your blog platform here.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            {activeTab === 'posts' && (
              <button
                onClick={() => setShowNewPostForm(!showNewPostForm)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded flex items-center hover:bg-primary/80 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                New Post
              </button>
            )}
          </div>
        </div>
        
        {/* Tabs - Removed the Secrets tab */}
        <div className="flex mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 ${
              activeTab === 'posts'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText size={18} className="inline mr-2" />
            Posts
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 ${
              activeTab === 'users'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <User size={18} className="inline mr-2" />
            Users
          </button>
        </div>
        
        {/* New Post Form */}
        {showNewPostForm && (
          <div className="mb-8 terminal-bg p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-primary">Create New Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label htmlFor="title" className="block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary h-32"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  value={newPost.imageUrl}
                  onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                  className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostForm(false)}
                  className="px-4 py-2 border border-border text-foreground rounded hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-colors"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="overflow-x-auto">
            <table className="w-full terminal-bg rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Author</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-muted/20">
                    <td className="p-4">{post.id}</td>
                    <td className="p-4">{post.title}</td>
                    <td className="p-4">
                      {users.find((u) => u.id === post.authorId)?.username || 'Unknown'}
                    </td>
                    <td className="p-4">{post.date}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-destructive hover:text-destructive/80 p-1"
                        title="Delete post"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Users Tab - This now shows all registered users */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full terminal-bg rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Username</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Password</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/20">
                    <td className="p-4">{user.id}</td>
                    <td className="p-4">{user.username}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          user.isAdmin
                            ? 'bg-secondary/20 text-secondary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="p-4">
                      {/* Intentionally vulnerable - showing passwords */}
                      {user.password}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
