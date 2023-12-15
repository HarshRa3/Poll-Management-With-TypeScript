import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const checkAuthentication = () => {
      if (token) {
        if (role === 'Guest') {
          navigate('/userPoll');
        } else if (role === 'Admin') {
          navigate('/admin');
        }
      } else if (token === null) {
        navigate('/');
      }
    };

    checkAuthentication();
  }, [token, role]);

  return <>{children}</>; 
};

export default Protected;
