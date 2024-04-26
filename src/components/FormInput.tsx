import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  control: any;
  name: string;
  formlabel: string;
  type: string;
}

const FormInput: React.FC<FormInputProps> = ({
  control,
  name,
  formlabel,
  type,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formlabel}</FormLabel>
          <FormControl>
            <Input
              className="w-80 m-auto bg-slate-200"
              {...field}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
