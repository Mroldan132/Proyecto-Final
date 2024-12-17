import React, { useState } from 'react';
import { loginRequest } from '../api/auth';
import { useTokenStore } from '../store/tokenContext';

export function SignIn() {

  const setProfile = useTokenStore(state => state.setProfile);

  const [formData, setFormData] = useState({
    usuario: '',    // OJO: si tu backend valida por usuario, cambia usuario -> usuario
    contraseña: ''
  });
  
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    const response = await loginRequest(formData);
    console.log('Response:', response);
    if (response && response.status === 200) {
      // Suponiendo que el backend devuelve un token
      const token = response.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        setMensaje('Inicio de sesión exitoso!');
        setError('');
        
        setProfile(response.data.loggedMesero);

      } else {
        setError('No se recibió token. Verificar backend.');
      }
    } else {
      setError('Credenciales inválidas o error en el servidor.');
      setMensaje('');
    }
  }

  return (
    <div style={{maxWidth: '300px', margin: '0 auto'}}>
      <h2>Iniciar Sesión</h2>
      {mensaje && <div style={{color: 'green'}}>{mensaje}</div>}
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}
