import { createContext, useContext, useEffect, useState } from 'react';
import { auth, loginWithGoogle, logout as firebaseLogout } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
        });

        // Hapus cache login saat refresh atau tab ditutup
        window.addEventListener('beforeunload', () => {
            setUser(null);
        });

        return () => unsubscribe();
    }, []);

    const login = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error("Login gagal:", error);
        }
    };

    const logout = async () => {
        try {
            await firebaseLogout();
            setUser(null);
        } catch (error) {
            console.error("Logout gagal:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
