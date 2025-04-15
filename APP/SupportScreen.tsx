import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, TextInput, List, Avatar, Divider, Chip } from 'react-native-paper';
import theme from '../../theme/theme';

const SupportScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');

  // Dados simulados para perguntas frequentes
  const faqs = [
    { 
      id: 1, 
      question: 'Como aferir corretamente a pressão arterial?',
      answer: 'Sente-se em uma cadeira com as costas apoiadas, deixe o braço na altura do coração, relaxe por 5 minutos antes de medir, não fale durante a medição e evite café ou exercícios 30 minutos antes.'
    },
    { 
      id: 2, 
      question: 'Posso fazer os exercícios mesmo com dores nas articulações?',
      answer: 'Consulte seu médico antes. Nossos exercícios são adaptados, mas é importante ter liberação médica, especialmente se você sente dores.'
    },
    { 
      id: 3, 
      question: 'Como exportar meus dados para mostrar ao médico?',
      answer: 'Na tela de Saúde, toque em "Gerar relatório PDF". O arquivo será salvo e você poderá compartilhá-lo por e-mail ou WhatsApp.'
    },
  ];

  // Dados simulados para histórico de suporte
  const supportHistory = [
    {
      id: 1,
      date: '12/04/2025',
      subject: 'Dúvida sobre exercícios',
      status: 'Respondido',
    },
    {
      id: 2,
      date: '05/04/2025',
      subject: 'Problema com notificações',
      status: 'Resolvido',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title 
          title="Fale conosco" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="message" style={styles.cardIcon} />}
        />
        <Card.Content>
          <Text style={styles.subtitle}>
            Envie sua mensagem e nossa equipe responderá em até 24 horas
          </Text>
          
          <TextInput
            label="Sua mensagem"
            value={message}
            onChangeText={setMessage}
            style={styles.messageInput}
            mode="outlined"
            multiline
            numberOfLines={5}
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.primary}
            contentStyle={styles.inputText}
          />
          
          <View style={styles.chipContainer}>
            <Text style={styles.chipLabel}>Assunto:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Chip 
                style={styles.chip} 
                textStyle={styles.chipText}
                selected
              >
                Dúvida
              </Chip>
              <Chip 
                style={styles.chip} 
                textStyle={styles.chipText}
              >
                Sugestão
              </Chip>
              <Chip 
                style={styles.chip} 
                textStyle={styles.chipText}
              >
                Problema técnico
              </Chip>
              <Chip 
                style={styles.chip} 
                textStyle={styles.chipText}
              >
                Elogio
              </Chip>
            </ScrollView>
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="contained" 
            onPress={() => {}}
            style={styles.button}
            labelStyle={styles.buttonText}
            icon="send"
          >
            Enviar mensagem
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title 
          title="Perguntas frequentes" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="help-circle" style={styles.cardIcon} />}
        />
        <Card.Content>
          {faqs.map((faq) => (
            <List.Accordion
              key={faq.id}
              title={faq.question}
              titleStyle={styles.faqQuestion}
              style={styles.faqItem}
            >
              <View style={styles.faqAnswerContainer}>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              </View>
            </List.Accordion>
          ))}
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="outlined" 
            onPress={() => {}}
            style={styles.outlinedButton}
            labelStyle={styles.outlinedButtonText}
          >
            Ver todas as perguntas
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title 
          title="Atendimento por vídeo" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="video" style={styles.cardIcon} />}
        />
        <Card.Content>
          <Text style={styles.videoText}>
            Agende uma conversa por vídeo com um de nossos profissionais para tirar dúvidas sobre exercícios, saúde ou uso do aplicativo.
          </Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="contained" 
            onPress={() => {}}
            style={styles.button}
            labelStyle={styles.buttonText}
            icon="calendar"
          >
            Agendar atendimento
          </Button>
        </Card.Actions>
      </Card>

      <Card style={[styles.card, styles.lastCard]}>
        <Card.Title 
          title="Histórico de atendimentos" 
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="history" style={styles.cardIcon} />}
        />
        <Card.Content>
          {supportHistory.length > 0 ? (
            supportHistory.map((item) => (
              <React.Fragment key={item.id}>
                <List.Item
                  title={item.subject}
                  description={`Data: ${item.date} • Status: ${item.status}`}
                  left={props => <List.Icon {...props} icon="message-text" color={theme.colors.primary} />}
                  right={props => (
                    <Button 
                      {...props} 
                      mode="text"
                      labelStyle={styles.viewButtonText}
                    >
                      Ver
                    </Button>
                  )}
                  titleStyle={styles.historyTitle}
                  descriptionStyle={styles.historyDescription}
                />
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Text style={styles.emptyHistoryText}>
              Você ainda não tem histórico de atendimentos.
            </Text>
          )}
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
  messageInput: {
    backgroundColor: theme.colors.background,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 18,
  },
  chipContainer: {
    marginBottom: 10,
  },
  chipLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  chip: {
    marginRight: 10,
    height: 40,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 16,
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
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  faqItem: {
    backgroundColor: theme.colors.surface,
    marginBottom: 8,
    borderRadius: 8,
  },
  faqAnswerContainer: {
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  faqAnswer: {
    fontSize: 16,
    lineHeight: 24,
  },
  videoText: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyDescription: {
    fontSize: 16,
  },
  viewButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  emptyHistoryText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default SupportScreen;
