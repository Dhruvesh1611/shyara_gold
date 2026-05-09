// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, allowedRoles }) => {
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role');

//     if (!token) {
//         return <Navigate to="/login" />;
//     }

//     if (!allowedRoles.includes(userRole)) {
//         return <Navigate to="/home" />;
//     }

//     return <Component />;
// };

// export default ProtectedRoute;
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../utils/auth';

// ProtectedRoute component to handle authentication and role-based routing
const ProtectedRoute = ({ requiredRole }) => {
  // Check if user is authenticated
  const authenticated = isAuthenticated();

  // If role is required, check if user has that role
  const authorized = requiredRole ? hasRole(requiredRole) : true;

  // If not authenticated, redirect to login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but not authorized (wrong role), redirect to home
  if (authenticated && !authorized) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
