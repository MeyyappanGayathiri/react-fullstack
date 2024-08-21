import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import {Route, Routes} from 'react-router-dom'
import Registration from './pages/registration'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Registration/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
  )
}

export default App
