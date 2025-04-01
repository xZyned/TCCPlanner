
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TCCPlan } from "@/types/tcc";
import { generatePlan } from "@/utils/planGenerator";

interface InitialFormProps {
  onCreatePlan: (plan: TCCPlan) => void;
}

export const InitialForm = ({ onCreatePlan }: InitialFormProps) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    setIsGenerating(true);
    
    // Simula um tempo de processamento para gerar o plano
    setTimeout(() => {
      const plan = generatePlan(title, new Date(dueDate), hoursPerWeek);
      onCreatePlan(plan);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Comece seu planejamento</CardTitle>
        <CardDescription>
          Preencha as informações básicas para gerar seu plano de TCC/Monografia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Tema do TCC</Label>
            <Input
              id="title"
              placeholder="Ex: Impacto da Inteligência Artificial na Educação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dueDate">Data de Entrega</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hoursPerWeek">Horas por Semana Disponíveis</Label>
            <Input
              id="hoursPerWeek"
              type="number"
              min={1}
              max={40}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          disabled={isGenerating || !title || !dueDate}
        >
          {isGenerating ? "Gerando seu plano..." : "Gerar meu plano"}
        </Button>
      </CardFooter>
    </Card>
  );
};
