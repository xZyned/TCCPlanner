
import { useState } from "react";
import { TCCPlan } from "@/types/tcc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { StagesList } from "./StagesList";
import { PomodoroTimer } from "./PomodoroTimer";

interface PlannerDashboardProps {
  plan: TCCPlan;
}

export const PlannerDashboard = ({ plan }: PlannerDashboardProps) => {
  const [currentTab, setCurrentTab] = useState("overview");
  
  // Calcula o progresso geral
  const calculateOverallProgress = (): number => {
    const totalTasks = plan.stages.reduce((acc, stage) => acc + stage.tasks.length, 0);
    const completedTasks = plan.stages.reduce(
      (acc, stage) => acc + stage.tasks.filter(task => task.completed).length, 
      0
    );
    
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };
  
  // Formata a data para exibição
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('pt-BR');
  };
  
  const progress = calculateOverallProgress();
  
  // Calcula dias restantes
  const daysRemaining = Math.ceil(
    (new Date(plan.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{plan.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-md">
              <h3 className="font-medium text-gray-600 dark:text-gray-300">Data de Entrega</h3>
              <p className="text-xl font-bold">{formatDate(plan.dueDate)}</p>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-md">
              <h3 className="font-medium text-gray-600 dark:text-gray-300">Dias Restantes</h3>
              <p className={`text-xl font-bold ${daysRemaining < 14 ? 'text-orange-500' : daysRemaining < 7 ? 'text-red-500' : ''}`}>
                {daysRemaining}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-md">
              <h3 className="font-medium text-gray-600 dark:text-gray-300">Progresso Geral</h3>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-2" />
                <span className="text-sm font-medium">{progress}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setCurrentTab}>
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">Visão Geral</TabsTrigger>
          <TabsTrigger value="stages" className="flex-1">Etapas</TabsTrigger>
          <TabsTrigger value="pomodoro" className="flex-1">Pomodoro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Próximas Etapas</h3>
              {plan.stages.slice(0, 3).map((stage) => (
                <div key={stage.id} className="mb-4 p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{stage.name}</h4>
                    <span className="text-sm text-gray-500">
                      {formatDate(stage.startDate)} - {formatDate(stage.endDate)}
                    </span>
                  </div>
                  <Progress 
                    value={stage.tasks.filter(t => t.completed).length / stage.tasks.length * 100} 
                    className="h-1 mt-2" 
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stages" className="mt-6">
          <StagesList stages={plan.stages} />
        </TabsContent>
        
        <TabsContent value="pomodoro" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <PomodoroTimer />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
