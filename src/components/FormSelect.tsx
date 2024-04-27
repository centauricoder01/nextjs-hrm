import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormInputProps {
  control: any;
  name: string;
  formlabel: string;
  selectValue: string[];
  selectPlaceholder: string;
}

const FormSelect: React.FC<FormInputProps> = ({
  control,
  name,
  formlabel,
  selectValue,
  selectPlaceholder,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formlabel}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[300px] h-12 bg-slate-200">
                <SelectValue placeholder={selectPlaceholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-slate-200">
              {selectValue.map((ele, i) => (
                <SelectItem value={ele} key={i}>
                  {ele}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
