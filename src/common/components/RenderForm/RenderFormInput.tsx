import { MenuItem, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  DropdownField,
  InputField,
  PhoneField,
} from "../../../types/form.type";

type Props = {
  field: InputField | PhoneField | DropdownField;
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

  if (field.type === "NUMBER") {
    return (
      <TextField
        size="small"
        type="number"
        label={field.label}
        fullWidth
        {...register(name)}
      />
    );
  }

  if (field.type === "TEXTAREA") {
    return (
      <TextField
        size="small"
        multiline
        minRows={4}
        label={field.label}
        fullWidth
        {...register(name)}
      />
    );
  }

  if (field.type === "PHONE") {
    return (
      <TextField
        size="small"
        type="tel"
        label={field.label}
        fullWidth
        {...register(name)}
      />
    );
  }

  if (field.type === "EMAIL") {
    return (
      <TextField
        size="small"
        type="email"
        label={field.label}
        fullWidth
        {...register(name)}
      />
    );
  }

  if (field.type === "DROPDOWN") {
    return (
      <TextField
        label={field.label}
        size="small"
        select
        fullWidth
        inputProps={{ ...register(`${name}`) }}
        defaultValue={""}
      >
        <MenuItem disabled value="">
          Select Type
        </MenuItem>
        {field.options?.map((option) => {
          return (
            <MenuItem value={option.value} key={option.value}>
              {option.title}
            </MenuItem>
          );
        })}
      </TextField>
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
