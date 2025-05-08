
import { User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UsersTabProps {
  users: any[];
}

const UsersTab = ({ users }: UsersTabProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full terminal-bg rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Username</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border hover:bg-muted/20">
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.username}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    user.isAdmin
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {user.isAdmin ? 'Admin' : 'User'}
                </span>
              </td>
              <td className="p-4">
                {/* Intentionally vulnerable - showing passwords */}
                {user.password}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTab;
