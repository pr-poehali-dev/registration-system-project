import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface User {
  name: string;
  email: string;
  role: "customer" | "manager";
}

interface AddVehiclePageProps {
  user: User | null;
  onLogout: () => void;
}

const AddVehiclePage = ({ user, onLogout }: AddVehiclePageProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    image: "",
    engineVolume: "",
    transmission: "",
    color: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация добавления автомобиля
    setTimeout(() => {
      const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
      const newVehicle = {
        id: Date.now().toString(),
        brand: vehicleData.brand,
        model: vehicleData.model,
        year: parseInt(vehicleData.year),
        mileage: parseInt(vehicleData.mileage),
        price: parseInt(vehicleData.price),
        image:
          vehicleData.image ||
          "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400",
        engineVolume: parseFloat(vehicleData.engineVolume),
        transmission: vehicleData.transmission,
        color: vehicleData.color,
      };

      vehicles.push(newVehicle);
      localStorage.setItem("vehicles", JSON.stringify(vehicles));

      setIsSubmitting(false);
      alert("Автомобиль успешно добавлен в каталог!");
      navigate("/");
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setVehicleData({ ...vehicleData, [field]: value });
  };

  if (user?.role !== "manager") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <Icon
              name="AlertCircle"
              size={48}
              className="mx-auto mb-4 text-red-500"
            />
            <h2 className="text-xl font-bold mb-2">Доступ запрещен</h2>
            <p className="text-gray-600 mb-4">
              Только менеджеры могут добавлять автомобили
            </p>
            <Button onClick={() => navigate("/")}>Вернуться к каталогу</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад к каталогу
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Добавить автомобиль</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Марка</Label>
                  <Input
                    id="brand"
                    value={vehicleData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    placeholder="Toyota"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="model">Модель</Label>
                  <Input
                    id="model"
                    value={vehicleData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    placeholder="Camry"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Год выпуска</Label>
                  <Input
                    id="year"
                    type="number"
                    value={vehicleData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    placeholder="2020"
                    min="1990"
                    max="2024"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="mileage">Пробег (км)</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={vehicleData.mileage}
                    onChange={(e) =>
                      handleInputChange("mileage", e.target.value)
                    }
                    placeholder="45000"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Цена (₽)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={vehicleData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="2500000"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="engineVolume">Объем двигателя (л)</Label>
                  <Input
                    id="engineVolume"
                    type="number"
                    step="0.1"
                    value={vehicleData.engineVolume}
                    onChange={(e) =>
                      handleInputChange("engineVolume", e.target.value)
                    }
                    placeholder="2.0"
                    min="0.5"
                    max="10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transmission">Коробка передач</Label>
                  <Select
                    value={vehicleData.transmission}
                    onValueChange={(value) =>
                      handleInputChange("transmission", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Механика">Механика</SelectItem>
                      <SelectItem value="Автомат">Автомат</SelectItem>
                      <SelectItem value="Вариатор">Вариатор</SelectItem>
                      <SelectItem value="Робот">Робот</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color">Цвет</Label>
                  <Input
                    id="color"
                    value={vehicleData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    placeholder="Серебристый"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">URL изображения</Label>
                <Input
                  id="image"
                  value={vehicleData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg (необязательно)"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Добавление..." : "Добавить автомобиль"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddVehiclePage;
