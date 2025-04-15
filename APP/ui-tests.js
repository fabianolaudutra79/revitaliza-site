import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import OnboardingScreen from '../src/screens/onboarding/OnboardingScreen';
import LoginScreen from '../src/screens/auth/LoginScreen';
import RegisterScreen from '../src/screens/auth/RegisterScreen';
import HomeScreen from '../src/screens/home/HomeScreen';
import TrainingScreen from '../src/screens/treinos/TrainingScreen';
import HealthScreen from '../src/screens/saude/HealthScreen';
import ProfileScreen from '../src/screens/perfil/ProfileScreen';
import SupportScreen from '../src/screens/suporte/SupportScreen';

// Mock para o hook de navegação
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Testes de Interface do Usuário', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('OnboardingScreen deve renderizar corretamente', () => {
    const { getByText } = render(<OnboardingScreen navigation={{ navigate: mockNavigate }} />);
    
    expect(getByText('ReVitaliza Fitness')).toBeTruthy();
    expect(getByText('Saúde e bem-estar para o público 50+')).toBeTruthy();
    
    // Testar navegação para tela de registro
    const createAccountButton = getByText('Criar Conta');
    fireEvent.press(createAccountButton);
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

  test('LoginScreen deve renderizar corretamente', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
    
    expect(getByText('Bem-vindo de volta!')).toBeTruthy();
    
    // Testar campos de entrada
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');
    
    fireEvent.changeText(emailInput, 'teste@exemplo.com');
    fireEvent.changeText(passwordInput, 'senha123');
    
    // Testar navegação para tela inicial
    const loginButton = getByText('Entrar');
    fireEvent.press(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  test('RegisterScreen deve renderizar corretamente', () => {
    const { getByText, getByPlaceholderText } = render(<RegisterScreen navigation={{ navigate: mockNavigate }} />);
    
    expect(getByText('Criar sua conta')).toBeTruthy();
    
    // Testar campos de entrada
    const nameInput = getByPlaceholderText('Nome completo');
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');
    const ageInput = getByPlaceholderText('Idade');
    
    fireEvent.changeText(nameInput, 'João Silva');
    fireEvent.changeText(emailInput, 'joao@exemplo.com');
    fireEvent.changeText(passwordInput, 'senha123');
    fireEvent.changeText(ageInput, '65');
    
    // Testar navegação para tela inicial
    const registerButton = getByText('Criar Conta');
    fireEvent.press(registerButton);
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  test('HomeScreen deve renderizar corretamente', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: mockNavigate }} />);
    
    expect(getByText('Seu treino de hoje')).toBeTruthy();
    expect(getByText('Mensagem do dia')).toBeTruthy();
    expect(getByText('Monitoramento de saúde')).toBeTruthy();
    
    // Testar navegação para tela de treinos
    const trainingButton = getByText('Treinos');
    fireEvent.press(trainingButton);
    expect(mockNavigate).toHaveBeenCalledWith('Training');
  });

  test('TrainingScreen deve renderizar corretamente', () => {
    const { getByText } = render(<TrainingScreen navigation={{ navigate: mockNavigate }} />);
    
    expect(getByText('Seus treinos para hoje')).toBeTruthy();
    expect(getByText('Sugestões para você')).toBeTruthy();
    
    // Testar botão de vídeo
    const videoButton = getByText('Ver vídeo');
    fireEvent.press(videoButton);
    // Aqui você testaria a funcionalidade de reprodução de vídeo
  });

  test('HealthScreen deve renderizar corretamente', () => {
    const { getByText, getByPlaceholderText } = render(<HealthScreen navigation={{ navigate: mockNavigate }} />);
    
    expect(getByText('Registrar indicadores')).toBeTruthy();
    expect(getByText('Histórico recente')).toBeTruthy();
    expect(getByText('Lembretes personalizados')).toBeTruthy();
    
    // Testar campos de entrada
    const pressureInput = getByPlaceholderText('Ex: 120/80');
    const weightInput = getByPlaceholderText('Ex: 70.5');
    
    fireEvent.changeText(pressureInput, '130/85');
    fireEvent.changeText(weightInput, '72.5');
    
    // Testar botão de salvar
    const saveButton = getByText('Salvar registro');
    fireEvent.press(saveButton);
    // Aqui você testaria a funcionalidade de salvar registro
  });

  test('ProfileScreen deve renderizar corretamente', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: mockNavigate }} />);
    
    expect(getByText('Minhas metas')).toBeTruthy();
    expect(getByText('Conquistas')).toBeTruthy();
    expect(getByText('Configurações')).toBeTruthy();
    
    // Testar botão de adicionar meta
    const addGoalButton = getByText('Adicionar meta');
    fireEvent.press(addGoalButton);
    // Aqui você testaria a funcionalidade de adicionar meta
  });

  test('SupportScreen deve renderizar corretamente', () => {
    const { getByText, getByPlaceholderText } = render(<SupportScreen navigation={{ navigate: mockNavigate }} />);
    
    expect(getByText('Fale conosco')).toBeTruthy();
    expect(getByText('Perguntas frequentes')).toBeTruthy();
    expect(getByText('Atendimento por vídeo')).toBeTruthy();
    
    // Testar campo de mensagem
    const messageInput = getByPlaceholderText('Sua mensagem');
    fireEvent.changeText(messageInput, 'Preciso de ajuda com os exercícios');
    
    // Testar botão de enviar
    const sendButton = getByText('Enviar mensagem');
    fireEvent.press(sendButton);
    // Aqui você testaria a funcionalidade de enviar mensagem
  });
});
