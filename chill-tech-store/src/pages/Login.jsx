import { useAuth } from '../context/AuthContext';
import '../styles/style.css';

const Login = () => {
    const { user, login } = useAuth();

    return (
        <div className="neon-container">
            <h2 className="neon-title">Login</h2>
            {user ? (
                <p>Sudah login sebagai {user.email}</p>
            ) : (
                <button className="neon-button" onClick={login}>Login dengan Google</button>
            )}
        </div>
    );
};

export default Login;
