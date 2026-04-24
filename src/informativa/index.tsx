import './index.css'

function Informativa() {
  return (
    <div className="info-page">
      <div className="info-hero">
        <div className="info-rune">✦</div>
        <h1 className="info-title">D&D Magic Items</h1>
        <p className="info-tagline">Tu grimorio digital de objetos magicos</p>
      </div>

      <div className="info-section">
        <h2 className="info-section-title">De que trata</h2>
        <p className="info-text">
          Esta aplicacion te permite explorar los 362 objetos magicos del reglamento de Dungeons & Dragons 5ta edicion (2014).
          Desde pociones de curacion hasta espadas legendarias, cada objeto tiene su descripcion completa y rareza clasificada.
        </p>
      </div>

      <div className="info-cards">
        <div className="info-card">
          <span className="info-card-icon">⚔</span>
          <h3>Explora</h3>
          <p>Lista completa con buscador y filtros por categoria de objeto</p>
        </div>
        <div className="info-card">
          <span className="info-card-icon">★</span>
          <h3>Guarda</h3>
          <p>Agrega tus objetos favoritos para consultarlos cuando quieras</p>
        </div>
        <div className="info-card">
          <span className="info-card-icon">⬡</span>
          <h3>Descubre</h3>
          <p>Usa la Ruleta Magica para obtener un objeto aleatorio sorpresa</p>
        </div>
      </div>

      <div className="info-section">
        <h2 className="info-section-title">Rarezas</h2>
        <div className="rarity-list">
          <div className="rarity-item"><span className="rarity-common">Common</span><span>Objetos basicos accesibles</span></div>
          <div className="rarity-item"><span className="rarity-uncommon">Uncommon</span><span>Un poco mas especiales</span></div>
          <div className="rarity-item"><span className="rarity-rare">Rare</span><span>Objetos de poder considerable</span></div>
          <div className="rarity-item"><span className="rarity-very-rare">Very Rare</span><span>Muy dificiles de conseguir</span></div>
          <div className="rarity-item"><span className="rarity-legendary">Legendary</span><span>Los mas poderosos de todos</span></div>
        </div>
      </div>

      <div className="info-section">
        <h2 className="info-section-title">Fuente</h2>
        <p className="info-text">
          Los datos provienen de la API publica de D&D 5e: <span className="info-link">dnd5eapi.co</span>.
          Esta app es solo para consulta y referencia del juego de rol.
        </p>
      </div>
    </div>
  )
}

export default Informativa