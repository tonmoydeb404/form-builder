import {
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

export const inputTypes: readonly InputFieldType[] = [
  "DATE",
  "EMAIL",
  "NUMBER",
  "TEXT",
  "TEXTAREA",
  "URL",
];
export const listType: ListFieldType = "LIST";
export const groupType: GroupFieldType = "GROUP";
export const phoneType: PhoneFieldType = "PHONE";
export const dropdownType: DropdownFieldType = "DROPDOWN";
export const fieldTypes: FormFieldType[] = [
  ...inputTypes,
  listType,
  groupType,
  phoneType,
  dropdownType,
];
