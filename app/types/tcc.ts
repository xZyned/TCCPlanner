
export interface TccStage {
  id: number;
  title: string;
  description: string;
  tasks: TccTask[];
  estimatedWeeks: number;
  completed: boolean;
}

export interface TccTask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface TccPlan {
  id: string;
  title: string;
  description: string;
  stages: TccStage[];
  startDate: string;
  endDate: string;
  topic: string;
  weeklyHours: number;
}

export interface PlannerFormData {
  topic: string;
  deadline: Date;
  weeklyHours: number;
}
