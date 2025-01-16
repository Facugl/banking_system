import axios from 'axios';

interface UserData {
  name: string;
  username: string;
  password: string;
  repeatedPassword: string;
}

const registerCustomer = async (userData: UserData): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/users",
      userData
    );

    console.log("Customer registrado:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error al registrar el customer:", error.response?.data || error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    
    throw error;
  }
};

export default registerCustomer;
