# Documentação do Projeto ReVitaliza Fitness

## Visão Geral

O ReVitaliza Fitness é um aplicativo de saúde e bem-estar voltado para o público 50+, com o objetivo de simplificar o cuidado com a saúde através de uma experiência digital acolhedora, intuitiva e funcional. O app foi inspirado na proposta de UX do Nubank, trazendo acessibilidade e humanização para um segmento muitas vezes negligenciado pelas healthtechs atuais.

## Propósito

Ajudar pessoas com 50 anos ou mais a retomarem o controle da própria saúde de forma simples, leve e confiante, promovendo autonomia, prevenção e qualidade de vida.

## Tecnologias Utilizadas

- **Frontend**: React Native com Expo
- **Backend**: Firebase (Authentication, Firestore, Storage, Cloud Functions)
- **Gerenciamento de Estado**: Redux com Redux Toolkit
- **Estilização**: React Native Paper
- **Testes**: Jest e React Testing Library

## Estrutura do Projeto

```
revitaliza_fitness/
├── docs/                      # Documentação do projeto
│   ├── requisitos.md          # Requisitos do aplicativo
│   ├── funcionalidades.md     # Funcionalidades detalhadas
│   ├── fluxo_usuario.md       # Fluxo do usuário (UX Flow)
│   └── arquitetura.md         # Arquitetura do projeto
│
├── mobile/                    # Aplicativo React Native
│   ├── android/               # Configurações específicas para Android
│   ├── ios/                   # Configurações específicas para iOS
│   ├── src/
│   │   ├── assets/            # Recursos estáticos (imagens, fontes, etc.)
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── screens/           # Telas do aplicativo
│   │   ├── services/          # Serviços (API, autenticação, etc.)
│   │   ├── store/             # Gerenciamento de estado (Redux)
│   │   ├── theme/             # Configuração de tema e estilos
│   │   └── App.js             # Componente principal do aplicativo
│   ├── __tests__/             # Testes do aplicativo
│   ├── package.json           # Dependências do projeto
│   └── jest.config.js         # Configuração de testes
│
└── backend/                   # Código do backend (Firebase)
    ├── functions/             # Cloud Functions
    └── firestore.rules        # Regras de segurança do Firestore
```

## Funcionalidades Implementadas

### Autenticação
- Registro de usuários
- Login de usuários
- Recuperação de senha
- Perfil de usuário

### Treinos
- Catálogo de treinos em vídeo
- Agendamento de treinos
- Histórico de treinos
- Sugestões personalizadas

### Monitoramento de Saúde
- Registro de indicadores (pressão, peso, glicemia)
- Histórico de saúde
- Lembretes personalizados
- Geração de relatórios

### Perfil e Metas
- Definição de metas pessoais
- Acompanhamento de progresso
- Conquistas e gamificação
- Configurações de acessibilidade

### Suporte
- Canal de comunicação com profissionais
- Perguntas frequentes
- Agendamento de atendimento por vídeo
- Histórico de atendimentos

## Acessibilidade

O aplicativo foi desenvolvido com foco especial em acessibilidade para o público 50+:

- Botões grandes e fáceis de tocar
- Alto contraste para melhor visualização
- Fontes maiores para facilitar a leitura
- Linguagem simples e direta
- Ícones intuitivos e autoexplicativos
- Feedback visual e sonoro para ações

## Banco de Dados

O banco de dados Firestore foi estruturado com as seguintes coleções:

- **users**: Informações dos usuários
- **trainings**: Catálogo de treinos disponíveis
- **scheduledTrainings**: Treinos agendados pelos usuários
- **healthRecords**: Registros de saúde dos usuários
- **reminders**: Lembretes personalizados
- **supportMessages**: Mensagens de suporte
- **faqs**: Perguntas frequentes
- **videoAppointments**: Agendamentos de atendimento por vídeo
- **motivationalMessages**: Mensagens motivacionais

## Segurança

As regras de segurança do Firestore foram configuradas para garantir que:

- Usuários só podem acessar seus próprios dados
- Dados compartilhados com familiares só são acessíveis mediante consentimento
- Administradores têm acesso controlado para gerenciar conteúdo
- Profissionais de saúde só podem acessar dados de pacientes autorizados

## Testes

Foram implementados três tipos de testes:

- **Testes de Interface do Usuário**: Verificam a renderização correta dos componentes
- **Testes de Integração**: Verificam a integração entre os componentes e serviços
- **Testes Funcionais**: Verificam o fluxo completo de uso do aplicativo

## Próximos Passos

1. Publicação nas lojas (Google Play e App Store)
2. Implementação de análise de dados para melhorar a experiência do usuário
3. Integração com dispositivos wearables para coleta automática de dados
4. Expansão do catálogo de treinos e conteúdos
5. Implementação de recursos de comunidade e interação social
