import { FormField } from "../types/form.type";

const validateFields = (fields: FormField[]): FormField[] => {
  const validFields: FormField[] = [];

  // validate field
  fields.forEach((field) => {
    // check required fields are available or not
    if (!field?.key || !field?.type) return;

    // check required properties are available or not based on type
    switch (field.type) {
      case "LIST": {
        if (!field?.field) return;
        break;
      }
      case "GROUP": {
        if (!field?.fields) return;
        break;
      }
      case "DROPDOWN": {
        if (!field?.options) return;
        break;
      }
      case "DATE":
      case "PHONE":
      case "TEXT":
      case "URL":
      case "NUMBER":
      case "TEXTAREA":
      case "EMAIL": {
        break;
      }
    }

    // now our field is valid field
    validFields.push(field);
  });

  return validFields;
};

export default validateFields;
