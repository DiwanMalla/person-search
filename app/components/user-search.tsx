"use client";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import { searchUsers } from "@/app/actions/actions";
import { UserCard } from "./user-card";
import { User } from "@/app/actions/schemas";

interface Option {
  value: string;
  label: string;
  user: User;
}

export default function UserSearch() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  console.log(users);
  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    const users = await searchUsers(inputValue);
    setUsers(users); // Update users list
    return users.map((user) => ({ value: user.id, label: user.name, user }));
  };

  const handleChange = (option: Option | null) => {
    setSelectedUser(option ? option.user : null);
  };

  const updateUserInList = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(updatedUser); // Update the selected user
  };

  return (
    <div className="space-y-6">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        placeholder="Search for a user..."
        className="w-full max-w-md mx-auto"
      />
      {selectedUser && (
        <UserCard user={selectedUser} onUpdate={updateUserInList} />
      )}
    </div>
  );
}
