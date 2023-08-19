import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ListField } from "../../../types/form.type";
import resolveObjectPath from "../../../utils/resolveObjectPath";
import RenderFormField from "./RenderFormField";

type Props = {
  list: ListField;
  name: string;
  element?: ReactNode;
};

const RenderFormList = ({ list, name, element }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: {
      maxLength: list?.maxLength
        ? {
            value: list.maxLength,
            message: `Maximum ${list.maxLength} values are allowed`,
          }
        : undefined,
      minLength: list?.minLength
        ? {
            value: list.minLength,
            message: `Minimum ${list.minLength} values are required`,
          }
        : undefined,
      required: { value: !list?.optional, message: "Required" },
    },
  });

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
      <Stack sx={{ mb: 1 }}>
        <Stack>
          <Typography variant="caption">{list.label}</Typography>
          <Typography variant="caption" sx={{ color: "red" }}>
            {resolveObjectPath(errors, `${name}.root`, false)?.message}
          </Typography>
        </Stack>
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
