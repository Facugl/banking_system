import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(4, 'Name must be at least 4 characters'),
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  repeatedPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export default registerSchema;
