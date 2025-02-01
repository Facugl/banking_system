import * as Yup from 'yup';

export const roleSchema = Yup.object().shape({
  name: Yup.string()
    .required('The name is required.')
    .min(4, 'Minimum 4 characters required.'),
});
