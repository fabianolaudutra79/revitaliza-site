import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/theme/theme';

// Importação de telas (serão criadas posteriormente)
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import TrainingScreen from './src/screens/treinos/TrainingScreen';
import HealthScreen from './src/screens/saude/HealthScreen';
import ProfileScreen from './src/screens/perfil/ProfileScreen';
import SupportScreen from './src/screens/suporte/SupportScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Onboarding"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22, // Fonte maior para melhor legibilidade
            },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Entrar' }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ title: 'Criar Conta' }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'ReVitaliza Fitness' }}
          />
          <Stack.Screen 
            name="Training" 
            component={TrainingScreen} 
            options={{ title: 'Treinos' }}
          />
          <Stack.Screen 
            name="Health" 
            component={HealthScreen} 
            options={{ title: 'Saúde' }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'Perfil' }}
          />
          <Stack.Screen 
            name="Support" 
            component={SupportScreen} 
            options={{ title: 'Suporte' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
