import React from 'react'
import styled from 'styled-components'
import { Link, Link as LinkRouter } from "react-router-dom"
import { useTokenStore } from "../store/tokenContext"


export const NavBar = () => {
  return (
    <NavBarStyled>
        <nav>
        <h1>Tagliatore</h1>    
        
        <ul>
            <LinkRouter to={"/"} className=''>Inicio</LinkRouter>
            <LinkRouter >Platillos</LinkRouter>
            <LinkRouter >Ordenes</LinkRouter>
            <LinkRouter >Categorias</LinkRouter>
            <LinkRouter >Personal</LinkRouter>
            <LinkRouter >Atencion al Cliente</LinkRouter>
        </ul>


        </nav>

    </NavBarStyled>
  )
}

const NavBarStyled = styled.div`
margin: 0;
padding: 0;
box-sizing: border-box;
width: 100%;
height: 10vh;

    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #242424;
        color: white;
    }

    ul{
        display: flex;
        list-style: none;
    }

    h1{
        font-size: 2rem;
    }

    a{
        color: white;
        padding: 0.5rem 1rem;
        text-decoration: none;
    }

    a:hover{
        color: #f1356d;
    }

    @media (max-width: 768px){
        ul{
            display: none;
        }
    }

    

`

