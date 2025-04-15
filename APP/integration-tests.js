import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AuthService from '../src/services/auth.service';
import TrainingService from '../src/services/training.service';
import HealthService from '../src/services/health.service';
import UserProfileService from '../src/services/user-profile.service';
import SupportService from '../src/services/support.service';

// Mock dos serviços
jest.mock('../src/services/auth.service');
jest.mock('../src/services/training.service');
jest.mock('../src/services/health.service');
jest.mock('../src/services/user-profile.service');
jest.mock('../src/services/support.service');

// Configuração da store mock
const mockStore = configureStore([]);

describe('Testes de Integração com Backend', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: null,
        loading: false,
        error: null
      },
      training: {
        trainings: [],
        scheduledTrainings: [],
        loading: false,
        error: null
      },
      health: {
        healthRecords: [],
        reminders: [],
        loading: false,
        error: null
      },
      support: {
        messages: [],
        faqs: [],
        loading: false,
        error: null
      }
    });

    // Reset dos mocks
    jest.clearAllMocks();
  });

  test('Autenticação - Registro de usuário', async () => {
    const mockUser = {
      name: 'Maria Silva',
      email: 'maria@exemplo.com',
      password: 'senha123',
      age: 65
    };

    const mockResponse = {
      success: true,
      user: {
        uid: '123456',
        email: mockUser.email,
        displayName: mockUser.name
      }
    };

    AuthService.register.mockResolvedValue(mockResponse);

    // Simular chamada ao serviço
    const result = await AuthService.register(mockUser);

    expect(AuthService.register).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockResponse);
  });

  test('Treinos - Obter lista de treinos', async () => {
    const mockTrainings = [
      {
        id: '1',
        title: 'Alongamento Matinal',
        description: 'Série de alongamentos suaves para começar o dia com mais disposição.',
        duration: '15 minutos',
        level: 'Iniciante'
      },
      {
        id: '2',
        title: 'Fortalecimento de Pernas',
        description: 'Exercícios para fortalecer as pernas e melhorar a estabilidade.',
        duration: '20 minutos',
        level: 'Moderado'
      }
    ];

    const mockResponse = {
      success: true,
      trainings: mockTrainings
    };

    TrainingService.getAllTrainings.mockResolvedValue(mockResponse);

    // Simular chamada ao serviço
    const result = await TrainingService.getAllTrainings();

    expect(TrainingService.getAllTrainings).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  test('Saúde - Registrar indicadores de saúde', async () => {
    const mockHealthRecord = {
      userId: '123456',
      date: new Date(),
      pressure: '130/85',
      weight: 72.5,
      glucose: 110,
      mood: 'Bem'
    };

    const mockResponse = {
      success: true,
      id: 'health123'
    };

    HealthService.addHealthRecord.mockResolvedValue(mockResponse);

    // Simular chamada ao serviço
    const result = await HealthService.addHealthRecord(mockHealthRecord);

    expect(HealthService.addHealthRecord).toHaveBeenCalledWith(mockHealthRecord);
    expect(result).toEqual(mockResponse);
  });

  test('Perfil - Adicionar meta de usuário', async () => {
    const userId = '123456';
    const mockGoal = {
      title: 'Melhorar condicionamento físico',
      description: 'Fazer exercícios 3 vezes por semana',
      targetDate: new Date(),
      completed: false
    };

    const mockResponse = {
      success: true,
      goalId: 'goal123'
    };

    UserProfileService.addUserGoal.mockResolvedValue(mockResponse);

    // Simular chamada ao serviço
    const result = await UserProfileService.addUserGoal(userId, mockGoal);

    expect(UserProfileService.addUserGoal).toHaveBeenCalledWith(userId, mockGoal);
    expect(result).toEqual(mockResponse);
  });

  test('Suporte - Enviar mensagem de suporte', async () => {
    const mockMessage = {
      userId: '123456',
      subject: 'Dúvida sobre exercícios',
      message: 'Preciso de ajuda com os exercícios para as costas',
      date: new Date(),
      category: 'dúvida',
      status: 'enviado'
    };

    const mockResponse = {
      success: true,
      id: 'message123'
    };

    SupportService.sendSupportMessage.mockResolvedValue(mockResponse);

    // Simular chamada ao serviço
    const result = await SupportService.sendSupportMessage(mockMessage);

    expect(SupportService.sendSupportMessage).toHaveBeenCalledWith(mockMessage);
    expect(result).toEqual(mockResponse);
  });

  test('Suporte - Obter FAQs', async () => {
    const mockFaqs = [
      {
        id: '1',
        question: 'Como aferir corretamente a pressão arterial?',
        answer: 'Sente-se em uma cadeira com as costas apoiadas, deixe o braço na altura do coração...',
        category: 'saúde',
        order: 1
      },
      {
        id: '2',
        question: 'Posso fazer os exercícios mesmo com dores nas articulações?',
        answer: 'Consulte seu médico antes. Nossos exercícios são adaptados...',
        category: 'exercícios',
        order: 2
      }
    ];

    const mockResponse = {
      success: true,
      faqs: mockFaqs
    };

    SupportService.getFAQs.mockResolvedValue(mockResponse);

    // Simular chamada ao serviço
    const result = await SupportService.getFAQs();

    expect(SupportService.getFAQs).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});
