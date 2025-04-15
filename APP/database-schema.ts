// Estrutura do banco de dados Firestore para o ReVitaliza Fitness

/**
 * Coleção: users
 * Descrição: Armazena informações dos usuários
 * Documento: ID do usuário (gerado pelo Firebase Auth)
 */
interface User {
  name: string;
  email: string;
  age: number;
  createdAt: Timestamp;
  goals: UserGoal[];
  achievements: UserAchievement[];
  settings: {
    notifications: boolean;
    shareWithFamily: boolean;
    monthlyReports: boolean;
    theme?: 'light' | 'dark';
    fontSize?: 'normal' | 'large' | 'extra-large';
  };
  role?: 'user' | 'admin' | 'professional';
  familyMembers?: string[]; // IDs de usuários familiares
}

/**
 * Coleção: trainings
 * Descrição: Catálogo de treinos disponíveis
 * Documento: ID do treino (gerado automaticamente)
 */
interface Training {
  title: string;
  description: string;
  duration: string;
  level: string;
  videoUrl?: string;
  instructions?: string;
  category?: string;
  tags?: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  createdBy?: string; // ID do usuário que criou (admin)
}

/**
 * Coleção: scheduledTrainings
 * Descrição: Treinos agendados pelos usuários
 * Documento: ID do agendamento (gerado automaticamente)
 */
interface ScheduledTraining {
  trainingId: string;
  userId: string;
  date: Timestamp;
  status: 'pendente' | 'concluído' | 'cancelado';
  feedback?: string;
  rating?: number;
  createdAt: Timestamp;
}

/**
 * Coleção: healthRecords
 * Descrição: Registros de saúde dos usuários
 * Documento: ID do registro (gerado automaticamente)
 */
interface HealthRecord {
  userId: string;
  date: Timestamp;
  pressure?: string;
  weight?: number;
  glucose?: number;
  mood?: string;
  notes?: string;
  createdAt: Timestamp;
}

/**
 * Coleção: reminders
 * Descrição: Lembretes personalizados dos usuários
 * Documento: ID do lembrete (gerado automaticamente)
 */
interface Reminder {
  userId: string;
  title: string;
  time: string;
  days: string[];
  active: boolean;
  type: 'medication' | 'water' | 'exercise' | 'measurement' | 'other';
  createdAt: Timestamp;
}

/**
 * Coleção: supportMessages
 * Descrição: Mensagens de suporte enviadas pelos usuários
 * Documento: ID da mensagem (gerado automaticamente)
 */
interface SupportMessage {
  userId: string;
  subject: string;
  message: string;
  status: 'enviado' | 'em_análise' | 'respondido' | 'resolvido';
  date: Timestamp;
  category: 'dúvida' | 'sugestão' | 'problema_técnico' | 'elogio';
  response?: {
    message: string;
    date: Timestamp;
    respondedBy: string;
  };
  createdAt: Timestamp;
}

/**
 * Coleção: faqs
 * Descrição: Perguntas frequentes
 * Documento: ID da FAQ (gerado automaticamente)
 */
interface FAQ {
  question: string;
  answer: string;
  category: string;
  order: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

/**
 * Coleção: videoAppointments
 * Descrição: Agendamentos de atendimento por vídeo
 * Documento: ID do agendamento (gerado automaticamente)
 */
interface VideoAppointment {
  userId: string;
  date: Timestamp;
  duration: number; // em minutos
  subject: string;
  status: 'agendado' | 'concluído' | 'cancelado';
  professionalId?: string;
  meetingUrl?: string;
  createdAt: Timestamp;
}

/**
 * Coleção: motivationalMessages
 * Descrição: Mensagens motivacionais para exibir aos usuários
 * Documento: ID da mensagem (gerado automaticamente)
 */
interface MotivationalMessage {
  text: string;
  author: string;
  category?: string;
  audioUrl?: string;
  active: boolean;
  createdAt: Timestamp;
}

// Observação: Este arquivo é apenas para documentação da estrutura do banco de dados.
// Não é utilizado diretamente no código, mas serve como referência para a implementação.
