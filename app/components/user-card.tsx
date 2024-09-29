import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin } from "lucide-react";
import { EditUserDialog } from "./edit-user";

// app/actions/schemas.ts (or wherever User is defined)
export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email: string; // Optional
  location?: string; // Optional
}

interface UserCardProps {
  user: User;
  onUpdate: (updatedUser: User) => void; // New prop for update
}

export function UserCard({ user, onUpdate }: UserCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
            alt={user.name}
          />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <Badge variant="secondary" className="w-fit mt-1">
            ID: {user.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{user.phoneNumber}</span>
        </div>
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{user.location}</span>
          </div>
        )}
        <div>
          <EditUserDialog user={user} onUpdate={onUpdate} />{" "}
          {/* Pass the onUpdate function */}
        </div>
      </CardContent>
    </Card>
  );
}
