import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { FormField } from "../../../types/form.type";
import validateFields from "../../../utils/validField";
import CreateFormGroup from "./CreateFormGroup";

const checkUniqueKey = (arg: any[], ctx: z.RefinementCtx) => {
  const keys = arg.map((f) => f.key);

  keys.forEach((k, i, arr) => {
    const index = arr.indexOf(k, i + 1);
    if (index !== -1) {
      ctx.addIssue({
        message: "keys should be unique",
        path: [index, "key"],
        code: z.ZodIssueCode.custom,
      });
      ctx.addIssue({
        message: "keys should be unique",
        path: [i, "key"],
        code: z.ZodIssueCode.custom,
      });
    }
  });
};

const inputTypeEnum = z.enum(["DATE", "TEXT", "URL"]);
const groupTypeEnum = z.enum(["GROUP"]);
const listTypeEnum = z.enum(["LIST"]);

const inputSchema = z.object({
  key: z.string().trim().min(1).max(30),
  label: z.string().trim().min(2).max(30),
  type: inputTypeEnum,
});

const listSchema = (field: z.ZodType) =>
  z.object({
    key: z.string().trim().min(1).max(30),
    label: z.string().trim().min(2).max(30),
    type: listTypeEnum,
    field: field,
  });

const groupSchema = (field: z.ZodType) =>
  z.object({
    key: z.string().trim().min(1).max(30),
    label: z.string().trim().min(2).max(30),
    type: groupTypeEnum,
    fields: z.array(field).superRefine(checkUniqueKey),
  });

const fieldSchema: z.ZodType = z.lazy(() =>
  z.discriminatedUnion("type", [
    inputSchema,
    listSchema(fieldSchema),
    groupSchema(fieldSchema),
  ])
);

const formSchema = z.object({
  fields: z.array(fieldSchema).superRefine(checkUniqueKey),
});

type Props = {
  watchChanges: (v: FormField[]) => any;
};

const CreateForm = ({ watchChanges }: Props) => {
  const methods = useForm({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (value: any) => {
    console.table(value);
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
