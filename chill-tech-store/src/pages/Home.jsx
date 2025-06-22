import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const games = [
    { id: 'pb', name: 'Point Blank', image: '/images/pointblank.png' },
    { id: 'ff', name: 'Free Fire', image: '/images/freefire.jpeg' },
    { id: 'ml', name: 'Mobile Legends', image: '/images/mobilelegends.jpg' },
    { id: 'pubg', name: 'PUBG Mobile', image: '/images/pubg.png' },
    { id: 'valorant', name: 'Valorant', image: '/images/valorant.png' },
    { id: 'genshin', name: 'Genshin Impact', image: '/images/genshin.jpeg' },
];

const Home = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const handleSelectGame = (game) => {
        if (!user) {
            alert('Silakan login terlebih dahulu.');
            login();
        } else {
            navigate('/checkout', { state: { game } });
        }
    };

    return (
        <div className="neon-container">
            <h2 className="neon-title">Pilih Game</h2>
            <div className="game-grid">
                {games.map((game) => (
                    <div className="game-card" key={game.id} onClick={() => handleSelectGame(game)}>
                        <img src={game.image} alt={game.name} />
                        <p>{game.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
