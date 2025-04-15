import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import theme from '../../theme/theme';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Criar sua conta</Text>
        <Text style={styles.subtitle}>
          Preencha os dados abaixo para começar sua jornada de saúde e bem-estar
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Nome completo"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.primary}
            contentStyle={styles.inputText}
          />

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

          <TextInput
            label="Idade"
            value={age}
            onChangeText={setAge}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.primary}
            contentStyle={styles.inputText}
          />
        </View>

        <Text style={styles.privacyText}>
          Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade.
        </Text>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Criar Conta
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
          labelStyle={styles.loginButtonText}
        >
          Já tenho uma conta
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
  privacyText: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
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
  loginButton: {
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
});

export default RegisterScreen;
