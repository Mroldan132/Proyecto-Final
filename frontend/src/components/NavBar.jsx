import React from "react";
import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { useTokenStore } from "../store/tokenContext";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useTokenStore((state) =>state.logOut );
  const handleLogout = async () => {
      await isAuthenticated();
      navigate("/login");
  };

  return (
    <NavBarStyled>
      <nav>
        <h1>Tagliatore</h1>
        <ul>
          <LinkRouter to="/" className="">
            Inicio
          </LinkRouter>
          <LinkRouter to="/plato">Platillos</LinkRouter>
          <LinkRouter to="/orden">Ordenes</LinkRouter>
          <LinkRouter to="/categoria" className="">Categorías</LinkRouter>
          {/* <LinkRouter to="/personal">Personal</LinkRouter> */}
          <LinkRouter to="/cliente">Cliente</LinkRouter>
          <LinkRouter to="/chat">Chat</LinkRouter>
          {isAuthenticated && (
            <button onClick={handleLogout}>Cerrar sesión</button>
          )}
        </ul>
      </nav>
    </NavBarStyled>
  );
};

const NavBarStyled = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 10vh;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #242424;
    color: white;
  }

  ul {
    display: flex;
    list-style: none;
  }

  h1 {
    font-size: 2rem;
  }

  a {
    color: white;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }

  a:hover {
    color: #f1356d;
  }

  button {
    color: white;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }

  button:hover {
    color: #f1356d;
  }

  @media (max-width: 768px) {
    ul {
      display: none;
    }
  }
`;
