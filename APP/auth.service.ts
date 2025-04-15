// Serviço de autenticação para o ReVitaliza Fitness
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Interface para dados de registro
interface RegisterData {
  name: string;
  email: string;
  password: string;
  age: number;
}

// Interface para dados de login
interface LoginData {
  email: string;
  password: string;
}

// Serviço de autenticação
export const AuthService = {
  // Registrar novo usuário
  register: async (data: RegisterData) => {
    try {
      // Criar usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );
      
      const user = userCredential.user;
      
      // Atualizar perfil do usuário com nome
      await updateProfile(user, {
        displayName: data.name
      });
      
      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: data.name,
        email: data.email,
        age: data.age,
        createdAt: new Date().toISOString(),
        goals: [],
        achievements: []
      });
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Login de usuário
  login: async (data: LoginData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );
      
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Logout de usuário
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Recuperação de senha
  resetPassword: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },
  
  // Obter usuário atual
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  }
};

export default AuthService;
