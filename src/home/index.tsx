import { useState, useEffect } from 'react'
import './index.css'

interface Item {
  index: string
  name: string
  url: string
}

interface ItemDetail {
  name: string
  rarity: { name: string }
  desc: string[]
  equipment_category?: { name: string }
}

function getRarityClass(rarity: string) {
  const r = rarity.toLowerCase().replace(' ', '-')
  return `rarity-${r}`
}

const CATEGORIES = ['Todos', 'Armor', 'Potion', 'Ring', 'Rod', 'Scroll', 'Staff', 'Wand', 'Weapon', 'Wondrous']

function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [selected, setSelected] = useState<ItemDetail | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/2014/magic-items')
      .then(r => r.json())
      .then(data => setItems(data.results))
      .catch(err => console.error('Error cargando items:', err))
  }, [])

  const filtered = items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'Todos' || item.name.toLowerCase().includes(category.toLowerCase())
    return matchSearch && matchCat
  })

  function openDetail(item: Item) {
    setLoadingDetail(true)
    fetch(`https://www.dnd5eapi.co${item.url}`)
      .then(r => r.json())
      .then(data => {
        setSelected(data)
        setLoadingDetail(false)
      })
      .catch(() => setLoadingDetail(false))
  }

  function addFavorite(item: ItemDetail) {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    const exists = stored.find((f: ItemDetail) => f.name === item.name)
    if (!exists) {
      localStorage.setItem('favorites', JSON.stringify([...stored, item]))
    }
    setSelected(null)
  }

  return (
    <div>
      <h2 className="page-title">Objetos Magicos</h2>

      <input
        className="search-input"
        placeholder="Buscar objeto..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="filter-row">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="counter-text">{filtered.length} objetos encontrados</p>

      {filtered.map(item => (
        <div key={item.index} className="item-card" onClick={() => openDetail(item)}>
          <span className="item-name">{item.name}</span>
          <span className="item-rarity">Ver detalle</span>
        </div>
      ))}

      {loadingDetail && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p className="loading">Cargando...</p>
          </div>
        </div>
      )}

      {selected && !loadingDetail && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{selected.name}</h3>
            <p className={`modal-rarity ${getRarityClass(selected.rarity?.name || 'common')}`}>
              Rareza: {selected.rarity?.name || 'Desconocida'}
            </p>
            {selected.equipment_category && (
              <p className="modal-rarity" style={{ color: 'var(--text-muted)', marginBottom: 12 }}>
                Categoria: {selected.equipment_category.name}
              </p>
            )}
            <div className="modal-desc">
              {selected.desc?.map((line, i) => <p key={i} style={{ marginBottom: 8 }}>{line}</p>)}
            </div>
            <button className="modal-fav-btn" onClick={() => addFavorite(selected)}>
              Guardar en Favoritos
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

export default Home