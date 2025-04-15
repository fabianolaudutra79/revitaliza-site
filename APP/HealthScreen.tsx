import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, TextInput, Divider, List, Avatar } from 'react-native-paper';
import theme from '../../theme/theme';

const HealthScreen = ({ navigation }) => {
  const [pressure, setPressure] = useState('');
  const [weight, setWeight] = useState('');
  const [glucose, setGlucose] = useState('');
  const [mood, setMood] = useState('');

  // Dados simulados para histórico de saúde
  const healthHistory = [
    { date: '14/04/2025', pressure: '130/85', weight: '72.5', glucose: '110', mood: 'Bom' },
    { date: '13/04/2025', pressure: '128/82', weight: '72.8', glucose: '105', mood: 'Ótimo' },
    { date: '12/04/2025', pressure: '135/88', weight: '73.0', glucose: '115', mood: 'Regular' },
  ];

  // Dados simulados para lembretes
  const reminders = [
    { id: 1, title: 'Tomar medicação para pressão', time: '08:00', active: true },
    { id: 2, title: 'Beber água', time: '10:00, 14:00, 18:00', active: true },
    { id: 3, title: 'Aferir glicemia', time: '07:30, 19:30', active: true },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title 
          title="Registrar indicadores" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="clipboard-pulse" style={styles.cardIcon} />}
        />
        <Card.Content>
          <Text style={styles.subtitle}>
            Registre seus indicadores de saúde diariamente para acompanhar seu progresso
          </Text>
          
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Pressão Arterial</Text>
              <TextInput
                value={pressure}
                onChangeText={setPressure}
                placeholder="Ex: 120/80"
                style={styles.input}
                mode="outlined"
                keyboardType="numbers-and-punctuation"
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                contentStyle={styles.inputText}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Peso (kg)</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                placeholder="Ex: 70.5"
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                contentStyle={styles.inputText}
              />
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Glicemia</Text>
              <TextInput
                value={glucose}
                onChangeText={setGlucose}
                placeholder="Ex: 100"
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                contentStyle={styles.inputText}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Como está se sentindo?</Text>
              <TextInput
                value={mood}
                onChangeText={setMood}
                placeholder="Ex: Bem, cansado..."
                style={styles.input}
                mode="outlined"
                outlineColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                contentStyle={styles.inputText}
              />
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="contained" 
            onPress={() => {}}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Salvar registro
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title 
          title="Histórico recente" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="history" style={styles.cardIcon} />}
        />
        <Card.Content>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>Data</Text>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>Pressão</Text>
                <Text style={[styles.tableHeaderCell, { width: 80 }]}>Peso</Text>
                <Text style={[styles.tableHeaderCell, { width: 80 }]}>Glicemia</Text>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>Humor</Text>
              </View>
              
              {healthHistory.map((record, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: 100 }]}>{record.date}</Text>
                  <Text style={[styles.tableCell, { width: 100 }]}>{record.pressure}</Text>
                  <Text style={[styles.tableCell, { width: 80 }]}>{record.weight}</Text>
                  <Text style={[styles.tableCell, { width: 80 }]}>{record.glucose}</Text>
                  <Text style={[styles.tableCell, { width: 100 }]}>{record.mood}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="outlined" 
            onPress={() => {}}
            style={styles.outlinedButton}
            labelStyle={styles.outlinedButtonText}
          >
            Ver histórico completo
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title 
          title="Lembretes personalizados" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="bell" style={styles.cardIcon} />}
        />
        <Card.Content>
          {reminders.map((reminder) => (
            <React.Fragment key={reminder.id}>
              <List.Item
                title={reminder.title}
                description={`Horário: ${reminder.time}`}
                left={props => <List.Icon {...props} icon="bell-ring" color={theme.colors.primary} />}
                right={props => (
                  <Button 
                    {...props} 
                    mode={reminder.active ? "contained" : "outlined"}
                    style={reminder.active ? styles.activeButton : styles.inactiveButton}
                    labelStyle={reminder.active ? styles.activeButtonText : styles.inactiveButtonText}
                  >
                    {reminder.active ? "Ativo" : "Inativo"}
                  </Button>
                )}
                titleStyle={styles.reminderTitle}
                descriptionStyle={styles.reminderDescription}
              />
              <Divider />
            </React.Fragment>
          ))}
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="outlined" 
            onPress={() => {}}
            style={styles.outlinedButton}
            labelStyle={styles.outlinedButtonText}
            icon="plus"
          >
            Adicionar lembrete
          </Button>
        </Card.Actions>
      </Card>

      <Card style={[styles.card, styles.lastCard]}>
        <Card.Title 
          title="Gráficos de evolução" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="chart-line" style={styles.cardIcon} />}
        />
        <Card.Content>
          <Text style={styles.graphPlaceholder}>
            Aqui serão exibidos gráficos de evolução dos seus indicadores de saúde.
          </Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="outlined" 
            onPress={() => {}}
            style={styles.outlinedButton}
            labelStyle={styles.outlinedButtonText}
          >
            Gerar relatório PDF
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    marginHorizontal: theme.accessibility.spacing.large,
    marginTop: theme.accessibility.spacing.large,
    borderRadius: 12,
    elevation: 2,
  },
  lastCard: {
    marginBottom: theme.accessibility.spacing.large,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardIcon: {
    backgroundColor: theme.colors.primary,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputContainer: {
    width: '48%',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: theme.colors.background,
    height: theme.accessibility.inputHeight,
  },
  inputText: {
    fontSize: 18,
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
  tableContainer: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 10,
  },
  tableCell: {
    fontSize: 16,
    textAlign: 'center',
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reminderDescription: {
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.accessibility.buttonRadius,
  },
  inactiveButton: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: theme.accessibility.buttonRadius,
  },
  activeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  inactiveButtonText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
  graphPlaceholder: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 30,
  },
});

export default HealthScreen;
