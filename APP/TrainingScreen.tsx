import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Divider, List, Avatar } from 'react-native-paper';
import theme from '../../theme/theme';

const TrainingScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState('Hoje');
  
  // Dados simulados para treinos da semana
  const weeklyTrainings = {
    'Hoje': [
      {
        id: 1,
        title: 'Alongamento Matinal',
        duration: '15 minutos',
        level: 'Iniciante',
        status: 'pendente',
      },
      {
        id: 2,
        title: 'Fortalecimento de Pernas',
        duration: '20 minutos',
        level: 'Moderado',
        status: 'pendente',
      }
    ],
    'Quarta': [
      {
        id: 3,
        title: 'Exercícios para Coluna',
        duration: '15 minutos',
        level: 'Iniciante',
        status: 'pendente',
      }
    ],
    'Quinta': [
      {
        id: 4,
        title: 'Caminhada Leve',
        duration: '30 minutos',
        level: 'Iniciante',
        status: 'pendente',
      }
    ],
    'Sexta': [
      {
        id: 5,
        title: 'Yoga para Iniciantes',
        duration: '25 minutos',
        level: 'Iniciante',
        status: 'pendente',
      }
    ],
    'Sábado': [
      {
        id: 6,
        title: 'Exercícios de Equilíbrio',
        duration: '15 minutos',
        level: 'Iniciante',
        status: 'pendente',
      }
    ],
  };

  const days = Object.keys(weeklyTrainings);

  return (
    <View style={styles.container}>
      {/* Seletor de dias da semana */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContainer}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text 
              style={[
                styles.dayText,
                selectedDay === day && styles.selectedDayText
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <Divider style={styles.divider} />
      
      <ScrollView style={styles.trainingList}>
        <Text style={styles.sectionTitle}>Seus treinos para {selectedDay.toLowerCase()}</Text>
        
        {weeklyTrainings[selectedDay].map((training) => (
          <Card key={training.id} style={styles.trainingCard}>
            <Card.Content>
              <View style={styles.trainingHeader}>
                <View>
                  <Text style={styles.trainingTitle}>{training.title}</Text>
                  <View style={styles.trainingInfo}>
                    <Text style={styles.trainingDetail}>⏱️ {training.duration}</Text>
                    <Text style={styles.trainingDetail}>🔄 {training.level}</Text>
                  </View>
                </View>
                <Avatar.Icon 
                  size={50} 
                  icon={training.status === 'concluído' ? "check-circle" : "clock-outline"} 
                  style={[
                    styles.statusIcon,
                    training.status === 'concluído' ? styles.completedIcon : styles.pendingIcon
                  ]}
                />
              </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button 
                mode="contained" 
                onPress={() => {}}
                style={styles.button}
                labelStyle={styles.buttonText}
              >
                Ver vídeo
              </Button>
              
              {training.status !== 'concluído' && (
                <Button 
                  mode="outlined" 
                  onPress={() => {}}
                  style={styles.outlinedButton}
                  labelStyle={styles.outlinedButtonText}
                >
                  Marcar como concluído
                </Button>
              )}
            </Card.Actions>
          </Card>
        ))}
        
        <Card style={styles.suggestionsCard}>
          <Card.Title 
            title="Sugestões para você" 
            titleStyle={styles.suggestionsTitle}
          />
          <Card.Content>
            <List.Item
              title="Exercícios para melhorar a postura"
              description="15 minutos • Iniciante"
              left={props => <List.Icon {...props} icon="play-circle" color={theme.colors.primary} />}
              titleStyle={styles.suggestionTitle}
              descriptionStyle={styles.suggestionDescription}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Alongamentos para aliviar dores nas costas"
              description="10 minutos • Iniciante"
              left={props => <List.Icon {...props} icon="play-circle" color={theme.colors.primary} />}
              titleStyle={styles.suggestionTitle}
              descriptionStyle={styles.suggestionDescription}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Exercícios de respiração para relaxamento"
              description="8 minutos • Iniciante"
              left={props => <List.Icon {...props} icon="play-circle" color={theme.colors.primary} />}
              titleStyle={styles.suggestionTitle}
              descriptionStyle={styles.suggestionDescription}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  daysContainer: {
    paddingVertical: theme.accessibility.spacing.medium,
    paddingHorizontal: theme.accessibility.spacing.large,
  },
  dayButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  selectedDayButton: {
    backgroundColor: theme.colors.primary,
  },
  dayText: {
    fontSize: 18,
    color: theme.colors.text,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  trainingList: {
    flex: 1,
    padding: theme.accessibility.spacing.large,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  trainingCard: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trainingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  trainingInfo: {
    flexDirection: 'row',
  },
  trainingDetail: {
    fontSize: 16,
    marginRight: 15,
  },
  statusIcon: {
    backgroundColor: 'transparent',
  },
  completedIcon: {
    color: theme.colors.primary,
  },
  pendingIcon: {
    color: '#FFA000',
  },
  cardActions: {
    flexDirection: 'column',
    padding: theme.accessibility.spacing.medium,
  },
  button: {
    height: theme.accessibility.buttonHeight,
    justifyContent: 'center',
    borderRadius: theme.accessibility.buttonRadius,
    marginBottom: 10,
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
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: '100%',
  },
  outlinedButtonText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  suggestionsCard: {
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 12,
    elevation: 2,
  },
  suggestionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionDescription: {
    fontSize: 14,
  },
});

export default TrainingScreen;
