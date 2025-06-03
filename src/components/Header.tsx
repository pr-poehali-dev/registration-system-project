import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  user?: {
    name: string;
    role: "customer" | "manager";
  } | null;
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Icon name="Car" size={28} className="text-blue-600" />
          <h1
            className="text-2xl font-bold text-gray-900 cursor-pointer"
            onClick={() => navigate("/")}
          >
            АвтоМир
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <Icon name="Home" size={16} />
            <span>Каталог</span>
          </Button>

          {user?.role === "manager" && (
            <Button
              variant={isActive("/manager") ? "default" : "ghost"}
              onClick={() => navigate("/manager")}
              className="flex items-center space-x-2"
            >
              <Icon name="Settings" size={16} />
              <span>Управление</span>
            </Button>
          )}

          {user && (
            <Button
              variant={isActive("/profile") ? "default" : "ghost"}
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2"
            >
              <Icon name="User" size={16} />
              <span>Профиль</span>
            </Button>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700">Привет, {user.name}!</span>
              <Button
                variant="outline"
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <Icon name="LogOut" size={16} />
                <span>Выйти</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="flex items-center space-x-2"
            >
              <Icon name="LogIn" size={16} />
              <span>Войти</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
