
import { Link } from 'react-router-dom';
import { getUserById } from '../lib/data';
import { Calendar } from 'lucide-react';

interface BlogPostProps {
  id: number;
  title: string;
  content: string;
  authorId: number;
  date: string;
  imageUrl?: string;
  preview?: boolean;
}

const BlogPost = ({ id, title, content, authorId, date, imageUrl, preview = true }: BlogPostProps) => {
  const author = getUserById(authorId);
  const displayContent = preview ? `${content.substring(0, 150)}${content.length > 150 ? '...' : ''}` : content;

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border hover:border-primary/50 transition-colors">
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          {preview ? (
            <Link to={`/post/${id}`} className="text-foreground hover:text-primary transition-colors">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        
        <div className="flex items-center text-muted-foreground mb-4 text-sm">
          <Calendar size={14} className="mr-1" />
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>By {author?.username || 'Unknown'}</span>
        </div>
        
        {/* Intentionally vulnerable to XSS - uses dangerouslySetInnerHTML */}
        <div 
          dangerouslySetInnerHTML={{ __html: displayContent }} 
          className="text-foreground/90 mb-4"
        />
        
        {preview && (
          <Link 
            to={`/post/${id}`}
            className="inline-block mt-2 text-primary hover:text-primary/80 transition-colors"
          >
            Read more →
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
