module.exports = {
    apps: [
      {
        name: "WiseCrypto",
        script: "index.js", // Arquivo de entrada da aplicação
        instances: "max", // Usar todos os núcleos da CPU
        autorestart: true, // Reiniciar automaticamente em caso de falha
        watch: false, // Não observar mudanças nos arquivos (em produção)
        env: {
          NODE_ENV: "production",
          PORT: 3000, // Porta da aplicação
        },
      },
    ],
  };