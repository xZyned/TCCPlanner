
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TecoMascotProps {
  position?: "floating" | "fixed";
  size?: "sm" | "md" | "lg";
  withTip?: boolean;
}

export function TecoMascot({ position = "floating", size = "md", withTip = true }: TecoMascotProps) {
  const [showMessage, setShowMessage] = useState(false);
  
  const tips = [
    "Divida seu TCC em pequenas tarefas diárias para não acumular!",
    "Lembre-se de fazer pausas durante o estudo. O método Pomodoro pode te ajudar!",
    "Guarde todas as suas referências bibliográficas desde o início!",
    "Converse regularmente com seu orientador sobre seu progresso!",
    "Reserve um tempo para revisar seu texto antes da entrega final!",
  ];
  
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };
  
  const positionClasses = {
    floating: "relative animate-bounce",
    fixed: "fixed bottom-4 right-4 z-50 hover:scale-110 transition-all duration-300"
  };
  
  return (
    <div className={`${positionClasses[position]} ${position === "fixed" ? "cursor-pointer" : ""}`}>
      <TooltipProvider>
        <Tooltip open={showMessage} onOpenChange={setShowMessage}>
          <TooltipTrigger asChild>
            <div 
              className={`${sizeClasses[size]}`}
              onClick={() => position === "fixed" && setShowMessage(!showMessage)}
            >
              <img 
                src="/lovable-uploads/769a9b30-86c6-494f-a030-ab94442eedf6.png" 
                alt="Teco, o mascote do PlanejaTCC" 
                className="w-full h-full object-contain"
              />
            </div>
          </TooltipTrigger>
          {withTip && (
            <TooltipContent side="top" className="max-w-[280px] p-4 bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700">
              <div className="space-y-2">
                <p className="font-semibold text-indigo-800 dark:text-indigo-300">Dica do Teco:</p>
                <p className="text-gray-700 dark:text-gray-300">{randomTip}</p>
                {position === "fixed" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2 border-indigo-300 dark:border-indigo-600"
                    onClick={() => setShowMessage(false)}
                  >
                    Obrigado, Teco!
                  </Button>
                )}
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
