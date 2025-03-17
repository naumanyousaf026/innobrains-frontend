import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    // Agar token nahi hai, login page par redirect karein
    return <Navigate to="/login" />;
  }

  // Agar token hai, to children ko render karein (admin page)
  return children;
};

export default ProtectedRoute;
