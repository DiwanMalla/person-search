// app/components/edit-user-dialog.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/app/actions/actions";
import { UserFormData, userFormSchema, User } from "@/app/actions/schemas";
import MutableDialog, { ActionState } from "@/components/mutable-dialog";
import { UserForm } from "./user-form";

// app/components/edit-user-dialog.tsx
interface EditUserDialogProps {
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  onUpdate: (updatedUser: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  }) => void; // New prop for update
}

export function EditUserDialog({ user, onUpdate }: EditUserDialogProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });

  const handleEditUser = async (
    data: UserFormData
  ): Promise<ActionState<User>> => {
    try {
      const updatedUser = await updateUser(user.id, data);
      onUpdate(updatedUser); // Call the onUpdate function with the updated user
      return {
        success: true,
        message: `User ${updatedUser.name} updated successfully`,
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update user",
      };
    }
  };

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleEditUser}
      defaultValues={form.getValues()}
      triggerButtonLabel="Edit"
      addDialogTitle={`Edit User ${user.name}`}
      dialogDescription="Update the user details below."
      submitButtonLabel="Save Changes"
    />
  );
}
