// Configuração do Firebase para o ReVitaliza Fitness
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuração do Firebase (substitua com suas próprias credenciais quando for implementar)
const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "revitaliza-fitness.firebaseapp.com",
  projectId: "revitaliza-fitness",
  storageBucket: "revitaliza-fitness.appspot.com",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar serviços do Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
