import * as yup from 'yup';

const moduleSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  basePath: yup.string().required('Base Path is required'),
});

export default moduleSchema;
