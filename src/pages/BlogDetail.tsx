
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BlogPost from '../components/BlogPost';
import Comment from '../components/Comment';
import { getPost, getPostComments, getCurrentUser, addComment } from '../lib/data';
import { useToast } from '../hooks/use-toast';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const postId = Number(id);
    if (isNaN(postId)) {
      navigate('/');
      return;
    }

    const fetchedPost = getPost(postId);
    if (!fetchedPost) {
      navigate('/');
      return;
    }

    setPost(fetchedPost);
    setComments(getPostComments(postId));
    setCurrentUser(getCurrentUser());
  }, [id, navigate]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to comment on posts",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (newComment.trim() === '') return;
    
    const comment = addComment({
      postId: Number(id),
      userId: currentUser.id,
      content: newComment, // Intentionally vulnerable to XSS
    });
    
    setComments([...comments, comment]);
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been published"
    });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <BlogPost {...post} preview={false} />
        
        <div className="mt-8 terminal-bg p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-primary">
            Comments ({comments.length})
          </h2>
          
          {comments.length === 0 ? (
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Comment key={comment.id} {...comment} />
              ))}
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Leave a comment</h3>
            {currentUser ? (
              <form onSubmit={handleSubmitComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 border border-border bg-background text-foreground rounded focus:outline-none focus:border-primary h-24"
                  placeholder="Your comment..."
                  required
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition-colors"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 border border-border rounded bg-muted/20">
                <p className="text-center">
                  Please{' '}
                  <a href="/login" className="text-primary hover:underline">
                    log in
                  </a>{' '}
                  to leave a comment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
