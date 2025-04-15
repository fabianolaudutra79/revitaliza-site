# Estrutura de Diretórios do Projeto ReVitaliza Fitness

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
│   │   │   ├── common/        # Componentes comuns (botões, inputs, etc.)
│   │   │   ├── screens/       # Componentes específicos de telas
│   │   │   └── navigation/    # Componentes de navegação
│   │   ├── screens/           # Telas do aplicativo
│   │   │   ├── auth/          # Telas de autenticação (login, cadastro)
│   │   │   ├── onboarding/    # Telas de onboarding
│   │   │   ├── home/          # Tela inicial
│   │   │   ├── treinos/       # Telas relacionadas a treinos
│   │   │   ├── saude/         # Telas de monitoramento de saúde
│   │   │   ├── perfil/        # Telas de perfil do usuário
│   │   │   └── suporte/       # Telas de suporte e ajuda
│   │   ├── navigation/        # Configuração de navegação
│   │   ├── services/          # Serviços (API, autenticação, etc.)
│   │   │   ├── api/           # Serviços de API
│   │   │   ├── auth/          # Serviços de autenticação
│   │   │   ├── storage/       # Serviços de armazenamento local
│   │   │   └── notifications/ # Serviços de notificações
│   │   ├── store/             # Gerenciamento de estado (Redux)
│   │   │   ├── actions/       # Ações Redux
│   │   │   ├── reducers/      # Reducers Redux
│   │   │   └── selectors/     # Seletores Redux
│   │   ├── utils/             # Utilitários e helpers
│   │   ├── hooks/             # Custom hooks
│   │   ├── constants/         # Constantes do aplicativo
│   │   ├── theme/             # Configuração de tema e estilos
│   │   └── App.js             # Componente principal do aplicativo
│   ├── index.js               # Ponto de entrada do aplicativo
│   ├── package.json           # Dependências do projeto
│   └── metro.config.js        # Configuração do Metro Bundler
│
├── backend/                   # Código do backend (Firebase)
│   ├── functions/             # Cloud Functions
│   │   ├── src/
│   │   │   ├── auth/          # Funções relacionadas à autenticação
│   │   │   ├── users/         # Funções relacionadas a usuários
│   │   │   ├── treinos/       # Funções relacionadas a treinos
│   │   │   ├── saude/         # Funções relacionadas a saúde
│   │   │   ├── notificacoes/  # Funções relacionadas a notificações
│   │   │   ├── relatorios/    # Funções para geração de relatórios
│   │   │   └── utils/         # Utilitários e helpers
│   │   ├── index.js           # Ponto de entrada das Cloud Functions
│   │   └── package.json       # Dependências das Cloud Functions
│   └── firestore.rules        # Regras de segurança do Firestore
│
└── admin/                     # Painel administrativo (futuro)
    └── README.md              # Documentação do painel administrativo
```
