import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import Informativa from './informativa'
import Original from './original'
import Usuario from './usuario'
import Home from './home'
import Favoritos from './favoritos'
import './App.css'
 
function App() {
  return (
    <>
      <Router>
        <nav className="c-menu">
          <Link to="/">
            <img src="https://cdn-icons-png.flaticon.com/512/1808/1808442.png" />
            <p>Inicio</p>
          </Link>
          <Link to="/favoritos">
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" />
            <p>Favoritos</p>
          </Link>
          <Link to="/original">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
            <p>Ruleta</p>
          </Link>
          <Link to="/informativa">
            <img src="https://cdn-icons-png.flaticon.com/512/157/157933.png" />
            <p>Info</p>
          </Link>
          <Link to="/usuario">
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" />
            <p>Perfil</p>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/original" element={<Original />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </Router>
    </>
  )
}
 
export default App