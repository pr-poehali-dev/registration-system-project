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
import { useState } from "react";

interface FilterState {
  brand: string;
  model: string;
  yearFrom: string;
  yearTo: string;
  priceFrom: string;
  priceTo: string;
  mileageFrom: string;
  mileageTo: string;
  transmission: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  vehicleCount: number;
}

const FilterPanel = ({
  isOpen,
  onClose,
  onApplyFilters,
  vehicleCount,
}: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterState>({
    brand: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    priceFrom: "",
    priceTo: "",
    mileageFrom: "",
    mileageTo: "",
    transmission: "",
  });

  const handleInputChange = (field: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      brand: "",
      model: "",
      yearFrom: "",
      yearTo: "",
      priceFrom: "",
      priceTo: "",
      mileageFrom: "",
      mileageTo: "",
      transmission: "",
    };
    setFilters(emptyFilters);
    onApplyFilters(emptyFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <Card className="w-96 h-full m-0 rounded-none shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <span>Фильтры</span>
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 overflow-y-auto h-full pb-20">
          <div className="space-y-2">
            <Label>Марка</Label>
            <Select
              onValueChange={(value) => handleInputChange("brand", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите марку" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Toyota">Toyota</SelectItem>
                <SelectItem value="BMW">BMW</SelectItem>
                <SelectItem value="Mercedes">Mercedes</SelectItem>
                <SelectItem value="Audi">Audi</SelectItem>
                <SelectItem value="Volkswagen">Volkswagen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Модель</Label>
            <Input
              placeholder="Введите модель"
              value={filters.model}
              onChange={(e) => handleInputChange("model", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Год выпуска</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="От"
                value={filters.yearFrom}
                onChange={(e) => handleInputChange("yearFrom", e.target.value)}
              />
              <Input
                placeholder="До"
                value={filters.yearTo}
                onChange={(e) => handleInputChange("yearTo", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Цена, ₽</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="От"
                value={filters.priceFrom}
                onChange={(e) => handleInputChange("priceFrom", e.target.value)}
              />
              <Input
                placeholder="До"
                value={filters.priceTo}
                onChange={(e) => handleInputChange("priceTo", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Пробег, км</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="От"
                value={filters.mileageFrom}
                onChange={(e) =>
                  handleInputChange("mileageFrom", e.target.value)
                }
              />
              <Input
                placeholder="До"
                value={filters.mileageTo}
                onChange={(e) => handleInputChange("mileageTo", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Коробка передач</Label>
            <Select
              onValueChange={(value) =>
                handleInputChange("transmission", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Автомат">Автомат</SelectItem>
                <SelectItem value="Механика">Механика</SelectItem>
                <SelectItem value="Вариатор">Вариатор</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t space-y-2">
          <Button
            onClick={handleApplyFilters}
            className="w-full"
            disabled={vehicleCount === 0}
          >
            {vehicleCount === 0
              ? "Ничего не найдено"
              : `Показать ${vehicleCount} автомобилей`}
          </Button>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full"
          >
            Сбросить фильтры
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FilterPanel;
