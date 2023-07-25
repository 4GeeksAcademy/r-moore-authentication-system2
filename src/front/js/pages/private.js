import React, { useState, useEffect } from 'react';

// Private Component
export const Private = () => {
  const handleLogout = () => {
    // Remove token from sessionStorage
    sessionStorage.removeItem('token');
    // Redirect to home page
    window.location.href = '/';
  };

  useEffect(() => {
    // Check if token exists in sessionStorage
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Redirect to login page if token doesn't exist
      window.location.href = '/login';
    }
  }, []);

  return (
    <div>
      <h2>Private Page</h2>
    </div>
  );
};