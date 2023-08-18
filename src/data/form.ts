import {
  DateFieldType,
  DropdownFieldType,
  FormFieldType,
  GroupFieldType,
  InputFieldType,
  ListFieldType,
  PhoneFieldType,
} from "../types/form.type";

export const fieldTypeTitles: Record<FormFieldType, string> = {
  DATE: "Date",
  DROPDOWN: "Dropdown",
  GROUP: "Group Fields",
  LIST: "Multiple Values",
  NUMBER: "Number",
  PHONE: "Phone Number",
  TEXT: "Singleline Text",
  URL: "Link/URL",
  TEXTAREA: "Multiline Text",
  EMAIL: "Email",
};

export const inputTypes: InputFieldType[] = [
  "EMAIL",
  "NUMBER",
  "TEXT",
  "TEXTAREA",
  "URL",
];
export const dateTypes: DateFieldType[] = ["DATE"];
export const listTypes: ListFieldType[] = ["LIST"];
export const groupTypes: GroupFieldType[] = ["GROUP"];
export const phoneTypes: PhoneFieldType[] = ["PHONE"];
export const dropdownTypes: DropdownFieldType[] = ["DROPDOWN"];
export const fieldTypes: FormFieldType[] = [
  ...inputTypes,
  ...dateTypes,
  ...listTypes,
  ...groupTypes,
  ...phoneTypes,
  ...dropdownTypes,
];
