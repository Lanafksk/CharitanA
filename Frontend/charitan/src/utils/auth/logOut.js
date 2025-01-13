export const logOut = (navigate) => {
    localStorage.clear();
    console.log("User logged out successfully");
    navigate('/home');
  };