import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (id: string) => void;
}

const VehicleCard = ({ vehicle, onViewDetails }: VehicleCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div onClick={() => onViewDetails(vehicle.id)}>
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {vehicle.year} г.
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <CardTitle className="text-lg mb-2">
            {vehicle.brand} {vehicle.model}
          </CardTitle>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Gauge" size={14} />
              <span>{vehicle.mileage.toLocaleString()} км</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Fuel" size={14} />
              <span>
                {vehicle.engineVolume}л, {vehicle.transmission}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Palette" size={14} />
              <span>{vehicle.color}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">
              {vehicle.price.toLocaleString()} ₽
            </div>
            <Button size="sm" className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>Подробнее</span>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default VehicleCard;
