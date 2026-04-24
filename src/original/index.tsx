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
}

function getRarityClass(rarity: string) {
  const r = rarity.toLowerCase().replace(' ', '-')
  return `rarity-${r}`
}

function Original() {
  const [items, setItems] = useState<Item[]>([])
  const [result, setResult] = useState<ItemDetail | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [history, setHistory] = useState<ItemDetail[]>([])

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/2014/magic-items')
      .then(r => r.json())
      .then(data => setItems(data.results))
      .catch(err => console.error('Error:', err))
  }, [])

  function spin() {
    if (items.length === 0 || spinning) return
    setSpinning(true)
    setResult(null)

    const random = items[Math.floor(Math.random() * items.length)]

    fetch(`https://www.dnd5eapi.co${random.url}`)
      .then(r => r.json())
      .then(data => {
        setResult(data)
        setHistory(prev => [data, ...prev].slice(0, 5))
        setSpinning(false)
      })
      .catch(() => setSpinning(false))
  }

  function saveToFavorites() {
    if (!result) return
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    const exists = stored.find((f: ItemDetail) => f.name === result.name)
    if (!exists) {
      localStorage.setItem('favorites', JSON.stringify([...stored, result]))
    }
  }

  return (
    <div>
      <h2 className="page-title">Ruleta Magica</h2>
      <p className="original-subtitle">Descubre un objeto magico aleatorio del arsenal de D&D 5e</p>

      <div className="ruleta-box">
        <div className={`ruleta-icon ${spinning ? 'spinning' : ''}`}>
          {spinning ? '?' : result ? '★' : '⬡'}
        </div>

        {result && !spinning && (
          <div className="ruleta-result">
            <h3 className={`ruleta-name ${getRarityClass(result.rarity?.name || 'common')}`}>
              {result.name}
            </h3>
            <p className="ruleta-rarity">Rareza: {result.rarity?.name || 'Common'}</p>
            <p className="ruleta-desc">{result.desc?.[0]}</p>
            <button className="modal-fav-btn" onClick={saveToFavorites}>
              Guardar en Favoritos
            </button>
          </div>
        )}

        <button className="spin-btn" onClick={spin} disabled={spinning || items.length === 0}>
          {spinning ? 'Girando...' : 'Girar Ruleta'}
        </button>
      </div>

      {history.length > 0 && (
        <div>
          <p className="counter-text" style={{ marginTop: 24 }}>Ultimos obtenidos:</p>
          {history.map((h, i) => (
            <div key={i} className="item-card">
              <span className="item-name">{h.name}</span>
              <span className={`item-rarity ${getRarityClass(h.rarity?.name || 'common')}`}>
                {h.rarity?.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Original