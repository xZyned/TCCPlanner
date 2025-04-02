
import { useState } from "react";
import { Stage, Task } from "@/types/tcc";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronDown, ChevronRight } from "lucide-react";

interface StagesListProps {
  stages: Stage[];
}

export const StagesList = ({ stages }: StagesListProps) => {
  const [openStages, setOpenStages] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const toggleStage = (stageId: string) => {
    setOpenStages(prev => 
      prev.includes(stageId) 
        ? prev.filter(id => id !== stageId) 
        : [...prev, stageId]
    );
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId) 
        : [...prev, taskId]
    );
  };

  // Formata a data para exibição
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-4">
      {stages.map((stage) => {
        // Calcula progresso da etapa
        const taskCount = stage.tasks.length;
        const completedCount = stage.tasks.filter(task => 
          completedTasks.includes(task.id)
        ).length;
        const progress = taskCount > 0 ? (completedCount / taskCount) * 100 : 0;
        
        const isOpen = openStages.includes(stage.id);
        
        return (
          <Card key={stage.id} className={`transition-all duration-200 ${completedCount === taskCount ? 'border-green-300 bg-green-50 dark:bg-green-900/20' : ''}`}>
            <CardHeader className="pb-2">
              <Collapsible open={isOpen} onOpenChange={() => toggleStage(stage.id)}>
                <CollapsibleTrigger className="w-full flex justify-between items-center text-left">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {completedCount === taskCount && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    {stage.name}
                  </CardTitle>
                  {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </CollapsibleTrigger>
              
                <CardContent className="pb-4">
                  <div className="mb-2 flex justify-between text-sm text-gray-500">
                    <span>{formatDate(stage.startDate)} - {formatDate(stage.endDate)}</span>
                    <span>{Math.round(progress)}% completo</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  
                  <CollapsibleContent className="mt-4 space-y-3">
                    {stage.tasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-3 p-3 border rounded-md">
                        <Checkbox 
                          id={`task-${task.id}`} 
                          checked={completedTasks.includes(task.id)}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1"
                        />
                        <div>
                          <label 
                            htmlFor={`task-${task.id}`} 
                            className={`font-medium cursor-pointer ${completedTasks.includes(task.id) ? 'line-through text-gray-500' : ''}`}
                          >
                            {task.name}
                          </label>
                          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                          <p className="text-xs text-gray-400 mt-1">Tempo estimado: {task.estimatedHours}h</p>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </CardContent>
              </Collapsible>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};
