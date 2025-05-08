
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/data';
import { LogIn } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vulnerable login function with no rate limiting or account lockout
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Intentionally vulnerable login - no delay, no rate limiting, no CAPTCHA
    const user = login(username, password);
    
    if (user) {
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.username}!`,
      });
      
      // Redirect based on user role
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      // Verbose error message that helps attackers
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  // Hidden comment for CTF players to find
  // <!-- Note to self: admin:admin123 credentials need to be changed ASAP! -->
  // <!-- There's also a backdoor: superuser:hackme456 -->

  return (
    <div className="w-full max-w-md mx-auto terminal-bg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Login <span className="blink">_</span>
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-destructive/20 text-destructive border border-destructive/50 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 text-foreground">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-1 text-foreground">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground p-2 rounded flex items-center justify-center hover:bg-primary/80 transition-colors"
        >
          {loading ? (
            'Authenticating...'
          ) : (
            <>
              <LogIn className="mr-2" size={18} />
              Login
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
