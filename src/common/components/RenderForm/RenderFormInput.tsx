import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { InputField } from "../../../types/form.type";

type Props = {
  field: InputField;
  name: string;
};

const RenderFormInput = ({ field, name }: Props) => {
  const { register } = useFormContext();

  if (field.type === "DATE") {
    return (
      <TextField
        size="small"
        type="date"
        label={field.label}
        fullWidth
        {...register(name)}
      />
    );
  }

  if (field.type === "URL") {
    return (
      <TextField
        size="small"
        type="url"
        label={field.label}
        fullWidth
        {...register(name)}
      />
    );
  }

  return (
    <TextField
      size="small"
      type="text"
      label={field.label}
      fullWidth
      {...register(name)}
    />
  );
};

export default RenderFormInput;
