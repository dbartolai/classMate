// src/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext"; // import your custom hook

const ProtectedRoute = () => {
  const { user } = useUser();

  if (user === undefined) {
    return <div>Loading...</div>
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
