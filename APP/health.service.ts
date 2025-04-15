// Serviço de monitoramento de saúde para o ReVitaliza Fitness
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  Timestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

// Interface para registro de saúde
interface HealthRecord {
  id?: string;
  userId: string;
  date: Date | Timestamp;
  pressure?: string;
  weight?: number;
  glucose?: number;
  mood?: string;
  notes?: string;
}

// Interface para lembrete
interface Reminder {
  id?: string;
  userId: string;
  title: string;
  time: string;
  days: string[];
  active: boolean;
  type: 'medication' | 'water' | 'exercise' | 'measurement' | 'other';
}

// Serviço de monitoramento de saúde
export const HealthService = {
  // Registrar indicadores de saúde
  addHealthRecord: async (record: HealthRecord) => {
    try {
      const healthRecordsRef = collection(db, 'healthRecords');
      const newRecordRef = doc(healthRecordsRef);
      
      await setDoc(newRecordRef, {
        ...record,
        id: newRecordRef.id,
        date: Timestamp.fromDate(new Date(record.date)),
        createdAt: Timestamp.now()
      });
      
      return { 
        success: true, 
        id: newRecordRef.id 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter registros de saúde de um usuário
  getUserHealthRecords: async (userId: string, limit?: number) => {
    try {
      const healthRecordsRef = collection(db, 'healthRecords');
      let q = query(
        healthRecordsRef, 
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      
      if (limit) {
        q = query(q, limit(limit));
      }
      
      const querySnapshot = await getDocs(q);
      
      const healthRecords = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as HealthRecord[];
      
      return { success: true, healthRecords };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter registro de saúde específico
  getHealthRecordById: async (id: string) => {
    try {
      const recordRef = doc(db, 'healthRecords', id);
      const recordDoc = await getDoc(recordRef);
      
      if (recordDoc.exists()) {
        const record = {
          id: recordDoc.id,
          ...recordDoc.data()
        } as HealthRecord;
        
        return { success: true, record };
      } else {
        return { 
          success: false, 
          error: 'Registro não encontrado' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Adicionar lembrete
  addReminder: async (reminder: Reminder) => {
    try {
      const remindersRef = collection(db, 'reminders');
      const newReminderRef = doc(remindersRef);
      
      await setDoc(newReminderRef, {
        ...reminder,
        id: newReminderRef.id,
        createdAt: Timestamp.now()
      });
      
      return { 
        success: true, 
        id: newReminderRef.id 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter lembretes de um usuário
  getUserReminders: async (userId: string) => {
    try {
      const remindersRef = collection(db, 'reminders');
      const q = query(
        remindersRef, 
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      
      const reminders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Reminder[];
      
      return { success: true, reminders };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Atualizar status de lembrete
  updateReminderStatus: async (id: string, active: boolean) => {
    try {
      const reminderRef = doc(db, 'reminders', id);
      
      await setDoc(reminderRef, { active }, { merge: true });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Gerar relatório de saúde
  generateHealthReport: async (userId: string, startDate: Date, endDate: Date) => {
    try {
      const healthRecordsRef = collection(db, 'healthRecords');
      const q = query(
        healthRecordsRef, 
        where('userId', '==', userId),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate)),
        orderBy('date', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      
      const healthRecords = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as HealthRecord[];
      
      // Aqui seria implementada a lógica para gerar um relatório PDF
      // com os dados obtidos
      
      return { 
        success: true, 
        healthRecords,
        reportUrl: 'URL_DO_RELATORIO_GERADO' // Simulação
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
};

export default HealthService;
