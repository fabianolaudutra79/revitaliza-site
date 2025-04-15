// Mock para os componentes e serviços necessários para os testes
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

// Mock para o Firebase
jest.mock('../src/services/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  },
  db: {},
  storage: {},
}));

// Mock para os serviços
jest.mock('../src/services/auth.service', () => ({
  register: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  resetPassword: jest.fn(),
  getCurrentUser: jest.fn(),
}));

jest.mock('../src/services/training.service', () => ({
  getAllTrainings: jest.fn(),
  getTrainingsByLevel: jest.fn(),
  getTrainingById: jest.fn(),
  scheduleTraining: jest.fn(),
  getUserScheduledTrainings: jest.fn(),
  updateTrainingStatus: jest.fn(),
}));

jest.mock('../src/services/health.service', () => ({
  addHealthRecord: jest.fn(),
  getUserHealthRecords: jest.fn(),
  getHealthRecordById: jest.fn(),
  addReminder: jest.fn(),
  getUserReminders: jest.fn(),
  updateReminderStatus: jest.fn(),
  generateHealthReport: jest.fn(),
}));

jest.mock('../src/services/user-profile.service', () => ({
  getUserProfile: jest.fn(),
  updateUserProfile: jest.fn(),
  addUserGoal: jest.fn(),
  updateUserGoal: jest.fn(),
  addUserAchievement: jest.fn(),
  updateUserSettings: jest.fn(),
}));

jest.mock('../src/services/support.service', () => ({
  sendSupportMessage: jest.fn(),
  getUserSupportMessages: jest.fn(),
  getSupportMessageById: jest.fn(),
  getFAQs: jest.fn(),
  scheduleVideoAppointment: jest.fn(),
  getUserVideoAppointments: jest.fn(),
  updateVideoAppointmentStatus: jest.fn(),
}));

// Mock para os assets
jest.mock('../src/assets/logo-placeholder.png', () => 'logo-placeholder.png');
