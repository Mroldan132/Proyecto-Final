import React from 'react'
import styled from 'styled-components'

export const Error = () => {
  return (
    <ErrorStyled>Error</ErrorStyled>
  )
}

const ErrorStyled = styled.div`
margin: 0;
padding: 0;
box-sizing: border-box;
display: flex;
flex-direction: column;

height: 80vh;
  
`
