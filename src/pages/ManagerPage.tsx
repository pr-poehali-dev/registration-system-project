import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface User {
  name: string;
  email: string;
  role: "customer" | "manager";
}

interface Application {
  id: string;
  vehicleId: string;
  vehicleName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface ManagerPageProps {
  user: User | null;
  onLogout: () => void;
}

const ManagerPage = ({ user, onLogout }: ManagerPageProps) => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]",
    );
    setApplications(savedApplications);
  }, []);

  const updateApplicationStatus = (
    id: string,
    status: "approved" | "rejected",
  ) => {
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status } : app,
    );
    setApplications(updatedApplications);
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">На рассмотрении</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Одобрено</Badge>;
      case "rejected":
        return <Badge variant="destructive">Отклонено</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const filterApplications = (status?: string) => {
    if (!status) return applications;
    return applications.filter((app) => app.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Панель менеджера</h1>
          <p className="text-gray-600">Управление заявками клиентов</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Все заявки</TabsTrigger>
            <TabsTrigger value="pending">На рассмотрении</TabsTrigger>
            <TabsTrigger value="approved">Одобренные</TabsTrigger>
            <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ApplicationsList
              applications={filterApplications()}
              onUpdateStatus={updateApplicationStatus}
            />
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <ApplicationsList
              applications={filterApplications("pending")}
              onUpdateStatus={updateApplicationStatus}
            />
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <ApplicationsList
              applications={filterApplications("approved")}
              onUpdateStatus={updateApplicationStatus}
            />
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <ApplicationsList
              applications={filterApplications("rejected")}
              onUpdateStatus={updateApplicationStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ApplicationsListProps {
  applications: Application[];
  onUpdateStatus: (id: string, status: "approved" | "rejected") => void;
}

const ApplicationsList = ({
  applications,
  onUpdateStatus,
}: ApplicationsListProps) => {
  if (applications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Icon name="FileX" size={48} className="mx-auto mb-4" />
        <p>Заявок пока нет</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">
                  {application.vehicleName}
                </CardTitle>
                <p className="text-gray-600">
                  Заявка от {application.customerName}
                </p>
              </div>
              {getStatusBadge(application.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Контактная информация:
                </p>
                <p className="text-sm">Email: {application.customerEmail}</p>
                <p className="text-sm">Телефон: {application.customerPhone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Дата подачи:
                </p>
                <p className="text-sm">
                  {new Date(application.createdAt).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </div>

            {application.message && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Сообщение:</p>
                <p className="text-sm bg-gray-50 p-2 rounded">
                  {application.message}
                </p>
              </div>
            )}

            {application.status === "pending" && (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => onUpdateStatus(application.id, "approved")}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Icon name="Check" size={16} className="mr-1" />
                  Одобрить
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onUpdateStatus(application.id, "rejected")}
                >
                  <Icon name="X" size={16} className="mr-1" />
                  Отклонить
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ManagerPage;
