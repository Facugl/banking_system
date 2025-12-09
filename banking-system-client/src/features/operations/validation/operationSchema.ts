import * as yup from 'yup';

export const OperationCreateRequestSchema = yup.object({
  name: yup.string().required("Name is required"),
  path: yup.string().required("Path is required"),
  httpMethod: yup.string().required("HTTP method is required"),
  permitAll: yup.boolean().required("Permission flag is required"),
  moduleId: yup
    .number()
    .typeError("Module ID must be a number")
    .required("Module ID is required"),
});

export const OperationUpdateRequestSchema = yup.object({
  name: yup.string().optional(),
  path: yup.string().optional(),
  httpMethod: yup.string().optional(),
  permitAll: yup.boolean().optional(),
  moduleId: yup
    .number()
    .typeError("Module ID must be a number")
    .optional(),
});

