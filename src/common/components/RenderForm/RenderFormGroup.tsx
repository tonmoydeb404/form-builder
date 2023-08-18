import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { GroupField } from "../../../types/form.type";
import RenderFormField from "./RenderFormField";

type Props = {
  group: GroupField;
  name: string;
  element?: ReactNode;
};

const RenderFormGroup = ({ group, name, element }: Props) => {
  return (
    <Stack
      spacing={1}
      sx={{
        p: 2,
        backgroundColor: "rgba(241, 143, 1, 0.2)",
        borderRadius: "5px",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="caption">{group.label}</Typography>
        {element}
      </Stack>

      {group.fields.map((f) => (
        <RenderFormField name={`${name}.${f.key}`} field={f} key={f.key} />
      ))}
    </Stack>
  );
};

export default RenderFormGroup;
