import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface User {
  name: string;
  email: string;
  role: "customer" | "manager";
  phone?: string;
}

interface ProfilePageProps {
  user: User | null;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}

const ProfilePage = ({ user, onLogout, onUpdateUser }: ProfilePageProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Имитация сохранения
    setTimeout(() => {
      const updatedUser = {
        ...user!,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      onUpdateUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsSaving(false);
      setIsEditing(false);
      alert("Профиль успешно обновлен!");
    }, 500);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад к каталогу
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Icon name="User" size={20} />
                <span>Профиль пользователя</span>
              </CardTitle>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="+7 (999) 123-45-67"
                />
                {!formData.phone && (
                  <p className="text-sm text-yellow-600 mt-1">
                    <Icon
                      name="AlertTriangle"
                      size={14}
                      className="inline mr-1"
                    />
                    Заполните телефон для оформления заявок
                  </p>
                )}
              </div>

              <div>
                <Label>Роль</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Icon
                    name={user.role === "manager" ? "Shield" : "User"}
                    size={16}
                    className="text-gray-500"
                  />
                  <span className="capitalize">
                    {user.role === "manager" ? "Менеджер" : "Клиент"}
                  </span>
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-2 pt-4">
                  <Button type="submit" disabled={isSaving} className="flex-1">
                    {isSaving ? "Сохранение..." : "Сохранить"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
