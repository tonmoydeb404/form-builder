type CommonProps = {
  key: string;
  label: string;
};

type ValidationProps = {
  optional?: boolean;
  maxLength?: number;
  minLength?: number;
};

export type InputFieldType = "TEXT" | "URL" | "DATE" | "NUMBER" | "TEXTAREA";
export type InputField = CommonProps &
  ValidationProps & {
    type: InputFieldType;
  };

export type PhoneFieldType = "PHONE";
export type PhoneField = CommonProps &
  Pick<ValidationProps, "optional"> & {
    type: PhoneFieldType;
  };

export type DropdownFieldType = "DROPDOWN";
export type DropdownField = CommonProps &
  Pick<ValidationProps, "optional"> & {
    type: DropdownFieldType;
    options: Record<string, string>;
  };

export type GroupFieldType = "GROUP";
export type GroupField = CommonProps & {
  type: GroupFieldType;
  fields: (InputField | ListField | GroupField)[];
};

export type ListFieldType = "LIST";
export type ListField = CommonProps &
  ValidationProps & {
    type: ListFieldType;
    field: InputField | GroupField | ListField;
  };

export type FormFieldType =
  | InputFieldType
  | GroupFieldType
  | ListFieldType
  | PhoneFieldType
  | DropdownFieldType;
export type FormField = InputField | GroupField | ListField;
