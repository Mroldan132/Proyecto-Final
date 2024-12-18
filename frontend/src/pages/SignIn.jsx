import React, { useState } from "react";
import { loginRequest } from "../api/auth";
import { useTokenStore } from "../store/tokenContext";
import { Link } from 'react-router-dom';

export function SignIn() {
  const setProfile = useTokenStore((state) => state.setProfile);

  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    if (!formData.usuario || !formData.contraseña) {
      setError("Ambos campos son obligatorios.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    setError("");
    setMensaje("");

    try {
      const response = await loginRequest(formData);
      if (response && response.status === 200) {
        const token = response.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          setProfile(response.data.loggedMesero);
          setMensaje("Inicio de sesión exitoso!");
        } else {
          setError("No se recibió token. Verificar backend.");
        }
      } else {
        setError("Credenciales inválidas o error en el servidor.");
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>

              {/* Mensajes dinámicos */}
              {mensaje && (
                <div className="alert alert-success" role="alert">
                  {mensaje}
                </div>
              )}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ingresa tu usuario"
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
                    value={formData.contraseña}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Iniciando..." : "Iniciar Sesión"}
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <Link to="/SignUp" className="text-decoration-none">
                  ¿No tienes una cuenta? Registrate aquí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
