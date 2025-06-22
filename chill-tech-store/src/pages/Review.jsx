import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/style.css';

const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');

    const { game, accountInfo, email, phone, selectedPrice } = location.state || {};

    // 🛑 Cek validitas data
    useEffect(() => {
        if (!game || !selectedPrice || !accountInfo || !email || !phone) {
            alert("Data transaksi tidak lengkap. Kembali ke halaman utama.");
            navigate('/');
        }
    }, []);

    const handleSubmit = async () => {
        if (!paymentMethod) {
            alert("Pilih metode pembayaran terlebih dahulu.");
            return;
        }

        const transactions = {
            game: game.name,
            accountInfo,
            email,
            phone,
            nominal: selectedPrice,
            paymentMethod,
            createdAt: serverTimestamp()
        };

        try {
            await addDoc(collection(db, "transactions"), {
                game: game.name,
                accountInfo,
                email,
                phone,
                nominal: selectedPrice.value,
                price: selectedPrice.price,
                paymentMethod,
                createdAt: serverTimestamp()
            });
            navigate('/history');
        } catch (error) {
            console.error("Gagal menyimpan transaksi:", error);
            alert("Terjadi kesalahan saat menyimpan transaksi.");
        }
    };

    return (
        <div className="neon-container">
            <h2 className="neon-title">Review Transaksi</h2>
            <p><strong>Game:</strong> {game?.name}</p>
            {accountInfo?.id && <p><strong>ID:</strong> {accountInfo.id}</p>}
            {accountInfo?.uid && <p><strong>UID:</strong> {accountInfo.uid}</p>}
            {accountInfo?.server && <p><strong>Server:</strong> {accountInfo.server}</p>}
            <p><strong>Email:</strong> {email}</p>
            <p><strong>No HP:</strong> {phone}</p>
            <p><strong>Nominal:</strong> {selectedPrice?.value}</p>
            <p><strong>Harga:</strong> Rp {selectedPrice?.price?.toLocaleString()}</p>

            <h3>Pilih Metode Pembayaran</h3>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} required>
                <option value="">-- Pilih --</option>
                <option value="Dana">Dana</option>
                <option value="OVO">OVO</option>
                <option value="Gopay">Gopay</option>
                <option value="Transfer Bank">Transfer Bank</option>
            </select>

            <button onClick={handleSubmit} className="neon-button">Bayar</button>
        </div>
    );
};

export default Review;
