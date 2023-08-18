import { dropdownType, inputTypes, phoneType } from "../data/form";
import { FormField } from "../types/form.type";

const validateFields = (fields: (FormField | any)[]): FormField[] => {
  const validFields: FormField[] = [];

  // validate field
  fields.forEach((field) => {
    if (typeof field === "object" && field?.key && field?.type) {
      if (field.type === "GROUP" && field?.fields) {
        validFields.push(field);
      } else if (field.type === "LIST" && field?.field) {
        validFields.push(field);
      } else if (field.type === phoneType) {
        validFields.push(field);
      } else if (field.type === dropdownType) {
        validFields.push(field);
      } else if (inputTypes.includes(field.type)) {
        validFields.push(field);
      }
    }
  });

  return validFields;
};

export default validateFields;
