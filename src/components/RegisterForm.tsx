
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../lib/data';
import { UserPlus } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Intentionally vulnerable registration
    setTimeout(() => {
      const user = register(username, password, email);
      
      if (user) {
        toast({
          title: "Registration successful",
          description: "You can now log in with your credentials",
        });
        navigate('/login');
      } else {
        setError('Username already taken');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto terminal-bg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Register <span className="blink">_</span>
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
          <label htmlFor="email" className="block mb-1 text-foreground">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            'Creating account...'
          ) : (
            <>
              <UserPlus className="mr-2" size={18} />
              Register
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
