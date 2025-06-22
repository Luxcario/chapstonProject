import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { user, loginWithGoogle, logout } = useAuth();

    return (
        <>
            <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#111', color: '#0ff' }}>
                <Link to="/">Home</Link>
                <Link to="/history">Riwayat</Link>
                {user ? (
                    <>
                        <span>{user.email}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <button onClick={loginWithGoogle}>Login</button>
                )}
            </nav>
            <Outlet />
        </>
    );
};

export default Layout;
