import * as z from "zod";
import { InputField } from "../../types/form.type";

type ValidateInputTypeProps = Omit<InputField, "label">;
export const validateInputType = ({
  key,
  type,
  maxLength,
  minLength,
  optional,
}: ValidateInputTypeProps) => {
  let schema;

  // adding schema acording to type
  switch (type) {
    case "TEXT":
    case "TEXTAREA": {
      schema = z
        .string({
          required_error: `${key} is required`,
          invalid_type_error: `${key} should be a valid String`,
        })
        .trim();
      break;
    }
    case "URL": {
      schema = z
        .string({ required_error: `${key} is required` })
        .trim()
        .url(`${key} should be a valid URL`);
      break;
    }
    case "NUMBER": {
      schema = z.number({
        required_error: `${key} is required`,
        invalid_type_error: `${key} should be a valid Number`,
      });
      break;
    }
    case "EMAIL": {
      schema = z
        .string({ required_error: `${key} is required` })
        .trim()
        .email(`${key} should be a valid Email`);
      break;
    }
    default: {
      schema = z.string();
      break;
    }
  }

  // add maximum length of value
  if (maxLength) {
    schema = schema.max(
      maxLength,
      type === "NUMBER"
        ? `${key} must be less than or equal to ${minLength}`
        : `${key} must contain at most ${minLength} character(s)`
    );
  }

  // add minimum length of value
  if (minLength) {
    schema = schema.min(
      minLength,
      type === "NUMBER"
        ? `${key} must be greater than or equal to ${minLength}`
        : `${key} must contain at least ${minLength} character(s)`
    );
  }

  // make optional field
  if (optional) {
    schema = schema.optional();
  }

  return schema;
};
