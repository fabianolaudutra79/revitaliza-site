import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import theme from '../../theme/theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>
          Entre com seus dados para continuar sua jornada de saúde e bem-estar
        </Text>

        <View style={styles.form}>
          <TextInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.primary}
            contentStyle={styles.inputText}
          />

          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry={!showPassword}
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.primary}
            contentStyle={styles.inputText}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
                size={24}
              />
            }
          />

          <Button
            mode="text"
            onPress={() => {}}
            style={styles.forgotButton}
            labelStyle={styles.forgotButtonText}
          >
            Esqueci minha senha
          </Button>
        </View>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Entrar
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Register')}
          style={styles.registerButton}
          labelStyle={styles.registerButtonText}
        >
          Não tenho uma conta
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.accessibility.spacing.large,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    height: theme.accessibility.inputHeight,
    backgroundColor: theme.colors.background,
  },
  inputText: {
    fontSize: 18,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 20,
  },
  forgotButtonText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  button: {
    height: theme.accessibility.buttonHeight,
    justifyContent: 'center',
    borderRadius: theme.accessibility.buttonRadius,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 10,
  },
  registerButtonText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
});

export default LoginScreen;
