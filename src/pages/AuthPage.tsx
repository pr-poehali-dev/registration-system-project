import { useState } from "react";
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

interface AuthPageProps {
  onAuth: (user: {
    name: string;
    email: string;
    role: "customer" | "manager";
  }) => void;
}

const AuthPage = ({ onAuth }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer" as "customer" | "manager",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!validateEmail(formData.email)) {
      newErrors.push("Неправильный формат email");
    }

    if (formData.password.length < 6) {
      newErrors.push("Пароль должен содержать минимум 6 символов");
    }

    if (!isLogin && !formData.name.trim()) {
      newErrors.push("Имя обязательно для заполнения");
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      // Имитация проверки существующего пользователя при авторизации
      if (isLogin && formData.email === "existing@example.com") {
        setErrors(["Неправильный email или пароль"]);
        return;
      }

      // Имитация проверки уникальности email при регистрации
      if (!isLogin && formData.email === "duplicate@example.com") {
        setErrors(["Пользователь с таким email уже существует"]);
        return;
      }

      onAuth({
        name: formData.name || "Пользователь",
        email: formData.email,
        role: formData.role,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Icon name="Car" size={48} className="text-blue-600" />
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? "Вход в систему" : "Регистрация"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Введите email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label>Роль</Label>
                <Select
                  onValueChange={(value: "customer" | "manager") =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Покупатель</SelectItem>
                    <SelectItem value="manager">Менеджер</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-600 text-sm">
                    {error}
                  </p>
                ))}
              </div>
            )}

            <Button type="submit" className="w-full">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600"
            >
              {isLogin
                ? "Нет аккаунта? Зарегистрироваться"
                : "Уже зарегистрированы? Войти"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
