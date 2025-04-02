import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TccPlanner } from "@/components/TccPlanner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignupForm } from "@/components/SignupForm";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { TecoMascot } from "@/components/TecoMascot";
import { 
  BookOpen, 
  CalendarClock, 
  CheckSquare, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  LogIn
} from "lucide-react";

const Index = () => {
  const [showPlanner, setShowPlanner] = useState(false);
  const { user } = useAuth();
  
  if (showPlanner) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">
              PlanejaTCC
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Organize seu trabalho acadêmico de forma eficiente e nunca perca um prazo
            </p>
          </header>
          
          <TccPlanner />
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowPlanner(false)}
              className="mt-4"
            >
              Voltar para página inicial
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5 dark:bg-indigo-900/20 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Sua jornada acadêmica simplificada</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-900 dark:text-white mb-6 leading-tight">
                <span className="text-indigo-600 dark:text-indigo-400">Planner Inteligente</span> para estudantes
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Organize seu TCC ou Monografia com um planejamento inteligente baseado no seu tema, prazo e disponibilidade de tempo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => setShowPlanner(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white rounded-full px-8"
                >
                  Começar agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {!user && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="rounded-full px-8"
                    asChild
                  >
                    <Link to="/auth">
                      <LogIn className="mr-2 h-5 w-5" />
                      Entrar / Cadastrar
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="flex-1 w-full max-w-md relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform rotate-1 hover:rotate-0 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 ml-2">TCC Planner</div>
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-indigo-100 dark:bg-gray-700 rounded-md w-3/4"></div>
                  <div className="h-24 bg-indigo-50 dark:bg-gray-700/80 rounded-md"></div>
                  <div className="flex gap-2">
                    <div className="h-10 bg-indigo-200 dark:bg-gray-600 rounded-md w-1/3"></div>
                    <div className="h-10 bg-indigo-300 dark:bg-gray-600 rounded-md w-1/2"></div>
                  </div>
                  <div className="h-32 bg-indigo-50 dark:bg-gray-700/80 rounded-md"></div>
                  <div className="flex justify-end">
                    <div className="h-10 bg-indigo-500 dark:bg-indigo-600 rounded-md w-1/3"></div>
                  </div>
                </div>
              </div>
              
              {/* Teco no canto da seção hero */}
              <div className="absolute -bottom-10 -right-10 z-10 transform -rotate-6 hidden md:block">
                <TecoMascot size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 bg-white dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Como o PlanejaTCC vai te ajudar
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Desenvolvido especialmente para estudantes, nosso planner elimina o estresse do planejamento e te ajuda a concluir seu trabalho no prazo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<CalendarClock className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />} 
              title="Cronograma Inteligente" 
              description="Criação automática de um cronograma realista baseado na sua disponibilidade semanal e prazo final."
            />
            <FeatureCard 
              icon={<CheckSquare className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />} 
              title="Checklists Detalhados" 
              description="Tarefas específicas para cada etapa do seu TCC, com instruções claras sobre o que precisa ser feito."
            />
            <FeatureCard 
              icon={<Clock className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />} 
              title="Timer Pomodoro" 
              description="Mantenha o foco com nosso timer Pomodoro integrado, ideal para sessões produtivas de estudo."
            />
            <FeatureCard 
              icon={<BookOpen className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />} 
              title="Metodologia Acadêmica" 
              description="Planejamento baseado em metodologias acadêmicas comprovadas para trabalhos de conclusão."
            />
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="py-16 px-4 sm:px-6 bg-indigo-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 mb-6">
                <GraduationCap className="w-4 h-4 mr-2" />
                <span>Comece sua jornada</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Crie uma conta ou experimente agora
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                Registre-se para salvar seu progresso ou experimente o planner sem criar uma conta. 
                Estamos aqui para ajudar você a concluir seu TCC com tranquilidade.
              </p>
              <div className="hidden md:block">
                <div className="space-y-6">
                  <TestimonialCard 
                    quote="O planner de TCC me ajudou a organizar meu tempo e concluir meu trabalho duas semanas antes do prazo!" 
                    author="Ana Silva, Administração"
                  />
                  <TestimonialCard 
                    quote="A divisão em etapas e tarefas tornou o processo muito menos assustador. Recomendo a todos os estudantes." 
                    author="Carlos Mendes, Engenharia"
                  />
                </div>
              </div>
            </div>
            <div>
              <Card className="shadow-lg dark:border-gray-700 relative">
                <CardContent className="p-6 pt-10">
                  <Tabs defaultValue="try" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="try">Experimentar</TabsTrigger>
                      <TabsTrigger value="signup">Criar Conta</TabsTrigger>
                    </TabsList>
                    <TabsContent value="try" className="space-y-4">
                      <div className="text-center p-4">
                        <h3 className="text-xl font-semibold mb-4">Experimentar sem registro</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Você pode usar o planner imediatamente, sem criar uma conta. Seus dados ficarão salvos no navegador atual.
                        </p>
                        <Button 
                          className="w-full" 
                          onClick={() => setShowPlanner(true)}
                        >
                          Usar o planner agora
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="signup">
                      <SignupForm />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Teco mascot that shows tips */}
      <TecoMascot position="fixed" size="md" />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">PlanejaTCC</h2>
              <p className="mt-2">Seu trabalho acadêmico, organizado.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Recursos</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-indigo-400 transition-colors">Funcionalidades</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Guia de uso</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Sobre</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Quem somos</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Contato</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacidade</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © {new Date().getFullYear()} PlanejaTCC. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-indigo-50/50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, author }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <p className="text-gray-600 dark:text-gray-300 italic mb-3">"{quote}"</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">— {author}</p>
    </div>
  );
};

export default Index;
