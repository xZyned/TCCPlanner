
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw } from "lucide-react";

export const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutos em segundos
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState("pomodoro");
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      // Timer acabou
      setIsActive(false);
      // Notificação
      if (Notification.permission === "granted") {
        new Notification("Pomodoro Timer", {
          body: timerType === "pomodoro" ? "Tempo de trabalho concluído! Faça uma pausa." : "Pausa concluída! Volte ao trabalho.",
          icon: "/favicon.ico"
        });
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, timerType]);
  
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    if (timerType === "pomodoro") {
      setTime(workDuration * 60);
    } else {
      setTime(breakDuration * 60);
    }
  };
  
  const changeTimerType = (type: string) => {
    setIsActive(false);
    setTimerType(type);
    if (type === "pomodoro") {
      setTime(workDuration * 60);
    } else {
      setTime(breakDuration * 60);
    }
  };
  
  const handleWorkDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWorkDuration(value);
      if (timerType === "pomodoro" && !isActive) {
        setTime(value * 60);
      }
    }
  };
  
  const handleBreakDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBreakDuration(value);
      if (timerType === "break" && !isActive) {
        setTime(value * 60);
      }
    }
  };
  
  // Solicitar permissão para notificações
  useEffect(() => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Tabs value={timerType} onValueChange={changeTimerType} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pomodoro">Trabalho</TabsTrigger>
          <TabsTrigger value="break">Pausa</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="text-6xl font-bold mb-8 font-mono">{formatTime()}</div>
      
      <div className="flex gap-4 mb-8">
        <Button 
          onClick={toggleTimer} 
          variant={isActive ? "destructive" : "default"}
          size="lg"
        >
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? "Pausar" : "Iniciar"}
        </Button>
        
        <Button 
          onClick={resetTimer} 
          variant="outline"
          size="lg"
        >
          <RotateCcw className="mr-2" />
          Reiniciar
        </Button>
      </div>
      
      <Card className="w-full p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="workDuration">Duração de Trabalho (minutos)</Label>
            <Input
              id="workDuration"
              type="number"
              min={1}
              max={60}
              value={workDuration}
              onChange={handleWorkDurationChange}
              disabled={isActive}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="breakDuration">Duração de Pausa (minutos)</Label>
            <Input
              id="breakDuration"
              type="number"
              min={1}
              max={30}
              value={breakDuration}
              onChange={handleBreakDurationChange}
              disabled={isActive}
              className="mt-1"
            />
          </div>
        </div>
      </Card>
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>A técnica Pomodoro consiste em ciclos de trabalho focado seguidos por pequenas pausas.</p>
        <p className="mt-1">Use este timer para melhorar sua produtividade enquanto escreve seu TCC.</p>
      </div>
    </div>
  );
};
