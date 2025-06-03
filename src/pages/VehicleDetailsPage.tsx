import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  bodyType: string;
  engineType: string;
  driveType: string;
  horsepower: number;
  acceleration: number;
}

interface User {
  name: string;
  email: string;
  role: "customer" | "manager";
  phone?: string;
}

interface VehicleDetailsPageProps {
  user: User | null;
  onLogout: () => void;
}

const VehicleDetailsPage = ({ user, onLogout }: VehicleDetailsPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Расширенные моковые данные
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
    bodyType: "Седан",
    engineType: "Бензин",
    driveType: "Передний",
    horsepower: 150,
    acceleration: 9.2,
  };

  const hasContactData = user?.phone && user.phone.trim() !== "";

  const handleConfirmApplication = async () => {
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
        customerName: user?.name,
        customerEmail: user?.email,
        customerPhone: user?.phone,
        message: "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      applications.push(newApplication);
      localStorage.setItem("applications", JSON.stringify(applications));

      setIsSubmitting(false);
      setDialogOpen(false);
      alert("Заявка успешно отправлена!");
      navigate("/");
    }, 1000);
  };

  const vehicleSpecs = [
    { label: "Марка", value: vehicle.brand, icon: "Car" },
    { label: "Модель", value: vehicle.model, icon: "Tag" },
    { label: "Год выпуска", value: `${vehicle.year}`, icon: "Calendar" },
    {
      label: "Пробег",
      value: `${vehicle.mileage.toLocaleString()} км`,
      icon: "Gauge",
    },
    { label: "КПП", value: vehicle.transmission, icon: "Settings" },
    { label: "Кузов", value: vehicle.bodyType, icon: "Box" },
    { label: "Двигатель", value: vehicle.engineType, icon: "Zap" },
    {
      label: "Объем двигателя",
      value: `${vehicle.engineVolume}л`,
      icon: "Cog",
    },
    { label: "Привод", value: vehicle.driveType, icon: "Compass" },
    { label: "Мощность", value: `${vehicle.horsepower} л.с.`, icon: "Zap" },
    {
      label: "Разгон 0-100",
      value: `${vehicle.acceleration} сек`,
      icon: "Timer",
    },
    { label: "Цвет", value: vehicle.color, icon: "Palette" },
  ];

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {vehicleSpecs.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon
                      name={spec.icon as any}
                      size={16}
                      className="text-gray-500"
                    />
                    <span className="font-medium">{spec.label}:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="text-3xl font-bold text-green-600">
                  {vehicle.price.toLocaleString()} ₽
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Заявка */}
          <Card>
            <CardHeader>
              <CardTitle>Оформление заявки</CardTitle>
            </CardHeader>
            <CardContent>
              {hasContactData ? (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      Оформить заявку
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Подтвердить заявку</DialogTitle>
                      <DialogDescription>
                        Вы уверены, что хотите оформить заявку на{" "}
                        {vehicle.brand} {vehicle.model}? Заявка будет отправлена
                        на рассмотрение менеджеру.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Отмена
                      </Button>
                      <Button
                        onClick={handleConfirmApplication}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Отправка..." : "Подтвердить"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    Чтобы оформить заявку, нужно заполнить контактные данные
                  </p>
                  <Button
                    onClick={() => navigate("/profile")}
                    variant="outline"
                    className="w-full"
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Заполнить контакты
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
