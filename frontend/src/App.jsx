import { useEffect } from 'react'
import styled from 'styled-components'
import {Navigate, Route, Routes } from 'react-router-dom'
import { Index } from './pages/Index'
import { NavBar } from './components/NavBar'
import { Error } from './pages/Error'
import { Categoria } from './pages/Categoria'
import {Cliente} from './pages/Cliente'
import {Plato} from './pages/Plato'
import {Orden} from './pages/Orden'
import { Footer } from './components/Footer'
import { GeneralChat } from './pages/GeneralChat'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import io from 'socket.io-client'
import { SV_API_URL } from './config/config'
import { useTokenStore } from './store/tokenContext'
import { profileRequest } from './api/auth'

const socket = io(SV_API_URL, {
  withCredentials: true, // Si es necesario
})

function App() {

  const  logOut = useTokenStore(state => state.logOut)
  const profile = useTokenStore(state => state.profile)

  useEffect(() => {
    if(localStorage.getItem('token')!== null){
      const verifyProfile = async () => {
        const resProfile = await profileRequest()
        if(resProfile.data.response == false){
          logOut()
        }
      }
      verifyProfile()
    }
  },[logOut])


  return (
    <AppStyled>
      
    {profile  && <NavBar />}
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
      <Route path='*' element={ <Error/> } />
      {<Route path='/signup' element={ !profile== false ? <Index /> :<SignUp />  } />} 
      {<Route path='/chat' element={ !profile == false ?  <GeneralChat />:<SignIn />  } />}
      {<Route path='/login' element={ !profile== false ? <Index /> :<SignIn />  } />}
      {<Route path='/categoria' element={ !profile== false ? <Categoria /> :<SignIn />  } />} 
      {<Route path='/cliente' element={ !profile == false ? <Cliente />  : <SignIn />} />}
      {<Route path='/orden' element={ !profile == false ? <Orden />  : <SignIn />} />}
      {<Route path='/plato' element={ !profile == false ? <Plato />  : <SignIn />} />}
      {/*{<Route path='/profile' element={ !profile == false ? <Profile />  : <SignIn />} />}*/}
    </Routes>
    <Footer/>
  </AppStyled>
)
}

export default App

const AppStyled = styled.div`
margin: 0;
padding: 0;
display: flex;
flex-direction: column;
box-sizing: border-box;

`