// src/pages/Landing.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const gameList = [
    { name: 'Mobile Legends', category: 'moba', image: 'mobileLegends.jpeg' },
    { name: 'Valorant', category: 'fps', image: 'valorant.png' },
    { name: 'Genshin Impact', category: 'rpg', image: 'genshinimpact.jpeg' },
    { name: 'PUBG Mobile', category: 'fps', image: 'pubg.jpeg' },
    { name: 'Free Fire', category: 'fps', image: 'freefire.jpeg' },
    { name: 'Point Blank', category: 'fps', image: 'pointblank.jpeg' },
];

const Landing = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    const filteredGames = gameList.filter(game => {
        const matchSearch = game.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = filter === 'all' || game.category === filter;
        return matchSearch && matchCategory;
    });

    return (
        <div className="landing-container">
            <header className="banner">
                <h1>Chill Tech Store</h1>
                <p>Top-up game favoritmu dengan mudah dan cepat!</p>
            </header>

            <div className="controls">
                <input
                    type="text"
                    placeholder="Cari game..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search-box"
                />
                <select onChange={e => setFilter(e.target.value)} value={filter} className="filter-select">
                    <option value="all">Semua</option>
                    <option value="fps">FPS</option>
                    <option value="moba">MOBA</option>
                    <option value="rpg">RPG</option>
                </select>
            </div>

            <div className="game-grid">
                {filteredGames.map((game, index) => (
                    <div key={index} className="game-card" onClick={() => navigate('/checkout', { state: game })}>
                        <img src={`/assets/img/${game.image}`} alt={game.name} />
                        <h3>{game.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Landing;
