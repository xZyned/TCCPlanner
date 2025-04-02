
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TccPlanner } from "@/components/TccPlanner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save, User, Clock, Calendar, ListChecks } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("planner");
  
  if (!user) {
    return null;
  }

  const handleSaveData = () => {
    toast({
      title: "Dados salvos",
      description: "Suas alterações foram salvas com sucesso",
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar / User Info */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback className="bg-indigo-600 text-white text-xl">
                    {getInitials(user.name || user.email)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name || "Usuário"}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{user.email}</p>
                
                <div className="w-full space-y-2 mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("planner")}
                  >
                    <ListChecks className="h-4 w-4 mr-2" />
                    Meu Planner
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("history")}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Histórico
                  </Button>
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full mt-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={logout}
                >
                  Sair
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-9">
          {activeTab === "planner" && (
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Meu Planner de TCC</h2>
              </CardHeader>
              <CardContent>
                <TccPlanner />
              </CardContent>
            </Card>
          )}
          
          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Meu Perfil</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue={user.name || ""}
                      />
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <div className="flex items-center">
                      <input 
                        type="email" 
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue={user.email}
                        disabled
                      />
                    </div>
                    <p className="text-sm text-gray-500">O email não pode ser alterado</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Curso</label>
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue={user.course || ""}
                      />
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveData}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "history" && (
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Histórico de Atividades</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start border-b pb-4 last:border-0">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full mr-3">
                        <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium">Etapa {item} concluída</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(2023, 3 + item, 10 + item * 2).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
