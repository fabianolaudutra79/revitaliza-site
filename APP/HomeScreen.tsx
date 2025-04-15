import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Avatar, IconButton } from 'react-native-paper';
import theme from '../../theme/theme';

const HomeScreen = ({ navigation }) => {
  // Dados simulados para o treino do dia
  const todayTraining = {
    title: 'Alongamento Matinal',
    duration: '15 minutos',
    level: 'Iniciante',
    description: 'Série de alongamentos suaves para começar o dia com mais disposição.',
  };

  // Dados simulados para mensagem motivacional
  const motivationalMessage = {
    text: 'Cada pequeno passo é uma vitória. Continue cuidando da sua saúde!',
    author: 'Equipe ReVitaliza',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, Maria!</Text>
        <Text style={styles.date}>Terça-feira, 15 de Abril</Text>
      </View>

      {/* Treino do dia */}
      <Card style={styles.card}>
        <Card.Title 
          title="Seu treino de hoje" 
          titleStyle={styles.cardTitle}
          right={(props) => (
            <IconButton
              {...props}
              icon="calendar"
              size={28}
              onPress={() => navigation.navigate('Training')}
            />
          )}
        />
        <Card.Content>
          <Text style={styles.trainingTitle}>{todayTraining.title}</Text>
          <View style={styles.trainingInfo}>
            <Text style={styles.trainingDetail}>⏱️ {todayTraining.duration}</Text>
            <Text style={styles.trainingDetail}>🔄 {todayTraining.level}</Text>
          </View>
          <Text style={styles.trainingDescription}>{todayTraining.description}</Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="contained" 
            onPress={() => {}} 
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Começar agora
          </Button>
        </Card.Actions>
      </Card>

      {/* Mensagem motivacional */}
      <Card style={styles.card}>
        <Card.Title 
          title="Mensagem do dia" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="heart" style={styles.cardIcon} />}
        />
        <Card.Content>
          <Text style={styles.motivationalText}>"{motivationalMessage.text}"</Text>
          <Text style={styles.motivationalAuthor}>- {motivationalMessage.author}</Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="outlined" 
            onPress={() => {}} 
            style={styles.outlinedButton}
            labelStyle={styles.outlinedButtonText}
          >
            Ouvir mensagem
          </Button>
        </Card.Actions>
      </Card>

      {/* Monitoramento de saúde */}
      <Card style={styles.card}>
        <Card.Title 
          title="Monitoramento de saúde" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="heart-pulse" style={styles.cardIcon} />}
        />
        <Card.Content>
          <Text style={styles.healthText}>Registre seus indicadores de saúde diariamente para acompanhar seu progresso.</Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('Health')} 
            style={styles.outlinedButton}
            labelStyle={styles.outlinedButtonText}
          >
            Registrar agora
          </Button>
        </Card.Actions>
      </Card>

      {/* Menu rápido */}
      <View style={styles.quickMenu}>
        <Text style={styles.quickMenuTitle}>Menu rápido</Text>
        <View style={styles.quickMenuButtons}>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Training')} 
            style={styles.quickButton}
            labelStyle={styles.quickButtonText}
            icon="dumbbell"
          >
            Treinos
          </Button>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Health')} 
            style={styles.quickButton}
            labelStyle={styles.quickButtonText}
            icon="heart-pulse"
          >
            Saúde
          </Button>
          <Button 
            mode="contained" 
            onPress={() => {}} 
            style={styles.quickButton}
            labelStyle={styles.quickButtonText}
            icon="chart-line"
          >
            Progresso
          </Button>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Support')} 
            style={styles.quickButton}
            labelStyle={styles.quickButtonText}
            icon="help-circle"
          >
            Suporte
          </Button>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Profile')} 
            style={styles.quickButton}
            labelStyle={styles.quickButtonText}
            icon="account"
          >
            Perfil
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.accessibility.spacing.large,
    paddingBottom: theme.accessibility.spacing.medium,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  date: {
    fontSize: 18,
    color: theme.colors.text,
    marginTop: 5,
  },
  card: {
    marginHorizontal: theme.accessibility.spacing.large,
    marginBottom: theme.accessibility.spacing.large,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardIcon: {
    backgroundColor: theme.colors.primary,
  },
  trainingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trainingInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  trainingDetail: {
    fontSize: 16,
    marginRight: 20,
  },
  trainingDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  cardActions: {
    justifyContent: 'center',
    paddingHorizontal: theme.accessibility.spacing.large,
    paddingBottom: theme.accessibility.spacing.large,
  },
  button: {
    height: theme.accessibility.buttonHeight,
    justifyContent: 'center',
    borderRadius: theme.accessibility.buttonRadius,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  outlinedButton: {
    height: theme.accessibility.buttonHeight,
    justifyContent: 'center',
    borderRadius: theme.accessibility.buttonRadius,
    width: '100%',
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  outlinedButtonText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  motivationalText: {
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 26,
    marginBottom: 10,
  },
  motivationalAuthor: {
    fontSize: 16,
    textAlign: 'right',
    color: theme.colors.text,
  },
  healthText: {
    fontSize: 16,
    lineHeight: 24,
  },
  quickMenu: {
    padding: theme.accessibility.spacing.large,
    marginBottom: theme.accessibility.spacing.large,
  },
  quickMenuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickMenuButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickButton: {
    width: '48%',
    marginBottom: 15,
    height: theme.accessibility.buttonHeight,
    justifyContent: 'center',
    borderRadius: theme.accessibility.buttonRadius,
  },
  quickButtonText: {
    fontSize: 16,
  },
});

export default HomeScreen;
