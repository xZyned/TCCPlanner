
import { TccPlanner } from "@/components/TccPlanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">
            Planner de TCC / Monografia
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Organize seu trabalho acadêmico de forma eficiente e nunca perca um prazo
          </p>
        </header>
        
        <TccPlanner />

      </div>
    </div>
  );
};

export default Index;
