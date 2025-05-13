# Projeto: Gráfico do Mercado de Ações (Full Stack JavaScript)

## Descrição
Aplicativo full stack para visualizar tendências de ações, adicionar/remover ações por código de negociação e refletir alterações em tempo real para todos os usuários via WebSockets.

## Tecnologias
- **Backend:** Node.js, Express, WebSocket (ws)
- **Frontend:** React (Vite), Chart.js (ou Recharts), WebSocket
- **Integração:** API pública de ações (ex: Alpha Vantage, Twelve Data, etc.)

## Estrutura de Pastas
```
fre2/
├── backend/      # Servidor Express + WebSocket
├── frontend/     # Aplicação React
└── README.md     # Documentação
```

## Requisitos (User Stories)
- Visualizar gráfico com linhas de tendência das ações adicionadas
- Adicionar ações pelo código de negociação
- Remover ações
- Alterações em tempo real para todos os usuários (WebSocket)

## Princípios de Projeto
- Clean Code
- SOLID
- Modularidade e separação de responsabilidades

## Próximos Passos
1. Criar estrutura de diretórios `backend` e `frontend`
2. Inicializar backend (Node.js/Express/WebSocket)
3. Inicializar frontend (React/Vite)
4. Implementar integração com API de ações
5. Implementar comunicação em tempo real
6. Garantir testes e documentação# stocksfree
