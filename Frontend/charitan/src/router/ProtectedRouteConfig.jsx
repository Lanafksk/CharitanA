import React from "react";
import { Navigate } from "react-router-dom";
import { useAPI } from "../utils/auth/APIContext";

const ProtectedRoute = ({ children, roles }) => {
  const { authToken, userRole } = useAPI();

  // check token
  if (!authToken) {
    console.log("no authToken: " + authToken)
    return <Navigate to="/signin" replace />; //redirect to signin it would be guest home later
  }

  // check role which is able to access or not
  if (roles && roles.length > 0 && !roles.includes(userRole)) {
    console.log("no access allowed: " + authToken);
    console.log("roles: " + roles);
    console.log("userRole: " + userRole);
    return <Navigate to="/signin" replace />; //redirect to signin it would be guest home later
  }

  return children; // render the components when tit has auth Token
};

export default ProtectedRoute;
