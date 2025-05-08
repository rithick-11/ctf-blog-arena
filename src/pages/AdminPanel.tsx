
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUsers, getPosts } from '../lib/data';
import Navbar from '../components/Navbar';
import { Shield, User, FileText, Plus } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import PostsTab from '../components/admin/PostsTab';
import UsersTab from '../components/admin/UsersTab';
import NewPostForm from '../components/admin/NewPostForm';

const AdminPanel = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
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

  const handlePostCreated = (post: any) => {
    setPosts([...posts, post]);
    setShowNewPostForm(false);
  };

  const handleDeletePost = () => {
    // Refresh the posts list
    setPosts(getPosts());
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
          <NewPostForm 
            currentUser={currentUser}
            onPostCreated={handlePostCreated}
            onCancel={() => setShowNewPostForm(false)}
          />
        )}
        
        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <PostsTab users={users} onDeletePost={handleDeletePost} />
        )}
        
        {/* Users Tab - This now shows all registered users */}
        {activeTab === 'users' && (
          <UsersTab users={users} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
