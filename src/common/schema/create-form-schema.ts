import * as z from "zod";
import {
  DateFieldTypeEnum,
  DropdownFieldTypeEnum,
  GroupFieldTypeEnum,
  InputFieldTypeEnum,
  ListFieldTypeEnum,
  PhoneFieldTypeEnum,
} from "../../types/form.type";

// custom validation function for checking unique keys
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

// reuseable schema
const commonInputSchema = z.object({
  key: z
    .string()
    .trim()
    .min(1)
    .max(30)
    .regex(/^[a-z]+(_[a-z]+)*$/, "Only a-z, A-Z, underscore(_) are allowed."),
  label: z.string().trim().min(2).max(30),
});

const commonValidationSchema = z.object({
  maxLength: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  minLength: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  optional: z.boolean().optional(),
});

// schema for input fields
const inputSchema = commonInputSchema
  .merge(
    z.object({
      type: z.nativeEnum(InputFieldTypeEnum),
    })
  )
  .merge(commonValidationSchema);

// schema for date field
const dateSchema = commonInputSchema
  .merge(
    z.object({
      type: z.nativeEnum(DateFieldTypeEnum),
    })
  )
  .merge(commonValidationSchema.pick({ optional: true }));

// schema for phone number field
const phoneSchema = commonInputSchema
  .merge(
    z.object({
      type: z.nativeEnum(PhoneFieldTypeEnum),
    })
  )
  .merge(commonValidationSchema.pick({ optional: true }));

// schema form drop down menu
const dropdownOptionSchema = z.object({
  title: z.string().min(1),
  value: z.string().min(1),
});
const dropdownSchema = commonInputSchema
  .merge(
    z.object({
      options: z.array(dropdownOptionSchema),
      type: z.nativeEnum(DropdownFieldTypeEnum),
    })
  )
  .merge(commonValidationSchema.pick({ optional: true }));

// schema for mulitple input data
const listSchema = (field: z.ZodType) =>
  commonInputSchema
    .merge(
      z.object({
        type: z.nativeEnum(ListFieldTypeEnum),
        field: field,
      })
    )
    .merge(commonValidationSchema);

// schema for multiple fields
const groupSchema = (field: z.ZodType) =>
  commonInputSchema.merge(
    z.object({
      type: z.nativeEnum(GroupFieldTypeEnum),
      fields: z.array(field).superRefine(checkUniqueKey),
    })
  );

// schema for common field
const fieldSchema: z.ZodType = z.lazy(() =>
  z.discriminatedUnion("type", [
    inputSchema,
    listSchema(fieldSchema),
    groupSchema(fieldSchema),
    phoneSchema,
    dropdownSchema,
    dateSchema,
  ])
);

export const createFormSchema = z.object({
  fields: z.array(fieldSchema).superRefine(checkUniqueKey),
});
