import { useState } from "react";
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import FilterPanel from "@/components/FilterPanel";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

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

interface CatalogPageProps {
  user: User | null;
  onLogout: () => void;
}

const CatalogPage = ({ user, onLogout }: CatalogPageProps) => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  // Моковые данные автомобилей
  const mockVehicles: Vehicle[] = [
    {
      id: "1",
      brand: "Toyota",
      model: "Camry",
      year: 2020,
      mileage: 45000,
      price: 2500000,
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
      engineVolume: 2.0,
      transmission: "Автомат",
      color: "Белый",
    },
    {
      id: "2",
      brand: "BMW",
      model: "X5",
      year: 2019,
      mileage: 32000,
      price: 4200000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      engineVolume: 3.0,
      transmission: "Автомат",
      color: "Черный",
    },
    {
      id: "3",
      brand: "Mercedes",
      model: "E-Class",
      year: 2021,
      mileage: 18000,
      price: 3800000,
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400",
      engineVolume: 2.0,
      transmission: "Автомат",
      color: "Серебристый",
    },
    {
      id: "4",
      brand: "Audi",
      model: "A6",
      year: 2018,
      mileage: 67000,
      price: 2900000,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400",
      engineVolume: 2.0,
      transmission: "Автомат",
      color: "Синий",
    },
    {
      id: "5",
      brand: "Volkswagen",
      model: "Passat",
      year: 2019,
      mileage: 38000,
      price: 2100000,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400",
      engineVolume: 1.8,
      transmission: "Механика",
      color: "Красный",
    },
    {
      id: "6",
      brand: "Toyota",
      model: "Corolla",
      year: 2020,
      mileage: 22000,
      price: 1800000,
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400",
      engineVolume: 1.6,
      transmission: "Вариатор",
      color: "Белый",
    },
  ];

  useState(() => {
    setFilteredVehicles(mockVehicles);
  });

  const handleApplyFilters = (filters: any) => {
    let filtered = mockVehicles;

    if (filters.brand) {
      filtered = filtered.filter((v) => v.brand === filters.brand);
    }
    if (filters.model) {
      filtered = filtered.filter((v) =>
        v.model.toLowerCase().includes(filters.model.toLowerCase()),
      );
    }
    if (filters.yearFrom) {
      filtered = filtered.filter((v) => v.year >= parseInt(filters.yearFrom));
    }
    if (filters.yearTo) {
      filtered = filtered.filter((v) => v.year <= parseInt(filters.yearTo));
    }
    if (filters.priceFrom) {
      filtered = filtered.filter((v) => v.price >= parseInt(filters.priceFrom));
    }
    if (filters.priceTo) {
      filtered = filtered.filter((v) => v.price <= parseInt(filters.priceTo));
    }
    if (filters.transmission) {
      filtered = filtered.filter(
        (v) => v.transmission === filters.transmission,
      );
    }

    setFilteredVehicles(filtered);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/vehicle/${id}`);
  };

  const handleAddVehicle = () => {
    navigate("/add-vehicle");
  };

  const handleManageApplications = () => {
    navigate("/manager");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Каталог автомобилей
            </h1>
            <p className="text-gray-600">
              Найдено {filteredVehicles.length} автомобилей
            </p>
          </div>

          <Button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2"
          >
            <Icon name="Filter" size={16} />
            <span>Фильтры</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Icon
              name="SearchX"
              size={48}
              className="text-gray-400 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Автомобили не найдены
            </h3>
            <p className="text-gray-600">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}
      </main>

      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        vehicleCount={filteredVehicles.length}
      />
    </div>
  );
};

export default CatalogPage;
