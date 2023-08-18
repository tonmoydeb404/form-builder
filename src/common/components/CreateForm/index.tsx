import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormField } from "../../../types/form.type";
import validateFields from "../../../utils/validField";
import { createFormSchema } from "../../schema/create-form-schema";
import CreateFormGroup from "./CreateFormGroup";

type Props = {
  watchChanges: (v: FormField[]) => any;
};

const CreateForm = ({ watchChanges }: Props) => {
  const methods = useForm({
    resolver: zodResolver(createFormSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (value: any) => {
    console.log(value);
    watchChanges(validateFields(value.fields || []));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateFormGroup
          name="fields"
          sx={{ p: 0, backgroundColor: "transparent" }}
        />

        <Stack direction={"row"} spacing={1} sx={{ mt: 5 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default CreateForm;
