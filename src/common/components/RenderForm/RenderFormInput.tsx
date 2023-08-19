import { MenuItem, TextField } from "@mui/material";
import { RegisterOptions, useFormContext } from "react-hook-form";
import {
  DateField,
  DropdownField,
  InputField,
  PhoneField,
} from "../../../types/form.type";
import { valueAsNumber } from "../../../utils/react-hook-form";
import resolveObjectPath from "../../../utils/resolveObjectPath";
import { validateInputType } from "../../schema/render-form-schema";

type Props = {
  field: InputField | PhoneField | DropdownField | DateField;
  name: string;
};

const RenderFormInput = ({ field, name }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  let validation: Pick<RegisterOptions, "required" | "validate"> = {
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

  validation = {
    validate: (v) => {
      const result = validateInputType({ ...field }).safeParse(v);
      return result?.success || result.error.errors[0].message;
    },
  };

  if (field.type === "URL") {
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
  }

  if (field.type === "NUMBER") {
    return (
      <TextField
        size="small"
        type="number"
        label={field.label}
        fullWidth
        {...register(name, {
          setValueAs: valueAsNumber,
          ...validation,
        })}
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
