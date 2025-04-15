# Guia de Instalação e Configuração - ReVitaliza Fitness

Este guia fornece instruções detalhadas para configurar, executar e publicar o aplicativo ReVitaliza Fitness nas lojas de aplicativos.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Conta no Firebase
- Conta de desenvolvedor Apple (para publicação na App Store)
- Conta de desenvolvedor Google (para publicação na Google Play)

## Configuração do Ambiente de Desenvolvimento

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/revitaliza-fitness.git
cd revitaliza-fitness
```

### 2. Instale as dependências

```bash
cd mobile
npm install
```

### 3. Configure o Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Crie um novo projeto (ou use um existente)
3. Adicione um aplicativo para Android e iOS
4. Baixe os arquivos de configuração:
   - `google-services.json` (Android)
   - `GoogleService-Info.plist` (iOS)
5. Coloque os arquivos nas pastas correspondentes:
   - `android/app/google-services.json`
   - `ios/ReVitalizaFitness/GoogleService-Info.plist`
6. Substitua as credenciais no arquivo `src/services/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID"
};
```

### 4. Configure o Banco de Dados Firestore

1. No Console do Firebase, vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha o modo de inicialização (recomendado: modo de teste)
4. Selecione a região mais próxima dos seus usuários
5. Importe as regras de segurança do arquivo `src/services/firestore.rules`
6. Execute o script de inicialização para criar as coleções e documentos iniciais:

```bash
cd mobile
npx ts-node src/services/database-init.ts
```

## Executando o Aplicativo Localmente

### Usando Expo

```bash
cd mobile
npx expo start
```

Isso abrirá o Metro Bundler no navegador. Você pode executar o aplicativo em:

- Dispositivo físico: escaneando o QR code com o aplicativo Expo Go
- Emulador Android: pressionando `a` no terminal
- Simulador iOS: pressionando `i` no terminal (apenas macOS)

### Usando React Native CLI

```bash
cd mobile
npx react-native run-android  # Para Android
npx react-native run-ios      # Para iOS (apenas macOS)
```

## Executando os Testes

```bash
cd mobile
npm test
```

Para ver a cobertura de testes:

```bash
npm test -- --coverage
```

## Preparando para Publicação

### 1. Configurar app.json

Edite o arquivo `mobile/app.json` para incluir informações sobre o aplicativo:

```json
{
  "expo": {
    "name": "ReVitaliza Fitness",
    "slug": "revitaliza-fitness",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#4CAF50"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.seudominio.revitalizafitness"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#4CAF50"
      },
      "package": "com.seudominio.revitalizafitness"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### 2. Gerar ícones e splash screens

Substitua os arquivos de ícone e splash em `mobile/assets/` com suas próprias imagens.

### 3. Construir o aplicativo

#### Para Android (APK)

```bash
cd mobile
expo build:android -t apk
```

#### Para Android (App Bundle)

```bash
cd mobile
expo build:android -t app-bundle
```

#### Para iOS

```bash
cd mobile
expo build:ios
```

## Publicação nas Lojas

### Google Play Store

1. Acesse o [Google Play Console](https://play.google.com/console)
2. Crie um novo aplicativo
3. Preencha todas as informações necessárias:
   - Descrição do aplicativo
   - Capturas de tela
   - Ícones
   - Classificação de conteúdo
   - Política de privacidade
4. Faça upload do arquivo AAB gerado
5. Crie uma versão de teste interna/fechada/aberta
6. Envie para revisão

### Apple App Store

1. Acesse o [App Store Connect](https://appstoreconnect.apple.com/)
2. Crie um novo aplicativo
3. Preencha todas as informações necessárias:
   - Descrição do aplicativo
   - Capturas de tela
   - Ícones
   - Classificação de conteúdo
   - Política de privacidade
4. Faça upload do arquivo IPA gerado usando o Transporter
5. Crie uma versão de teste (TestFlight)
6. Envie para revisão

## Solução de Problemas Comuns

### Erro de dependências

Se encontrar erros relacionados a dependências, tente:

```bash
npm install --legacy-peer-deps
```

### Problemas com o Firebase

Verifique se as credenciais do Firebase estão corretas e se todos os serviços necessários estão habilitados:
- Authentication
- Firestore Database
- Storage
- Cloud Functions (opcional)

### Problemas com o Expo

Limpe o cache do Expo:

```bash
expo r -c
```

## Suporte

Para obter suporte adicional, entre em contato com a equipe de desenvolvimento em suporte@revitalizafitness.com.br
