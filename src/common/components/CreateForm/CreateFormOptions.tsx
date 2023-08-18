import { Delete } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DropdownOptionType } from "../../../types/form.type";

type Props = {
  name: string;
};

const CreateFormOptions = ({ name }: Props) => {
  const { control, register } = useFormContext<{
    [k: string]: DropdownOptionType[];
  }>();
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  const addNew = () => {
    append({ title: "", value: "" });
  };

  return (
    <Stack spacing={1}>
      {fields.map((f, index) => (
        <Stack key={f.id} direction={"row"}>
          <TextField
            size="small"
            label="Title"
            fullWidth
            {...register(`${name}[${index}].title`)}
          />
          <TextField
            size="small"
            label="Value"
            fullWidth
            {...register(`${name}[${index}].value`)}
          />
          <IconButton onClick={() => remove(index)}>
            <Delete fontSize="inherit" />
          </IconButton>
        </Stack>
      ))}

      <Button
        onClick={addNew}
        variant="contained"
        color="success"
        sx={{ mt: 5 }}
      >
        Add Option
      </Button>
    </Stack>
  );
};

export default CreateFormOptions;
