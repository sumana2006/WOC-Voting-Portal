import React from 'react';
import { Navigate } from 'react-router-dom';
import {useEvmStore} from '../store/zustand';

function ProtectedRoute({ children }) {
    const evmId = useEvmStore((state) => state.evmId);
    if (!evmId) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
