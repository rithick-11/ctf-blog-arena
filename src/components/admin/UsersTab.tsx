
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
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Password</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    user.isAdmin
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {user.isAdmin ? 'Admin' : 'User'}
                </span>
              </TableCell>
              <TableCell>
                {/* Intentionally vulnerable - showing passwords */}
                {user.password}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTab;
