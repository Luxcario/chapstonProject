import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Review from './pages/Review';
import History from './pages/History';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import './styles/style.css';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
