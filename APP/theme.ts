import { DefaultTheme } from 'react-native-paper';

// Tema personalizado com foco em acessibilidade para público 50+
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50', // Verde - cor principal
    accent: '#2196F3',  // Azul claro - cor secundária
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#212121',
    error: '#D32F2F',
    disabled: '#9E9E9E',
    placeholder: '#757575',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF9800',
  },
  fonts: {
    ...DefaultTheme.fonts,
    // Aumentando o tamanho das fontes para melhor legibilidade
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      fontSize: 18,
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
      fontSize: 18,
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
      fontSize: 18,
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
      fontSize: 18,
    },
  },
  // Configurações específicas para acessibilidade
  accessibility: {
    buttonHeight: 56, // Botões maiores para facilitar o toque
    buttonRadius: 8,  // Bordas arredondadas, mas não excessivamente
    inputHeight: 60,  // Campos de entrada maiores
    spacing: {
      small: 8,
      medium: 16,
      large: 24,
      xlarge: 32,
    },
    iconSize: {
      small: 24,
      medium: 32,
      large: 40,
    },
  },
};

export default theme;
