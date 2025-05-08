
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addPost } from '@/lib/data';

interface NewPostFormProps {
  currentUser: any;
  onPostCreated: (post: any) => void;
  onCancel: () => void;
}

const NewPostForm = ({ currentUser, onPostCreated, onCancel }: NewPostFormProps) => {
  const [newPost, setNewPost] = useState({ title: '', content: '', imageUrl: '' });
  const { toast } = useToast();

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const post = addPost({
        title: newPost.title,
        content: newPost.content,
        authorId: currentUser.id,
        imageUrl: newPost.imageUrl || undefined,
      });
      
      onPostCreated(post);
      setNewPost({ title: '', content: '', imageUrl: '' });
      
      toast({
        title: "Post created",
        description: "Your new post has been published.",
      });
    }
  };

  return (
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
            onClick={onCancel}
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
  );
};

export default NewPostForm;
