
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getCurrentUser } from '../lib/data';
import Navbar from '../components/Navbar';
import BlogPost from '../components/BlogPost';
import { Plus } from 'lucide-react';

const Index = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Get all posts
    setPosts(getPosts());
    setCurrentUser(getCurrentUser());
    
    // Hidden flag in the DOM for those who inspect
    const comment = document.createComment('CTF{fr0nt3nd_s0urc3_1s_n3v3r_s4f3}');
    document.body.appendChild(comment);
  }, []);

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-primary">CTF Blog Platform</h1>
            <p className="text-muted-foreground">
              Welcome to our totally secure blog platform! Nothing to see here...
            </p>
          </div>
          
          {currentUser && (
            <div className="mt-4 md:mt-0">
              <Link
                to="/create-post"
                className="bg-primary text-primary-foreground px-4 py-2 rounded flex items-center hover:bg-primary/80 transition-colors inline-flex"
              >
                <Plus size={18} className="mr-2" />
                Create Post
              </Link>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
