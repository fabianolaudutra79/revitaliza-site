import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

// Mock de navegação
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// Mock de serviços
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

// Configuração da store mock
const mockStore = configureStore([]);

describe('Testes de Funcionalidade do Aplicativo', () => {
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

  test('Fluxo de navegação principal do aplicativo', async () => {
    // Este teste simula o fluxo principal de navegação do usuário pelo aplicativo
    
    // Renderizar o aplicativo com a store mock
    const { getByText, getByTestId, queryByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Verificar se a tela de onboarding é exibida inicialmente
    expect(getByText('ReVitaliza Fitness')).toBeTruthy();
    expect(getByText('Saúde e bem-estar para o público 50+')).toBeTruthy();

    // Simular navegação para tela de registro
    await act(async () => {
      fireEvent.press(getByText('Criar Conta'));
    });

    // Verificar se a tela de registro é exibida
    expect(getByText('Criar sua conta')).toBeTruthy();

    // Simular preenchimento do formulário de registro
    await act(async () => {
      fireEvent.changeText(getByTestId('name-input'), 'Maria Silva');
      fireEvent.changeText(getByTestId('email-input'), 'maria@exemplo.com');
      fireEvent.changeText(getByTestId('password-input'), 'senha123');
      fireEvent.changeText(getByTestId('age-input'), '65');
    });

    // Simular envio do formulário
    await act(async () => {
      fireEvent.press(getByText('Criar Conta'));
    });

    // Verificar se a tela inicial é exibida após o registro
    expect(getByText('Seu treino de hoje')).toBeTruthy();
    expect(getByText('Mensagem do dia')).toBeTruthy();

    // Simular navegação para tela de treinos
    await act(async () => {
      fireEvent.press(getByText('Treinos'));
    });

    // Verificar se a tela de treinos é exibida
    expect(getByText('Seus treinos para hoje')).toBeTruthy();

    // Simular navegação para tela de saúde
    await act(async () => {
      fireEvent.press(getByText('Saúde'));
    });

    // Verificar se a tela de saúde é exibida
    expect(getByText('Registrar indicadores')).toBeTruthy();

    // Simular navegação para tela de perfil
    await act(async () => {
      fireEvent.press(getByText('Perfil'));
    });

    // Verificar se a tela de perfil é exibida
    expect(getByText('Minhas metas')).toBeTruthy();

    // Simular navegação para tela de suporte
    await act(async () => {
      fireEvent.press(getByText('Suporte'));
    });

    // Verificar se a tela de suporte é exibida
    expect(getByText('Fale conosco')).toBeTruthy();

    // Simular logout
    await act(async () => {
      fireEvent.press(getByText('Sair da conta'));
    });

    // Verificar se voltou para a tela de onboarding
    expect(getByText('ReVitaliza Fitness')).toBeTruthy();
  });

  test('Funcionalidade de registro de saúde', async () => {
    // Este teste simula o fluxo de registro de indicadores de saúde
    
    // Configurar store com usuário logado
    store = mockStore({
      auth: {
        user: { uid: '123456', displayName: 'Maria Silva' },
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

    // Renderizar a tela de saúde diretamente
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <HealthScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Verificar se a tela de saúde é exibida
    expect(getByText('Registrar indicadores')).toBeTruthy();

    // Simular preenchimento do formulário de registro de saúde
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Ex: 120/80'), '130/85');
      fireEvent.changeText(getByPlaceholderText('Ex: 70.5'), '72.5');
      fireEvent.changeText(getByPlaceholderText('Ex: 100'), '110');
      fireEvent.changeText(getByPlaceholderText('Ex: Bem, cansado...'), 'Bem disposto');
    });

    // Simular envio do formulário
    await act(async () => {
      fireEvent.press(getByText('Salvar registro'));
    });

    // Verificar se o registro foi salvo (verificando se a store foi chamada com a ação correta)
    const actions = store.getActions();
    expect(actions.some(action => action.type.includes('health/addHealthRecord'))).toBeTruthy();
  });

  test('Funcionalidade de agendamento de treino', async () => {
    // Este teste simula o fluxo de agendamento de treino
    
    // Configurar store com usuário logado e treinos disponíveis
    store = mockStore({
      auth: {
        user: { uid: '123456', displayName: 'Maria Silva' },
        loading: false,
        error: null
      },
      training: {
        trainings: [
          {
            id: '1',
            title: 'Alongamento Matinal',
            description: 'Série de alongamentos suaves para começar o dia com mais disposição.',
            duration: '15 minutos',
            level: 'Iniciante'
          }
        ],
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

    // Renderizar a tela de treinos diretamente
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <TrainingScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Verificar se a tela de treinos é exibida
    expect(getByText('Seus treinos para hoje')).toBeTruthy();

    // Verificar se o treino disponível é exibido
    expect(getByText('Alongamento Matinal')).toBeTruthy();

    // Simular clique no botão de ver vídeo
    await act(async () => {
      fireEvent.press(getByText('Ver vídeo'));
    });

    // Verificar se o player de vídeo é exibido ou se há navegação para a tela de vídeo
    // (Isso depende da implementação específica)

    // Simular clique no botão de marcar como concluído
    await act(async () => {
      fireEvent.press(getByText('Marcar como concluído'));
    });

    // Verificar se o treino foi marcado como concluído (verificando se a store foi chamada com a ação correta)
    const actions = store.getActions();
    expect(actions.some(action => action.type.includes('training/updateTrainingStatus'))).toBeTruthy();
  });
});
