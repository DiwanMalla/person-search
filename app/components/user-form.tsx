import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserFormData } from "../actions/schemas";

interface FormComponentProps {
  form: UseFormReturn<UserFormData>;
}

export function UserForm({ form }: FormComponentProps) {
  console.log(form);
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="John Doe"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            {fieldState.error && (
              <p className="text-red-600 text-sm mt-1">
                {String(fieldState.error.message || "")}
              </p>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="john@example.com"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            {fieldState.error && (
              <p className="text-red-600 text-sm mt-1">
                {String(fieldState.error.message || "")}
              </p>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                placeholder="04XXXXXXXX"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            {fieldState.error && (
              <p className="text-red-600 text-sm mt-1">
                {String(fieldState.error.message || "")}
              </p>
            )}
          </FormItem>
        )}
      />
    </Form>
  );
}
