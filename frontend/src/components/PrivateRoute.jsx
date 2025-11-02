import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentUser } from '../redux/authSlice';

const PrivateRoute = () => {
  // Get the current user info from the Redux state
  const userInfo = useSelector(selectCurrentUser);

  // Check if user is logged in
  // If yes, render the child route (e.g., AdminDashboardPage)
  // If no, navigate them to the /login page
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;