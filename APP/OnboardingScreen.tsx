import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../../theme/theme';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logo-placeholder.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>ReVitaliza Fitness</Text>
        <Text style={styles.subtitle}>Saúde e bem-estar para o público 50+</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Bem-vindo ao ReVitaliza Fitness, seu aplicativo de saúde e bem-estar 
          pensado especialmente para você!
        </Text>
        
        <Text style={styles.features}>
          • Treinos adaptados para diferentes condições físicas{'\n'}
          • Monitoramento de saúde simplificado{'\n'}
          • Lembretes personalizados{'\n'}
          • Suporte humano quando precisar
        </Text>
      </View>

      <View style={styles.footer}>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Criar Conta
        </Button>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.accessibility.spacing.large,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
  },
  content: {
    marginVertical: 40,
  },
  description: {
    fontSize: 20,
    lineHeight: 28,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  features: {
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.text,
    marginLeft: 20,
  },
  footer: {
    marginBottom: 30,
  },
  button: {
    height: theme.accessibility.buttonHeight,
    justifyContent: 'center',
    borderRadius: theme.accessibility.buttonRadius,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
    padding: 10,
  },
  loginText: {
    fontSize: 18,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;
