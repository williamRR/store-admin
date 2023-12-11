import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Obtén el token de acceso desde tu sistema de autenticación, por ejemplo, localStorage o algún estado de tu aplicación
const accessToken = localStorage.getItem('accessToken') || '';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Asegúrate de que la variable VITE_API_URL esté definida en tu configuración de entorno
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const getRefreshToken = async () => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/refresh`,
    {
      refreshToken: localStorage.getItem('refreshToken'),
    },
  );
  return data;
};
// Agrega un interceptor para manejar posibles errores de autenticación o renovación del token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('fallando');
    console.log(error.response);
    // Verifica si el error es debido a un token de acceso no válido
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('entré al if');
      originalRequest._retry = true;

      // Intenta renovar el token de acceso
      try {
        const { accessToken, refreshToken } = await getRefreshToken();
        console.log('seteando');
        localStorage.setItem('accessToken', accessToken);

        // Actualiza el encabezado de autorización con el nuevo token y repite la solicitud original
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Si no se puede renovar el token, redirige a la página de inicio de sesión o maneja el error de otra manera
        /* Lógica para redirigir o manejar el error de renovación */
      }
    }

    // Si el error no es un problema de token de acceso, simplemente devuelve el error
    return Promise.reject(error);
  },
);

export default API;
