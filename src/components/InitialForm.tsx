
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TCCPlan } from "@/types/tcc";
import { generatePlan } from "@/utils/planGenerator";
import { Loader2, Calendar, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface InitialFormProps {
  onCreatePlan: (plan: TCCPlan) => void;
}

export const InitialForm = ({ onCreatePlan }: InitialFormProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    setIsGenerating(true);
    
    // Simula um tempo de processamento para gerar o plano
    setTimeout(() => {
      const plan = generatePlan(title, date, hoursPerWeek);
      onCreatePlan(plan);
      setIsGenerating(false);
    }, 1500);
  };

  // Function to handle date input manually
  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    if (inputDate) {
      setDate(new Date(inputDate));
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">
          Vamos planejar seu TCC!
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Preencha os detalhes abaixo para gerar um plano personalizado que vai te ajudar a concluir seu trabalho no prazo.
        </p>
      </div>
      
      <Card className="w-full shadow-xl border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-gray-800/90 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/20 rounded-bl-full -z-10 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/10 rounded-tr-full -z-10 opacity-70"></div>
        
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
            Comece seu planejamento
          </CardTitle>
          <CardDescription className="text-center text-gray-500 dark:text-gray-400">
            Preencha as informações básicas para gerar seu plano de TCC/Monografia
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Tema do TCC
              </Label>
              <Input
                id="title"
                placeholder="Ex: Impacto da Inteligência Artificial na Educação"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border-indigo-100 dark:border-indigo-800/50 focus-visible:ring-indigo-500 transition-all"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 pl-2">
                Escolha um tema específico que desperte seu interesse
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Data de Entrega
              </Label>
              
              <div className="flex gap-2">
                <Input
                  id="dueDate"
                  type="date"
                  value={date ? format(date, 'yyyy-MM-dd') : ''}
                  onChange={handleDateInput}
                  className="flex-1 border-indigo-100 dark:border-indigo-800/50 focus-visible:ring-indigo-500 transition-all"
                />
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={cn(
                        "w-10 p-0 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-800/40 border-indigo-100 dark:border-indigo-800/50"
                      )}
                    >
                      <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 pl-2">
                A data final para entregar seu trabalho completo
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek" className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Horas por Semana Disponíveis
              </Label>
              <div className="relative">
                <Input
                  id="hoursPerWeek"
                  type="range"
                  min={1}
                  max={30}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                  required
                  className="accent-indigo-600 dark:accent-indigo-400 cursor-pointer"
                />
                <div className="flex justify-between px-2 text-xs text-gray-500 mt-1">
                  <span>1h</span>
                  <span>10h</span>
                  <span>20h</span>
                  <span>30h</span>
                </div>
                <div className="text-center mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {hoursPerWeek} horas por semana
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 pl-2">
                Seja realista com o tempo que você consegue dedicar semanalmente
              </p>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4 pb-6">
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all py-6 text-lg font-medium rounded-lg shadow-md hover:shadow-lg disabled:opacity-70"
            disabled={isGenerating || !title || !date}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Gerando seu plano personalizado...
              </>
            ) : (
              <>
                Gerar meu plano
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Ao gerar o plano, nosso sistema criará uma estrutura personalizada baseada no seu tema, prazo e disponibilidade de tempo.
          </p>
        </CardFooter>
      </Card>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Calendar className="h-8 w-8 text-indigo-500" />}
          title="Cronograma Inteligente" 
          description="Datas e prazos personalizados baseados na sua disponibilidade real" 
        />
        <FeatureCard 
          icon={<Clock className="h-8 w-8 text-indigo-500" />}
          title="Timer Pomodoro" 
          description="Mantenha o foco com sessões produtivas e intervalos estratégicos" 
        />
        <FeatureCard 
          icon={<BookOpen className="h-8 w-8 text-indigo-500" />}
          title="Divisão por Capítulos" 
          description="Estrutura acadêmica completa dividida em etapas gerenciáveis" 
        />
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-indigo-50 dark:border-indigo-900/30 group hover:border-indigo-200 dark:hover:border-indigo-700/30">
      <div className="mb-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
};
