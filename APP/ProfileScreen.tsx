import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Button, List, Avatar, Divider, Switch } from 'react-native-paper';
import theme from '../../theme/theme';

const ProfileScreen = ({ navigation }) => {
  // Dados simulados do usuário
  const user = {
    name: 'Maria Silva',
    age: 65,
    email: 'maria.silva@email.com',
    joinDate: '10/04/2025',
    goals: ['Melhorar condicionamento físico', 'Controlar pressão arterial'],
    achievements: [
      { id: 1, title: 'Primeira semana completa', date: '17/04/2025', icon: 'trophy' },
      { id: 2, title: '5 treinos concluídos', date: '15/04/2025', icon: 'dumbbell' },
      { id: 3, title: '7 dias de registros de saúde', date: '17/04/2025', icon: 'heart-pulse' },
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text 
          size={100} 
          label={user.name.split(' ').map(n => n[0]).join('')} 
          style={styles.avatar}
          labelStyle={styles.avatarLabel}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userInfo}>{user.age} anos</Text>
        <Text style={styles.userInfo}>{user.email}</Text>
        <Text style={styles.userInfo}>Membro desde: {user.joinDate}</Text>
      </View>

      <Card style={styles.card}>
        <Card.Title 
          title="Minhas metas" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="flag" style={styles.cardIcon} />}
        />
        <Card.Content>
          {user.goals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <Avatar.Icon size={36} icon="check-circle" style={styles.goalIcon} />
              <Text style={styles.goalText}>{goal}</Text>
            </View>
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
            Adicionar meta
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title 
          title="Conquistas" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="trophy" style={styles.cardIcon} />}
        />
        <Card.Content>
          {user.achievements.map((achievement) => (
            <React.Fragment key={achievement.id}>
              <List.Item
                title={achievement.title}
                description={`Conquistado em: ${achievement.date}`}
                left={props => <List.Icon {...props} icon={achievement.icon} color={theme.colors.primary} size={30} />}
                titleStyle={styles.achievementTitle}
                descriptionStyle={styles.achievementDescription}
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
          >
            Ver todas as conquistas
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title 
          title="Configurações" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="cog" style={styles.cardIcon} />}
        />
        <Card.Content>
          <List.Item
            title="Notificações"
            description="Receber lembretes e alertas"
            left={props => <List.Icon {...props} icon="bell" color={theme.colors.primary} />}
            right={props => <Switch value={true} color={theme.colors.primary} />}
            titleStyle={styles.settingTitle}
            descriptionStyle={styles.settingDescription}
          />
          <Divider />
          <List.Item
            title="Compartilhar com família"
            description="Permitir que familiares acompanhem seu progresso"
            left={props => <List.Icon {...props} icon="account-group" color={theme.colors.primary} />}
            right={props => <Switch value={false} color={theme.colors.primary} />}
            titleStyle={styles.settingTitle}
            descriptionStyle={styles.settingDescription}
          />
          <Divider />
          <List.Item
            title="Relatórios mensais"
            description="Receber relatórios de progresso por e-mail"
            left={props => <List.Icon {...props} icon="file-chart" color={theme.colors.primary} />}
            right={props => <Switch value={true} color={theme.colors.primary} />}
            titleStyle={styles.settingTitle}
            descriptionStyle={styles.settingDescription}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.lastCard]}>
        <Card.Content>
          <Button 
            mode="outlined" 
            onPress={() => {}}
            style={styles.dangerButton}
            labelStyle={styles.dangerButtonText}
            icon="logout"
          >
            Sair da conta
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    padding: theme.accessibility.spacing.large,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: 'white',
    marginBottom: 15,
  },
  avatarLabel: {
    fontSize: 40,
    color: theme.colors.primary,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: 'white',
    marginBottom: 3,
  },
  card: {
    marginHorizontal: theme.accessibility.spacing.large,
    marginBottom: theme.accessibility.spacing.large,
    borderRadius: 12,
    elevation: 2,
  },
  lastCard: {
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardIcon: {
    backgroundColor: theme.colors.primary,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  goalIcon: {
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  goalText: {
    fontSize: 18,
    flex: 1,
  },
  cardActions: {
    justifyContent: 'center',
    paddingHorizontal: theme.accessibility.spacing.large,
    paddingBottom: theme.accessibility.spacing.large,
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
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  achievementDescription: {
    fontSize: 16,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingDescription: {
    fontSize: 16,
  },
  dangerButton: {
    height: theme.accessibility.buttonHeight,
    justifyContent: 'center',
    borderRadius: theme.accessibility.buttonRadius,
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  dangerButtonText: {
    fontSize: 18,
    color: theme.colors.error,
  },
});

export default ProfileScreen;
