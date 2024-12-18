import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { listaMesero } from '../api/mesero'
import { listaCliente } from '../api/cliente'
import { listaCategoria } from '../api/categoria'
import { listaOrden } from '../api/orden'
import { listaPlato } from '../api/plato'
export const Index = () => {
  const [clientes, setClientes] = useState([]);
  const [meseros, setMeseros] = useState([]);
  const [platos,setPlatos] = useState([]);
  const [categorias,setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientesData = await listaCliente();
      const meserosData = await listaMesero();
      const platosData = await listaPlato();
      const categoriasData = await listaCategoria();
      setClientes(clientesData);
      setMeseros(meserosData);
      setPlatos(platosData);
      setCategorias(categoriasData);
    };

    fetchData();
  }, []);

  return (
    <DashboardContainer>
      <SectionTitle>Clientes Registrados</SectionTitle>
      <CardContainer>
        {clientes.map((cliente, index) => (
          <Card key={index}>
            <h3>{cliente.nombre}</h3>
            <p>Email: {cliente.email}</p>
            <p>Teléfono: {cliente.telefono}</p>
          </Card>
        ))}
      </CardContainer>

      <SectionTitle>Meseros Registrados</SectionTitle>
      <CardContainer>
        {meseros.map((mesero, index) => (
          <Card key={index}>
            <h3>{mesero.nombre}</h3>
            <p>Apellidos: {mesero.apellido}</p>
            <p>DNI: {mesero.dni}</p>
          </Card>
        ))}
      </CardContainer>

      <SectionTitle>Platos Registrados</SectionTitle>
      <CardContainer>
        {platos.map((plato, index) => (
          <Card key={index}>
            <h3>{plato.nombre}</h3>
            <p>Descripcion: {plato.descripcion}</p>
            <p>Precio: {plato.precio}</p>
            <p>Categoria : {(categorias.find(c => c._id === plato.categoria)?.nombre) || 'Sin categoría'}</p>
          </Card>
        ))}
      </CardContainer>
    </DashboardContainer>

    
  )
}

const DashboardContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-top: 40px;
  font-size: 24px;
  color: #333;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    margin: 5px 0;
  }
  
  &:hover {
    background-color: #e2e2e2;
    transform: scale(1.05);
    transition: 0.3s ease-in-out;
  }
`;