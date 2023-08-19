import { MenuItem, TextField } from "@mui/material";
import { RegisterOptions, useFormContext } from "react-hook-form";
import {
  DateField,
  DropdownField,
  InputField,
  PhoneField,
} from "../../../types/form.type";
import resolveObjectPath from "../../../utils/resolveObjectPath";

type Props = {
  field: InputField | PhoneField | DropdownField | DateField;
  name: string;
};

const RenderFormInput = ({ field, name }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const validation: RegisterOptions = {
    required: { value: !field?.optional, message: "Required" },
  };

  const error = resolveObjectPath(errors, `${name}`, false);

  if (field.type === "DROPDOWN") {
    return (
      <TextField
        label={field.label}
        size="small"
        select
        fullWidth
        inputProps={{ ...register(`${name}`, { ...validation }) }}
        error={!!error}
        helperText={error?.message}
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

  if (field.type === "DATE") {
    return (
      <TextField
        size="small"
        type="date"
        label={field.label}
        fullWidth
        {...register(name, { ...validation })}
        error={!!error}
        helperText={error?.message}
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
        {...register(name, { ...validation })}
        error={!!error}
        helperText={error?.message}
      />
    );
  }

  validation.maxLength = field?.maxLength
    ? {
        value: field.maxLength,
        message: `Maximum ${field.maxLength} values are allowed`,
      }
    : undefined;
  validation.minLength = field?.minLength
    ? {
        value: field.minLength,
        message: `Minimum ${field.minLength} values are required`,
      }
    : undefined;

  if (field.type === "URL") {
    return (
      <TextField
        size="small"
        type="url"
        label={field.label}
        fullWidth
        {...register(name, { ...validation })}
        error={!!error}
        helperText={error?.message}
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
        {...register(name, { ...validation })}
        error={!!error}
        helperText={error?.message}
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
        {...register(name, { ...validation })}
        error={!!error}
        helperText={error?.message}
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
        {...register(name, { ...validation })}
        error={!!error}
        helperText={error?.message}
      />
    );
  }

  return (
    <TextField
      size="small"
      type="text"
      label={field.label}
      fullWidth
      {...register(name, { ...validation })}
      error={!!error}
      helperText={error?.message}
    />
  );
};

export default RenderFormInput;
