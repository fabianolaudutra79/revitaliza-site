// Configuração inicial do banco de dados Firestore para o ReVitaliza Fitness
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
const db = getFirestore(app);
const auth = getAuth(app);

// Função para inicializar o banco de dados com dados iniciais
export const initializeDatabase = async () => {
  try {
    // Criar usuário admin
    const adminEmail = 'admin@revitalizafitness.com';
    const adminPassword = 'senha_segura_admin'; // Deve ser alterada em produção
    
    let adminUid;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      adminUid = userCredential.user.uid;
    } catch (error) {
      // Se o usuário já existir, continue com a inicialização
      console.log('Admin já existe ou erro ao criar:', error.message);
      // Em uma implementação real, você precisaria obter o UID do admin existente
      adminUid = 'admin_uid_placeholder';
    }
    
    // Criar usuário admin no Firestore
    await setDoc(doc(db, 'users', adminUid), {
      name: 'Administrador',
      email: adminEmail,
      role: 'admin',
      createdAt: new Date()
    });
    
    // Inicializar FAQs
    const batch = writeBatch(db);
    
    const faqs = [
      {
        question: 'Como aferir corretamente a pressão arterial?',
        answer: 'Sente-se em uma cadeira com as costas apoiadas, deixe o braço na altura do coração, relaxe por 5 minutos antes de medir, não fale durante a medição e evite café ou exercícios 30 minutos antes.',
        category: 'saúde',
        order: 1,
        createdAt: new Date()
      },
      {
        question: 'Posso fazer os exercícios mesmo com dores nas articulações?',
        answer: 'Consulte seu médico antes. Nossos exercícios são adaptados, mas é importante ter liberação médica, especialmente se você sente dores.',
        category: 'exercícios',
        order: 2,
        createdAt: new Date()
      },
      {
        question: 'Como exportar meus dados para mostrar ao médico?',
        answer: 'Na tela de Saúde, toque em "Gerar relatório PDF". O arquivo será salvo e você poderá compartilhá-lo por e-mail ou WhatsApp.',
        category: 'app',
        order: 3,
        createdAt: new Date()
      }
    ];
    
    faqs.forEach((faq, index) => {
      const faqRef = doc(collection(db, 'faqs'));
      batch.set(faqRef, faq);
    });
    
    // Inicializar treinos de exemplo
    const trainings = [
      {
        title: 'Alongamento Matinal',
        description: 'Série de alongamentos suaves para começar o dia com mais disposição.',
        duration: '15 minutos',
        level: 'Iniciante',
        videoUrl: 'https://example.com/videos/alongamento-matinal',
        category: 'alongamento',
        tags: ['manhã', 'iniciante', 'alongamento'],
        createdAt: new Date(),
        createdBy: adminUid
      },
      {
        title: 'Fortalecimento de Pernas',
        description: 'Exercícios para fortalecer as pernas e melhorar a estabilidade.',
        duration: '20 minutos',
        level: 'Moderado',
        videoUrl: 'https://example.com/videos/fortalecimento-pernas',
        category: 'fortalecimento',
        tags: ['pernas', 'moderado', 'fortalecimento'],
        createdAt: new Date(),
        createdBy: adminUid
      },
      {
        title: 'Yoga para Iniciantes',
        description: 'Introdução ao yoga com posturas simples e foco na respiração.',
        duration: '25 minutos',
        level: 'Iniciante',
        videoUrl: 'https://example.com/videos/yoga-iniciantes',
        category: 'yoga',
        tags: ['yoga', 'iniciante', 'respiração'],
        createdAt: new Date(),
        createdBy: adminUid
      }
    ];
    
    trainings.forEach((training, index) => {
      const trainingRef = doc(collection(db, 'trainings'));
      batch.set(trainingRef, training);
    });
    
    // Inicializar mensagens motivacionais
    const motivationalMessages = [
      {
        text: 'Cada pequeno passo é uma vitória. Continue cuidando da sua saúde!',
        author: 'Equipe ReVitaliza',
        category: 'motivação',
        active: true,
        createdAt: new Date()
      },
      {
        text: 'A idade é apenas um número. O que importa é como você se sente!',
        author: 'Equipe ReVitaliza',
        category: 'motivação',
        active: true,
        createdAt: new Date()
      },
      {
        text: 'Movimento é vida. Celebre cada conquista, por menor que pareça.',
        author: 'Equipe ReVitaliza',
        category: 'motivação',
        active: true,
        createdAt: new Date()
      }
    ];
    
    motivationalMessages.forEach((message, index) => {
      const messageRef = doc(collection(db, 'motivationalMessages'));
      batch.set(messageRef, message);
    });
    
    // Commit do batch
    await batch.commit();
    
    console.log('Banco de dados inicializado com sucesso!');
    return { success: true };
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

export default initializeDatabase;
