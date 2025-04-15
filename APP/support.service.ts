// Serviço de suporte para o ReVitaliza Fitness
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
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Interface para mensagem de suporte
interface SupportMessage {
  id?: string;
  userId: string;
  subject: string;
  message: string;
  status: 'enviado' | 'em_análise' | 'respondido' | 'resolvido';
  date: Date | Timestamp;
  category: 'dúvida' | 'sugestão' | 'problema_técnico' | 'elogio';
  response?: {
    message: string;
    date: Date | Timestamp;
    respondedBy: string;
  };
}

// Interface para FAQ
interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Interface para agendamento de vídeo
interface VideoAppointment {
  id?: string;
  userId: string;
  date: Date | Timestamp;
  duration: number; // em minutos
  subject: string;
  status: 'agendado' | 'concluído' | 'cancelado';
  professionalId?: string;
  meetingUrl?: string;
}

// Serviço de suporte
export const SupportService = {
  // Enviar mensagem de suporte
  sendSupportMessage: async (message: SupportMessage) => {
    try {
      const messagesRef = collection(db, 'supportMessages');
      const newMessageRef = doc(messagesRef);
      
      await setDoc(newMessageRef, {
        ...message,
        id: newMessageRef.id,
        date: Timestamp.fromDate(new Date(message.date)),
        status: 'enviado',
        createdAt: Timestamp.now()
      });
      
      return { 
        success: true, 
        id: newMessageRef.id 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter mensagens de suporte de um usuário
  getUserSupportMessages: async (userId: string) => {
    try {
      const messagesRef = collection(db, 'supportMessages');
      const q = query(
        messagesRef, 
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SupportMessage[];
      
      return { success: true, messages };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter mensagem de suporte específica
  getSupportMessageById: async (id: string) => {
    try {
      const messageRef = doc(db, 'supportMessages', id);
      const messageDoc = await getDoc(messageRef);
      
      if (messageDoc.exists()) {
        const message = {
          id: messageDoc.id,
          ...messageDoc.data()
        } as SupportMessage;
        
        return { success: true, message };
      } else {
        return { 
          success: false, 
          error: 'Mensagem não encontrada' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter FAQs
  getFAQs: async (category?: string) => {
    try {
      const faqsRef = collection(db, 'faqs');
      let q;
      
      if (category) {
        q = query(
          faqsRef, 
          where('category', '==', category),
          orderBy('order', 'asc')
        );
      } else {
        q = query(
          faqsRef, 
          orderBy('order', 'asc')
        );
      }
      
      const querySnapshot = await getDocs(q);
      
      const faqs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FAQ[];
      
      return { success: true, faqs };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Agendar atendimento por vídeo
  scheduleVideoAppointment: async (appointment: VideoAppointment) => {
    try {
      const appointmentsRef = collection(db, 'videoAppointments');
      const newAppointmentRef = doc(appointmentsRef);
      
      await setDoc(newAppointmentRef, {
        ...appointment,
        id: newAppointmentRef.id,
        date: Timestamp.fromDate(new Date(appointment.date)),
        status: 'agendado',
        createdAt: Timestamp.now()
      });
      
      return { 
        success: true, 
        id: newAppointmentRef.id 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter agendamentos de vídeo de um usuário
  getUserVideoAppointments: async (userId: string) => {
    try {
      const appointmentsRef = collection(db, 'videoAppointments');
      const q = query(
        appointmentsRef, 
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      const appointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VideoAppointment[];
      
      return { success: true, appointments };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Atualizar status de agendamento de vídeo
  updateVideoAppointmentStatus: async (id: string, status: 'agendado' | 'concluído' | 'cancelado', meetingUrl?: string) => {
    try {
      const appointmentRef = doc(db, 'videoAppointments', id);
      
      const updateData: any = { status };
      
      if (meetingUrl) {
        updateData.meetingUrl = meetingUrl;
      }
      
      await updateDoc(appointmentRef, updateData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
};

export default SupportService;
