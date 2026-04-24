import { useState, useEffect } from 'react'
import './index.css'

function Usuario() {
  const [name, setName] = useState('')
  const [savedName, setSavedName] = useState('')
  const [favCount, setFavCount] = useState(0)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('username') || ''
    setSavedName(stored)
    setName(stored)
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavCount(favs.length)
  }, [])

  function saveName() {
    localStorage.setItem('username', name)
    setSavedName(name)
    setEditing(false)
  }

  function clearFavorites() {
    localStorage.removeItem('favorites')
    setFavCount(0)
  }

  return (
    <div>
      <h2 className="page-title">Mi Perfil</h2>

      <div className="usuario-avatar">
        <div className="avatar-circle">
          {savedName ? savedName[0].toUpperCase() : '?'}
        </div>
        <p className="usuario-name">{savedName || 'Aventurero sin nombre'}</p>
        <p className="usuario-sub">Explorador de objetos magicos</p>
      </div>

      <div className="usuario-stats">
        <div className="stat-box">
          <span className="stat-number">{favCount}</span>
          <span className="stat-label">Favoritos</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">362</span>
          <span className="stat-label">Objetos totales</span>
        </div>
      </div>

      <div className="usuario-section">
        <h3 className="usuario-section-title">Nombre de aventurero</h3>
        {editing ? (
          <div className="edit-row">
            <input
              className="search-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Tu nombre..."
            />
            <button className="modal-fav-btn" onClick={saveName}>Guardar</button>
            <button className="modal-close" onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        ) : (
          <button className="modal-close" onClick={() => setEditing(true)}>
            {savedName ? 'Cambiar nombre' : 'Agregar nombre'}
          </button>
        )}
      </div>

      <div className="usuario-section">
        <h3 className="usuario-section-title">Datos guardados</h3>
        <p className="info-text" style={{ marginBottom: 12 }}>
          Tienes {favCount} objeto{favCount !== 1 ? 's' : ''} en favoritos guardados en este dispositivo.
        </p>
        <button
          className="modal-close"
          style={{ color: '#cc4444', borderColor: '#cc4444' }}
          onClick={clearFavorites}
          disabled={favCount === 0}
        >
          Limpiar favoritos
        </button>
      </div>
    </div>
  )
}

export default Usuario