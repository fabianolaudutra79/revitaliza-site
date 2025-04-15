// Serviço de gerenciamento de treinos para o ReVitaliza Fitness
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';

// Interface para dados de treino
interface Training {
  id?: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  videoUrl?: string;
  instructions?: string;
  category?: string;
  tags?: string[];
}

// Interface para treino agendado
interface ScheduledTraining {
  id?: string;
  trainingId: string;
  userId: string;
  date: Date | Timestamp;
  status: 'pendente' | 'concluído' | 'cancelado';
  feedback?: string;
  rating?: number;
}

// Serviço de gerenciamento de treinos
export const TrainingService = {
  // Obter todos os treinos disponíveis
  getAllTrainings: async () => {
    try {
      const trainingsRef = collection(db, 'trainings');
      const querySnapshot = await getDocs(trainingsRef);
      
      const trainings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Training[];
      
      return { success: true, trainings };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter treinos por nível
  getTrainingsByLevel: async (level: string) => {
    try {
      const trainingsRef = collection(db, 'trainings');
      const q = query(trainingsRef, where('level', '==', level));
      const querySnapshot = await getDocs(q);
      
      const trainings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Training[];
      
      return { success: true, trainings };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter treino por ID
  getTrainingById: async (id: string) => {
    try {
      const trainingRef = doc(db, 'trainings', id);
      const trainingDoc = await getDoc(trainingRef);
      
      if (trainingDoc.exists()) {
        const training = {
          id: trainingDoc.id,
          ...trainingDoc.data()
        } as Training;
        
        return { success: true, training };
      } else {
        return { 
          success: false, 
          error: 'Treino não encontrado' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Agendar treino para usuário
  scheduleTraining: async (scheduledTraining: ScheduledTraining) => {
    try {
      const scheduledTrainingsRef = collection(db, 'scheduledTrainings');
      const newScheduledTrainingRef = doc(scheduledTrainingsRef);
      
      await setDoc(newScheduledTrainingRef, {
        ...scheduledTraining,
        id: newScheduledTrainingRef.id,
        date: Timestamp.fromDate(new Date(scheduledTraining.date)),
        createdAt: Timestamp.now()
      });
      
      return { 
        success: true, 
        id: newScheduledTrainingRef.id 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter treinos agendados para um usuário
  getUserScheduledTrainings: async (userId: string) => {
    try {
      const scheduledTrainingsRef = collection(db, 'scheduledTrainings');
      const q = query(
        scheduledTrainingsRef, 
        where('userId', '==', userId),
        orderBy('date', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      
      const scheduledTrainings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ScheduledTraining[];
      
      return { success: true, scheduledTrainings };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Atualizar status de treino agendado
  updateTrainingStatus: async (id: string, status: 'pendente' | 'concluído' | 'cancelado', feedback?: string, rating?: number) => {
    try {
      const trainingRef = doc(db, 'scheduledTrainings', id);
      
      const updateData: any = { status };
      
      if (feedback) {
        updateData.feedback = feedback;
      }
      
      if (rating) {
        updateData.rating = rating;
      }
      
      await updateDoc(trainingRef, updateData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
};

export default TrainingService;
