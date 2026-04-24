import { useState, useEffect } from 'react'
import './index.css'

interface ItemDetail {
  name: string
  rarity: { name: string }
  desc: string[]
}

function getRarityClass(rarity: string) {
  const r = rarity.toLowerCase().replace(' ', '-')
  return `rarity-${r}`
}

function Favoritos() {
  const [favorites, setFavorites] = useState<ItemDetail[]>([])
  const [selected, setSelected] = useState<ItemDetail | null>(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(stored)
  }, [])

  function removeFavorite(name: string) {
    const updated = favorites.filter(f => f.name !== name)
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
    if (selected?.name === name) setSelected(null)
  }

  return (
    <div>
      <h2 className="page-title">Mis Favoritos</h2>

      {favorites.length === 0 && (
        <p className="loading">No tienes objetos guardados aun. Busca uno en Inicio.</p>
      )}

      {favorites.map((item, i) => (
        <div key={i} className="item-card" onClick={() => setSelected(item)}>
          <span className="item-name">{item.name}</span>
          <span className={`item-rarity ${getRarityClass(item.rarity?.name || 'common')}`}>
            {item.rarity?.name || 'Common'}
          </span>
        </div>
      ))}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{selected.name}</h3>
            <p className={`modal-rarity ${getRarityClass(selected.rarity?.name || 'common')}`}>
              Rareza: {selected.rarity?.name || 'Desconocida'}
            </p>
            <div className="modal-desc">
              {selected.desc?.map((line, i) => <p key={i} style={{ marginBottom: 8 }}>{line}</p>)}
            </div>
            <button
              className="modal-fav-btn"
              style={{ background: '#8b2020' }}
              onClick={() => removeFavorite(selected.name)}
            >
              Eliminar de Favoritos
            </button>
            <button className="modal-close" onClick={() => setSelected(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Favoritos