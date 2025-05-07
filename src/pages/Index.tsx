
import { useEffect, useState } from 'react';
import { getPosts } from '../lib/data';
import Navbar from '../components/Navbar';
import BlogPost from '../components/BlogPost';

const Index = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // Get all posts
    setPosts(getPosts());
    
    // Hidden flag in the DOM for those who inspect
    const comment = document.createComment('CTF{fr0nt3nd_s0urc3_1s_n3v3r_s4f3}');
    document.body.appendChild(comment);
  }, []);

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">CTF Blog Platform</h1>
          <p className="text-muted-foreground">
            Welcome to our totally secure blog platform! Nothing to see here...
          </p>
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
