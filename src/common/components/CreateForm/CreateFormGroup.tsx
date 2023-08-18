import { Delete } from "@mui/icons-material";
import { Button, IconButton, Stack, SxProps, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import CreateFormField from "./CreateFormField";

type Props = {
  name: string;
  sx?: SxProps;
};

const CreateFormGroup = ({ name, sx = {} }: Props) => {
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    name,
    control,
  });

  const appendNew = () => {
    append({ label: "", type: "", key: "" });
  };

  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        backgroundColor: "rgba(241, 143, 1, 0.2)",
        borderRadius: "5px",
        ...sx,
      }}
    >
      {fields.map((f, index) => (
        <Stack key={f.id}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ mb: 0.5 }}
          >
            <Typography variant="caption">Field {index + 1}</Typography>
            <IconButton
              size="small"
              color="error"
              onClick={() => remove(index)}
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </Stack>
          <CreateFormField name={`${name}[${index}]`} />
        </Stack>
      ))}
      <Button onClick={appendNew} variant="contained" color="success">
        Add Field
      </Button>
    </Stack>
  );
};

export default CreateFormGroup;
