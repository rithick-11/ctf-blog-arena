
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserById, getCurrentUser, updateUser } from '../lib/data';
import { useToast } from '../hooks/use-toast';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userId = Number(id);
    if (isNaN(userId)) {
      navigate('/');
      return;
    }

    const fetchedUser = getUserById(userId);
    if (!fetchedUser) {
      navigate('/');
      return;
    }

    setUser(fetchedUser);
    setFormData({
      username: fetchedUser.username,
      email: fetchedUser.email,
      password: fetchedUser.password,
    });

    setCurrentUser(getCurrentUser());
  }, [id, navigate]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Intentionally vulnerable - allows anyone to update any profile
    // In a real CTF, this would be a privilege escalation vulnerability
    const updatedUser = updateUser(Number(id), {
      username: formData.username,
      email: formData.email, 
      password: formData.password,
    });
    
    if (updatedUser) {
      setUser(updatedUser);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const canEdit = currentUser && (currentUser.id === user.id || currentUser.isAdmin);

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="terminal-bg p-8 rounded-lg max-w-2xl mx-auto">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold mb-4 text-primary">
              {user.username}'s Profile
            </h1>
            
            {canEdit && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/80 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
          
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-border text-foreground rounded hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Username</p>
                  <p className="font-mono">{user.username}</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-mono">{user.email}</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">Role</p>
                  <p>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.isAdmin
                          ? 'bg-secondary/20 text-secondary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {user.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </p>
                </div>
                
                {currentUser && (currentUser.id === user.id || currentUser.isAdmin) && (
                  <div className="md:col-span-2">
                    <p className="text-muted-foreground">Password</p>
                    <p className="font-mono">{user.password}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
