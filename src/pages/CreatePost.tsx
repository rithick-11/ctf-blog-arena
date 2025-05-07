
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, addPost } from '../lib/data';
import Navbar from '../components/Navbar';
import { FileText, Plus } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const CreatePost = () => {
  const [newPost, setNewPost] = useState({ title: '', content: '', imageUrl: '' });
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
  }

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentUser) {
      const post = addPost({
        title: newPost.title,
        content: newPost.content,
        authorId: currentUser.id,
        imageUrl: newPost.imageUrl || undefined,
      });
      
      toast({
        title: "Post created",
        description: "Your new post has been published.",
      });
      
      navigate(`/post/${post.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-primary flex items-center">
            <FileText className="mr-2" size={24} />
            Create New Post
          </h1>
          <p className="text-muted-foreground">
            Share your thoughts with the community
          </p>
        </div>
        
        <div className="terminal-bg p-6 rounded-lg max-w-2xl mx-auto">
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1 font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary"
                required
                placeholder="Enter a catchy title for your post"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block mb-1 font-medium">
                Content
              </label>
              <textarea
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary h-64"
                required
                placeholder="Write your blog post content here. HTML tags are allowed for formatting!"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can use HTML tags to format your post. <span className="text-destructive">Warning: No validation is performed!</span>
              </p>
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block mb-1 font-medium">
                Cover Image URL (optional)
              </label>
              <input
                type="text"
                id="imageUrl"
                value={newPost.imageUrl}
                onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                className="w-full p-2 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 border border-border text-foreground rounded hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-colors flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
