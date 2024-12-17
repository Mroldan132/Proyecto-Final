import React, { useState } from 'react';
import { registerRequest } from '../api/auth';
import { Link, Link as LinkRouter } from "react-router-dom"

export const SignUp = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    contraseña: '',
    dni: ''
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerRequest(formData);
    if (response && response.status === 201) {
      setMensaje('Registro exitoso. ¡Ahora puedes iniciar sesión!');
      setError('');
    } else {
      setError('Hubo un problema con el registro. Verifica los datos o el backend.');
      setMensaje('');
    }

    console.log(response);
  }

  return (
    <div style={{maxWidth: '300px', margin: '0 auto'}}>
      <h2>Registro de Mesero</h2>
      {mensaje && <div style={{color: 'green'}}>{mensaje}</div>}
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Apellido:
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </label>
        <br />
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
        <label>
          DNI:
          <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Registrarme</button>
      </form>

      <button><Link to="/login">Iniciar sesión</Link>
      </button>
    </div>
  )
}

