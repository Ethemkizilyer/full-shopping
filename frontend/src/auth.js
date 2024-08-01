export const isAuthenticated = () => {
    return localStorage.getItem('profile') !== null;
  };
  