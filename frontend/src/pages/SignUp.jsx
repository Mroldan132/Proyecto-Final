import React, { useState } from 'react';
import { registerRequest } from '../api/auth';
import { Link,useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    contraseña: '',
    dni: '',
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    try {
      const response = await registerRequest(formData);
      if (response?.status === 201) {
        setMensaje('¡Registro exitoso! Redirigiendo al inicio de sesión...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        setFormData({
          nombre: '',
          apellido: '',
          usuario: '',
          contraseña: '',
          dni: '',
        });
      } else {
        setError('Hubo un problema con el registro. Verifica los datos o el backend.');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center">Registro de Mesero</h2>
              {mensaje && <div className="alert alert-success">{mensaje}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    className="form-control"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    className="form-control"
                    value={formData.usuario}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contraseña" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    className="form-control"
                    value={formData.contraseña}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dni" className="form-label">
                    DNI
                  </label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    className="form-control"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Registrarme
                </button>
              </form>
              <div className="mt-3 text-center">
                <Link to="/login" className="text-decoration-none">
                  ¿Ya tienes una cuenta? Inicia sesión aquí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
