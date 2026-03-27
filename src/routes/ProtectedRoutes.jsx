import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { state } = useContext(AuthContext);

    if (!state.token) {
        return <Navigate to="/login" />;
    }

    let decoded;

    try {
        decoded = JSON.parse(atob(state.token.split(".")[1]));
    } catch {
        return <Navigate to="/login" />;
    }

    if (adminOnly && decoded.role !== "admin") {
        return <Navigate to="/dashboard" />;
    }

    return children;

};

export default ProtectedRoute
