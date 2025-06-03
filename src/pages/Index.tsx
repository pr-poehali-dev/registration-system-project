import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthPage from "./AuthPage";
import CatalogPage from "./CatalogPage";

interface User {
  name: string;
  email: string;
  role: "customer" | "manager";
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, есть ли сохраненный пользователь в localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuth = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return <CatalogPage user={user} onLogout={handleLogout} />;
};

export default Index;
