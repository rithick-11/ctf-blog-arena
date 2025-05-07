
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../lib/data';
import SearchBar from './SearchBar';
import { Shield, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-card text-card-foreground p-4 shadow-md border-b border-primary/30">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center">
            <Shield className="mr-2" size={24} />
            <span>CTF Blog</span>
            <span className="text-primary blink ml-1">_</span>
          </Link>
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link to={`/profile/${currentUser.id}`} className="flex items-center hover:text-primary transition-colors">
                <User className="mr-1" size={18} />
                {currentUser.username}
              </Link>
              {currentUser.isAdmin && (
                <Link to="/admin" className="text-secondary hover:text-secondary/80 transition-colors">
                  Admin Panel
                </Link>
              )}
              <button 
                onClick={handleLogout} 
                className="flex items-center text-destructive hover:text-destructive/80 transition-colors"
              >
                <LogOut className="mr-1" size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
              <Link to="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="md:hidden mt-4">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
