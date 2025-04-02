
import { useState } from "react";
import { InitialForm } from "./InitialForm";
import { PlannerDashboard } from "./PlannerDashboard";
import { TCCPlan } from "@/types/tcc";
import { TecoMascot } from "./TecoMascot";

export const TccPlanner = () => {
  const [plan, setPlan] = useState<TCCPlan | null>(null);

  const handlePlanCreation = (newPlan: TCCPlan) => {
    setPlan(newPlan);
  };

  return (
    <div className="w-full">
      {!plan ? (
        <div className="py-10 relative">
          {/* Background elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 -z-10"></div>
          
          {/* Add Teco to help with initial form */}
          <div className="absolute -top-16 right-8 transform -rotate-12 z-10 hidden md:block">
            <TecoMascot size="lg" />
          </div>
          
          <InitialForm onCreatePlan={handlePlanCreation} />
        </div>
      ) : (
        <PlannerDashboard plan={plan} />
      )}
    </div>
  );
};
