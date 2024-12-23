import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './auth/protectedRoute';
import { routerLinks } from '../src/utils/routerLinks';
import Dashboard from './components/Dashboard';

function RoutePage() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route 
                path="/" 
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                {routerLinks.map((link) => (
                    <Route
                        key={link.id}
                        path={link.path}
                        element={<ProtectedRoute>{link.element}</ProtectedRoute>}
                    />
                ))}
            </Route>
        </Routes>
    );
}

export default RoutePage;
