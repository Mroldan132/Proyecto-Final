import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <FooterStyled>
      <div className="footer-content">
        <div className="footer-section about">
          <h2>Tagliatore</h2>
          <p>Tagliatore es un restaurante que ofrece la mejor experiencia culinaria con platillos auténticos y deliciosos. ¡Visítanos y disfruta!</p>
        </div>
        <div className="footer-section social">
          <h3>Redes Sociales</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tagliatore. Todos los derechos reservados.</p>
      </div>
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  background-color: #242424;
  color: white;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: auto; /* Asegura que el footer se coloque al final de la página */

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    max-width: 1200px;
  }

  .footer-section {
    margin: 1rem;
    flex: 1 1 300px;
  }

  .footer-section h2,
  .footer-section h3 {
    color: #f1356d;
    margin-bottom: 1rem;
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
  }

  .footer-section ul li {
    margin-bottom: 0.5rem;
  }

  .footer-section ul li a {
    color: white;
    text-decoration: none;
  }

  .footer-section ul li a:hover {
    color: #f1356d;
  }

  .social-icons {
    display: flex;
    gap: 1rem;
  }

  .social-icons a {
    color: white;
    font-size: 1.5rem;
    text-decoration: none;
  }

  .social-icons a:hover {
    color: #f1356d;
  }

  .footer-bottom {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
    }
  }
`;
