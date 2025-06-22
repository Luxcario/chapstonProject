import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/style.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/'); // Redirect ke Home
        } catch (error) {
            console.error('Gagal logout:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="navbar-logo-text">Chill Tech Store</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {user && <Link to="/history">Riwayat</Link>}
                {user ? (
                    <button onClick={handleLogout} className="neon-button">Logout</button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
