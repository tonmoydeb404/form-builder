import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { inputTypes } from "../../../data/form";
import { FormFieldType, InputFieldType } from "../../../types/form.type";
import { valueAsNumber } from "../../../utils/react-hook-form";
import resolveObjectPath from "../../../utils/resolveObjectPath";

type Props = {
  name: string;
  type: FormFieldType;
};

const CreateFormValidation = ({ name, type }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack direction={"row"} spacing={1}>
      {inputTypes.includes(type as InputFieldType) || type === "LIST" ? (
        <>
          <TextField
            type="number"
            size="small"
            label="Max Length"
            fullWidth
            {...register(`${name}.maxLength`, { setValueAs: valueAsNumber })}
            error={!!resolveObjectPath(errors, `${name}.maxLength`, false)}
            helperText={
              resolveObjectPath(errors, `${name}.maxLength`, false)?.message
            }
          />
          <TextField
            type="number"
            size="small"
            label="Minimum Length"
            fullWidth
            {...register(`${name}.minLength`, { setValueAs: valueAsNumber })}
            error={!!resolveObjectPath(errors, `${name}.minLength`, false)}
            helperText={
              resolveObjectPath(errors, `${name}.minLength`, false)?.message
            }
          />
        </>
      ) : null}
      {type !== "GROUP" ? (
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={false}
              {...register(`${name}.optional`)}
            />
          }
          label="Optional"
        />
      ) : null}
    </Stack>
  );
};

export default CreateFormValidation;
