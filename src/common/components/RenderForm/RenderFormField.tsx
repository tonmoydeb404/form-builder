import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { FormField } from "../../../types/form.type";
import RenderFormGroup from "./RenderFormGroup";
import RenderFormInput from "./RenderFormInput";
import RenderFormList from "./RenderFormList";

type Props = {
  field: FormField;
  name: string;
  element?: ReactNode;
};

const RenderFormField = ({ field, name, element: element }: Props) => {
  if (field.type === "LIST") {
    return <RenderFormList list={field} name={name} element={element} />;
  }

  if (field.type === "GROUP") {
    return <RenderFormGroup group={field} name={name} element={element} />;
  }

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <RenderFormInput field={field} name={name} />
      {element}
    </Stack>
  );
};

export default RenderFormField;
