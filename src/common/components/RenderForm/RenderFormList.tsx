import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ListField } from "../../../types/form.type";
import RenderFormField from "./RenderFormField";

type Props = {
  list: ListField;
  name: string;
  element?: ReactNode;
};

const RenderFormList = ({ list, name, element }: Props) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  const appendField = () => {
    if (list.field.type === "GROUP") {
      const obj: Record<string, any> = {};
      list.field.fields.forEach((f) => {
        obj[f.key] = undefined;
      });
      append(obj);
    } else {
      append(undefined);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "rgba(20, 153, 17, 0.2)",
        borderRadius: "5px",
      }}
    >
      <Stack>
        <Typography variant="caption" sx={{ mb: 1 }}>
          {list.label}
        </Typography>
        {element}
      </Stack>

      <Stack spacing={1} sx={{ mb: 3 }}>
        {fields.map((f, index) => (
          <Box key={f.id}>
            <Box>
              <RenderFormField
                field={list.field}
                name={`${name}[${index}]`}
                element={
                  <IconButton
                    size={
                      list.field.type === "GROUP" || list.field.type === "LIST"
                        ? "small"
                        : "medium"
                    }
                    onClick={() => remove(index)}
                    color="error"
                  >
                    <Delete fontSize="inherit" />
                  </IconButton>
                }
              />
            </Box>
          </Box>
        ))}
      </Stack>

      <Button variant="contained" onClick={appendField}>
        Add
      </Button>
    </Box>
  );
};

export default RenderFormList;
