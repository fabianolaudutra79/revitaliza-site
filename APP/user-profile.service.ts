// Serviço de perfil de usuário para o ReVitaliza Fitness
import { 
  doc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Interface para meta do usuário
interface UserGoal {
  id?: string;
  title: string;
  description?: string;
  targetDate?: Date | Timestamp;
  completed: boolean;
  createdAt?: Date | Timestamp;
}

// Interface para conquista do usuário
interface UserAchievement {
  id?: string;
  title: string;
  description?: string;
  icon: string;
  date: Date | Timestamp;
}

// Interface para configurações do usuário
interface UserSettings {
  notifications: boolean;
  shareWithFamily: boolean;
  monthlyReports: boolean;
  theme?: 'light' | 'dark';
  fontSize?: 'normal' | 'large' | 'extra-large';
}

// Serviço de perfil de usuário
export const UserProfileService = {
  // Obter perfil do usuário
  getUserProfile: async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return { 
          success: true, 
          profile: userDoc.data() 
        };
      } else {
        return { 
          success: false, 
          error: 'Usuário não encontrado' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Atualizar perfil do usuário
  updateUserProfile: async (userId: string, data: any) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, data);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Adicionar meta
  addUserGoal: async (userId: string, goal: UserGoal) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      const newGoal = {
        ...goal,
        id: Date.now().toString(),
        createdAt: Timestamp.now(),
        completed: false
      };
      
      if (goal.targetDate) {
        newGoal.targetDate = Timestamp.fromDate(new Date(goal.targetDate));
      }
      
      await updateDoc(userRef, {
        goals: arrayUnion(newGoal)
      });
      
      return { 
        success: true, 
        goalId: newGoal.id 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Atualizar meta
  updateUserGoal: async (userId: string, oldGoal: UserGoal, updatedGoal: UserGoal) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      // Remover a meta antiga
      await updateDoc(userRef, {
        goals: arrayRemove(oldGoal)
      });
      
      // Adicionar a meta atualizada
      await updateDoc(userRef, {
        goals: arrayUnion(updatedGoal)
      });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Adicionar conquista
  addUserAchievement: async (userId: string, achievement: UserAchievement) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      const newAchievement = {
        ...achievement,
        id: Date.now().toString(),
        date: Timestamp.fromDate(new Date(achievement.date))
      };
      
      await updateDoc(userRef, {
        achievements: arrayUnion(newAchievement)
      });
      
      return { 
        success: true, 
        achievementId: newAchievement.id 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Atualizar configurações do usuário
  updateUserSettings: async (userId: string, settings: UserSettings) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, { settings });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
};

export default UserProfileService;
