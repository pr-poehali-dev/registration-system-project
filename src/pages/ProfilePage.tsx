import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Application {
  id: string;
  brand: string;
  model: string;
  createdAt: string;
}

interface User {
  name: string;
  email: string;
  role: "customer" | "manager";
  phone?: string;
  applications?: Application[];
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
  const [applications, setApplications] = useState<Application[]>([
    { id: "1", brand: "Toyota", model: "Camry", createdAt: "2024-01-15" },
    { id: "2", brand: "BMW", model: "X5", createdAt: "2024-01-10" },
    { id: "3", brand: "Mercedes", model: "E-Class", createdAt: "2024-01-05" },
  ]);
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

  const handleDeleteApplication = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту заявку?")) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
    }
  };

  const handleViewApplication = (brand: string, model: string) => {
    // Здесь будет переход к детальной карточке авто
    alert(`Переход к карточке: ${brand} ${model}`);
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

        {/* Раздел заявок */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="FileText" size={20} />
              <span>Мои заявки</span>
              <span className="text-sm font-normal text-gray-500">
                ({applications.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Car" size={16} className="text-gray-500" />
                      <div>
                        <p className="font-medium">
                          {app.brand} {app.model}
                        </p>
                        <p className="text-sm text-gray-500">
                          Создана:{" "}
                          {new Date(app.createdAt).toLocaleDateString("ru-RU")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleViewApplication(app.brand, app.model)
                        }
                      >
                        <Icon name="Eye" size={14} className="mr-1" />
                        Детали
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteApplication(app.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Icon
                  name="FileX"
                  size={48}
                  className="mx-auto mb-2 opacity-50"
                />
                <p>У вас пока нет заявок</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
