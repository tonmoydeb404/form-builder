import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormField } from "../../../types/form.type";
import RenderFormField from "./RenderFormField";

type Props = {
  state: FormField[];
};

const RenderForm = ({ state }: Props) => {
  const methods = useForm();

  const onSubmit = (values: Record<string, any>) => {
    console.log(values);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 10 }}>
          {state.map((field) => (
            <RenderFormField field={field} key={field.key} name={field.key} />
          ))}
        </Box>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default RenderForm;
