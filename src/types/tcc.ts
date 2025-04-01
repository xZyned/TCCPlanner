
export interface TCCPlan {
  title: string;
  dueDate: Date;
  hoursPerWeek: number;
  startDate: Date;
  stages: Stage[];
}

export interface Stage {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
  completed: boolean;
  percentageOfTotal: number;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  estimatedHours: number;
}
