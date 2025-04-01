
import { TCCPlan, Stage, Task } from "@/types/tcc";

// Função auxiliar para gerar IDs únicos
const generateId = () => Math.random().toString(36).substring(2, 9);

// Função para adicionar dias a uma data
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Parâmetros padrão para o planejamento
const DEFAULT_STAGES = [
  {
    name: "Escolha do tema",
    description: "Definição e refinamento do tema de pesquisa",
    percentageOfTotal: 5,
    tasks: [
      { name: "Pesquisa inicial de temas", description: "Explore possíveis temas de interesse", estimatedHours: 4 },
      { name: "Consulta com orientador", description: "Agende uma reunião para discutir o tema", estimatedHours: 2 },
      { name: "Definição final do tema", description: "Delimite o escopo do seu trabalho", estimatedHours: 3 }
    ]
  },
  {
    name: "Referencial teórico",
    description: "Pesquisa e organização de fontes bibliográficas",
    percentageOfTotal: 25,
    tasks: [
      { name: "Pesquisa bibliográfica", description: "Encontre artigos, livros e outras fontes relevantes", estimatedHours: 12 },
      { name: "Leitura e fichamento", description: "Organize as informações coletadas", estimatedHours: 15 },
      { name: "Redação inicial do referencial", description: "Escreva a primeira versão do seu referencial teórico", estimatedHours: 10 }
    ]
  },
  {
    name: "Metodologia",
    description: "Definição dos métodos de pesquisa",
    percentageOfTotal: 15,
    tasks: [
      { name: "Escolha do método", description: "Defina a abordagem metodológica", estimatedHours: 5 },
      { name: "Elaboração de instrumentos", description: "Crie questionários, roteiros ou outros instrumentos", estimatedHours: 7 },
      { name: "Validação metodológica", description: "Discuta a metodologia com o orientador", estimatedHours: 3 }
    ]
  },
  {
    name: "Cronograma",
    description: "Planejamento detalhado das atividades",
    percentageOfTotal: 5,
    tasks: [
      { name: "Elaboração do cronograma", description: "Organize as atividades e prazos", estimatedHours: 4 },
      { name: "Ajuste com o orientador", description: "Revise o cronograma com seu orientador", estimatedHours: 2 }
    ]
  },
  {
    name: "Escrita dos capítulos",
    description: "Redação do corpo principal do trabalho",
    percentageOfTotal: 30,
    tasks: [
      { name: "Introdução", description: "Escreva a introdução do seu trabalho", estimatedHours: 6 },
      { name: "Desenvolvimento", description: "Redija os capítulos principais", estimatedHours: 20 },
      { name: "Resultados", description: "Apresente e discuta os resultados", estimatedHours: 10 },
      { name: "Conclusão", description: "Escreva as considerações finais", estimatedHours: 6 }
    ]
  },
  {
    name: "Revisão",
    description: "Revisão completa do trabalho",
    percentageOfTotal: 15,
    tasks: [
      { name: "Revisão de conteúdo", description: "Verifique a coerência e consistência", estimatedHours: 8 },
      { name: "Revisão ortográfica", description: "Corrija erros de português e formatação", estimatedHours: 5 },
      { name: "Revisão de normas", description: "Confira a conformidade com as normas acadêmicas", estimatedHours: 6 }
    ]
  },
  {
    name: "Apresentação",
    description: "Preparação para a defesa",
    percentageOfTotal: 5,
    tasks: [
      { name: "Elaboração de slides", description: "Crie uma apresentação visual", estimatedHours: 5 },
      { name: "Ensaio da apresentação", description: "Pratique sua apresentação oral", estimatedHours: 4 },
      { name: "Defesa final", description: "Apresente seu trabalho para a banca", estimatedHours: 2 }
    ]
  }
];

export const generatePlan = (title: string, dueDate: Date, hoursPerWeek: number): TCCPlan => {
  const startDate = new Date(); // Data atual como início
  
  // Calcula o número total de dias disponíveis
  const totalDays = Math.max(1, Math.floor((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Calcula o número total de horas disponíveis
  const totalHoursAvailable = Math.floor(totalDays * (hoursPerWeek / 7));
  
  // Cria as etapas com suas datas calculadas
  let currentDate = new Date(startDate);
  const stages: Stage[] = [];
  
  DEFAULT_STAGES.forEach((stageTemplate) => {
    // Calcula horas totais para esta etapa
    const stageHours = Math.floor(totalHoursAvailable * (stageTemplate.percentageOfTotal / 100));
    
    // Calcula dias necessários para esta etapa
    const stageDays = Math.max(1, Math.ceil(stageHours / (hoursPerWeek / 7)));
    
    const endDate = addDays(currentDate, stageDays);
    
    // Cria as tarefas para esta etapa
    const tasks: Task[] = stageTemplate.tasks.map(taskTemplate => ({
      id: generateId(),
      name: taskTemplate.name,
      description: taskTemplate.description,
      completed: false,
      estimatedHours: taskTemplate.estimatedHours
    }));
    
    // Cria a etapa
    stages.push({
      id: generateId(),
      name: stageTemplate.name,
      description: stageTemplate.description,
      startDate: new Date(currentDate),
      endDate: new Date(endDate),
      tasks,
      completed: false,
      percentageOfTotal: stageTemplate.percentageOfTotal
    });
    
    // Atualiza a data atual para o próximo estágio
    currentDate = addDays(endDate, 1);
  });
  
  return {
    title,
    dueDate,
    hoursPerWeek,
    startDate,
    stages
  };
};
