// import { FormField } from "../types/form.type";

// const insertData = (template: string, keys: string[], values: string[]) => {
//   let t = template;
//   keys.forEach((k, i) => {
//     t = t.replace(`[${k}]`, values[i]);
//   });
//   return t;
// };

// const listChecker = (field: FormField, values: any[], code: string): string => {
//   const r: string[] = [];
//   if (field.type === "LIST") {
//     values.forEach((v) => {
//       r.push(listChecker(field.field, v, field.code));
//     });
//   } else if (field.type === "GROUP") {
//     values.forEach((v) => {
//       const obj = groupChecker(field.fields, v, field.key);
//       r.push(insertData(code, Object.keys(obj), Object.values(obj)));
//     });
//   } else {
//     values.forEach((v) => r.push(insertData(code, ["value"], [v])));
//   }

//   return r.toString();
// };

// export const groupChecker = (
//   fields: FormField[],
//   values: Record<string, any>,
//   base: string
// ): Record<string, string> => {
//   const r: Record<string, string> = {};
//   fields.forEach((f) => {
//     const key = base ? [base, f.key].join("_") : f.key;
//     if (f.type === "GROUP") {
//       Object.assign(r, groupChecker(f.fields, values?.[f.key], f.key));
//     } else if (f.type === "LIST") {
//       r[key] = listChecker(f.field, values?.[f.key], f.code);
//     } else {
//       r[key] = values?.[f.key];
//     }
//   });
//   return r;
// };
