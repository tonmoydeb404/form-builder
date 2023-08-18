type CommonProps = {
  key: string;
  label: string;
};

type ValidationProps = {
  optional?: boolean;
  maxLength?: number;
  minLength?: number;
};

export enum InputFieldTypeEnum {
  "TEXT" = "TEXT",
  "URL" = "URL",
  "DATE" = "DATE",
  "NUMBER" = "NUMBER",
  "TEXTAREA" = "TEXTAREA",
  "EMAIL" = "EMAIL",
}
export type InputFieldType = keyof typeof InputFieldTypeEnum;
export type InputField = CommonProps &
  ValidationProps & {
    type: InputFieldType;
  };

export enum PhoneFieldTypeEnum {
  "PHONE" = "PHONE",
}
export type PhoneFieldType = keyof typeof PhoneFieldTypeEnum;
export type PhoneField = CommonProps &
  Pick<ValidationProps, "optional"> & {
    type: PhoneFieldType;
  };

export enum DropdownFieldTypeEnum {
  "DROPDOWN" = "DROPDOWN",
}
export type DropdownFieldType = keyof typeof DropdownFieldTypeEnum;
export type DropdownOptionType = { title: string; value: string };
export type DropdownField = CommonProps &
  Pick<ValidationProps, "optional"> & {
    type: DropdownFieldType;
    options: DropdownOptionType[];
  };

export enum GroupFieldTypeEnum {
  "GROUP" = "GROUP",
}
export type GroupFieldType = keyof typeof GroupFieldTypeEnum;
export type GroupField = CommonProps & {
  type: GroupFieldType;
  fields: (InputField | ListField | GroupField)[];
};

export enum ListFieldTypeEnum {
  "LIST" = "LIST",
}
export type ListFieldType = keyof typeof ListFieldTypeEnum;
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
