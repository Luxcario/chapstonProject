// src/pages/Checkout.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/style.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedGame = location.state?.game;
    const [accountInfo, setAccountInfo] = useState({});
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(null);

    const gamePrices = {
        'Point Blank': [
            { value: 1200, price: 10000 },
            { value: 2400, price: 20000 },
            { value: 6000, price: 50000 },
            { value: 12000, price: 100000 },
            { value: 24000, price: 200000 },
        ],
        'Free Fire': [
            { value: 5, price: 1000 },
            { value: 10, price: 2000 },
            { value: 25, price: 5000 },
            { value: 60, price: 10000 },
            { value: 120, price: 20000 },
            { value: 300, price: 45000 },
            { value: 500, price: 50000 },
            { value: 700, price: 100000 },
        ],
        'PUBG Mobile': [
            { value: 60, price: 15000 },
            { value: 120, price: 30000 },
            { value: 180, price: 45000 },
            { value: 240, price: 60000 },
            { value: 325, price: 75000 },
            { value: 445, price: 105000 },
        ],
        'Valorant': [
            { value: 475, price: 55000 },
            { value: 950, price: 115000 },
            { value: 1000, price: 120000 },
            { value: 1475, price: 170000 },
            { value: 2050, price: 230000 },
        ],
        'Genshin Impact': [
            { value: 60, price: 15000 },
            { value: 330, price: 65000 },
            { value: 1090, price: 200000 },
            { value: 2240, price: 420000 },
            { value: 3880, price: 650000 },
            { value: 8080, price: 1300000 },
        ],
        'Mobile Legends': [
            { value: 5, price: 2000 },
            { value: 14, price: 5000 },
            { value: 36, price: 10000 },
            { value: 71, price: 20000 },
            { value: 100, price: 30000 },
            { value: 148, price: 40000 },
            { value: 176, price: 50000 },
            { value: 370, price: 100000 },
            { value: 4000, price: 1000000 },
        ],
    };

    useEffect(() => {
        if (!selectedGame) {
            alert('Pilih game terlebih dahulu dari halaman utama.');
            navigate('/');
        }
    }, [selectedGame]);

    const handleChange = (field, value) => {
        setAccountInfo({ ...accountInfo, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedPrice) return alert('Pilih nominal top-up!');
        navigate('/review', {
            state: {
                game: selectedGame,
                accountInfo,
                email,
                phone,
                selectedPrice // kirim value & price
            }
        });
    };

    const renderAccountInputs = () => {
        const label = selectedGame?.name;
        if (!label) return null;

        switch (label) {
            case 'Mobile Legends':
                return (
                    <>
                        <input type="text" placeholder="ID" onChange={(e) => handleChange('id', e.target.value)} required />
                        <input type="text" placeholder="Server" onChange={(e) => handleChange('server', e.target.value)} required />
                    </>
                );
            case 'Genshin Impact':
                return (
                    <>
                        <input type="text" placeholder="UID" onChange={(e) => handleChange('uid', e.target.value)} required />
                        <input type="text" placeholder="Server" onChange={(e) => handleChange('server', e.target.value)} required />
                    </>
                );
            default:
                return (
                    <input type="text" placeholder="ID" onChange={(e) => handleChange('id', e.target.value)} required />
                );
        }
    };

    return (
        <div className="neon-container">
            <h2 className="neon-title">Checkout - {selectedGame?.name}</h2>
            <form onSubmit={handleSubmit}>
                {renderAccountInputs()}

                <div className="game-grid">
                    {gamePrices[selectedGame?.name]?.map((item, index) => (
                        <div
                            key={index}
                            className={`game-card ${selectedPrice?.value === item.value ? 'selected' : ''}`}
                            onClick={() => setSelectedPrice(item)}
                        >
                            <p>{item.value}</p>
                            <p>Rp {item.price.toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="No HP" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                <button type="submit" className="neon-button">Lanjutkan</button>
            </form>
        </div>
    );
};

export default Checkout;
