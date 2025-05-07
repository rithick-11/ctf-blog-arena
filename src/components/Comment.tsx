
import { getUserById } from '../lib/data';

interface CommentProps {
  id: number;
  userId: number;
  content: string;
  date: string;
}

const Comment = ({ id, userId, content, date }: CommentProps) => {
  const user = getUserById(userId);

  return (
    <div className="border-t border-border py-4" data-comment-id={id} data-user-id={userId}>
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">
          {user?.username || 'Anonymous'} 
          <span className="text-xs text-muted-foreground ml-1">
            (user #{userId})
          </span>
        </div>
        <div className="text-sm text-muted-foreground">{date}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Comment;
