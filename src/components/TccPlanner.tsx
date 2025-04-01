
import { useState } from "react";
import { InitialForm } from "./InitialForm";
import { PlannerDashboard } from "./PlannerDashboard";
import { TCCPlan } from "@/types/tcc";

export const TccPlanner = () => {
  const [plan, setPlan] = useState<TCCPlan | null>(null);

  const handlePlanCreation = (newPlan: TCCPlan) => {
    setPlan(newPlan);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {!plan ? (
        <InitialForm onCreatePlan={handlePlanCreation} />
      ) : (
        <PlannerDashboard plan={plan} />
      )}
    </div>
  );
};
