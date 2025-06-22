// src/pages/History.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../services/firebase';
import '../styles/style.css';

const History = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => {
                console.log("doc =>", doc.id, doc.data());
                return doc.data();
            });
            setTransactions(data);
        };

        fetchTransactions();
    }, []);

    return (
        <div className="neon-container">
            <h2 className="neon-title">Riwayat Transaksi</h2>
            {transactions.length === 0 ? (
                <p className="neon-text">Tidak ada transaksi.</p>
            ) : (
                <ul className="history-list">
                    {transactions.map((t, index) => (
                        <li key={index} className="history-card">
                            <p><strong>Game:</strong> {t.game?.name || t.game}</p>
                            {t.accountInfo?.id && <p><strong>ID Pemain:</strong> {t.accountInfo.id}</p>}
                            {t.accountInfo?.uid && <p><strong>UID:</strong> {t.accountInfo.uid}</p>}
                            {t.accountInfo?.server && <p><strong>Server:</strong> {t.accountInfo.server}</p>}
                            <p><strong>Email:</strong> {t.email}</p>
                            <p><strong>No HP:</strong> {t.phone}</p>
                            <p><strong>Nominal:</strong> {t.selectedPrice?.value}</p>
                            <p><strong>Harga:</strong> Rp {t.selectedPrice?.price?.toLocaleString()}</p>
                            <p><strong>Metode Pembayaran:</strong> {t.paymentMethod || 'Belum dipilih'}</p>
                            <p><strong>Tanggal:</strong> {new Date(t.createdAt?.seconds * 1000).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default History;
