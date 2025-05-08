
import { useState } from 'react';
import { getPosts, deletePost } from '@/lib/data';
import { FileText, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostsTabProps {
  users: any[];
  onDeletePost: (id: number) => void;
}

const PostsTab = ({ users, onDeletePost }: PostsTabProps) => {
  const [posts, setPosts] = useState(getPosts());
  const { toast } = useToast();

  const handleDeletePost = (id: number) => {
    if (deletePost(id)) {
      setPosts(getPosts());
      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted.",
      });
      onDeletePost(id); // Notify parent component
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full terminal-bg rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-border hover:bg-muted/20">
              <td className="p-4">{post.id}</td>
              <td className="p-4">{post.title}</td>
              <td className="p-4">
                {users.find((u) => u.id === post.authorId)?.username || 'Unknown'}
              </td>
              <td className="p-4">{post.date}</td>
              <td className="p-4 text-right">
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-destructive hover:text-destructive/80 p-1"
                  title="Delete post"
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTab;
