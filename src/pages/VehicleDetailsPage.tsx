import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  image: string;
  engineVolume: number;
  transmission: string;
  color: string;
}

interface User {
  name: string;
  email: string;
  role: "customer" | "manager";
}

interface VehicleDetailsPageProps {
  user: User | null;
  onLogout: () => void;
}

const VehicleDetailsPage = ({ user, onLogout }: VehicleDetailsPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    message: "",
  });

  // Моковые данные (в реальном приложении загружали бы с сервера)
  const vehicle: Vehicle = {
    id: "1",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 45000,
    price: 2500000,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
    engineVolume: 2.0,
    transmission: "Автомат",
    color: "Серебристый",
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки заявки
    setTimeout(() => {
      const applications = JSON.parse(
        localStorage.getItem("applications") || "[]",
      );
      const newApplication = {
        id: Date.now().toString(),
        vehicleId: vehicle.id,
        vehicleName: `${vehicle.brand} ${vehicle.model}`,
        customerName: applicationData.name,
        customerEmail: applicationData.email,
        customerPhone: applicationData.phone,
        message: applicationData.message,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      applications.push(newApplication);
      localStorage.setItem("applications", JSON.stringify(applications));

      setIsSubmitting(false);
      alert("Заявка успешно отправлена!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад к каталогу
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Информация об автомобиле */}
          <Card>
            <CardHeader>
              <div className="h-64 overflow-hidden rounded-lg">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl mb-4">
                {vehicle.brand} {vehicle.model}
              </CardTitle>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>{vehicle.year} год</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Gauge" size={16} />
                  <span>{vehicle.mileage.toLocaleString()} км</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Cog" size={16} />
                  <span>{vehicle.engineVolume}л</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Settings" size={16} />
                  <span>{vehicle.transmission}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Palette" size={16} />
                  <span>{vehicle.color}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="text-3xl font-bold text-green-600">
                  {vehicle.price.toLocaleString()} ₽
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Форма заявки */}
          <Card>
            <CardHeader>
              <CardTitle>Оставить заявку</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={applicationData.name}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData.email}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={applicationData.phone}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    value={applicationData.message}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        message: e.target.value,
                      })
                    }
                    placeholder="Дополнительная информация..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
