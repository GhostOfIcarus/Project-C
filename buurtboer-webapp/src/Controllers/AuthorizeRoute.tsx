import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProtectedRoutes: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/auth');
                setIsAuthenticated(response.data);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    if (isAuthenticated === null) {
        return null; // Or a loading spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/Login" state={{ from: location }} />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;