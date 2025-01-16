import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import registerCustomer from '../api/registerCustomer';

interface FormData {
  name: string;
  username: string;
  password: string;
  repeatedPassword: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    password: '',
    repeatedPassword: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError('');
    setSuccess('');

    try {
      await registerCustomer(formData);

      setSuccess('¡Registro exitoso!');
      setFormData({ name: '', username: '', password: '', repeatedPassword: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar customer');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        Registro
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre completo"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Nombre de usuario"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Repetir contraseña"
          name="repeatedPassword"
          type="password"
          fullWidth
          margin="normal"
          value={formData.repeatedPassword}
          onChange={handleChange}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Registrarse
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
