
# API de Simulação de Empréstimo

Esta aplicação fornece uma API para simulação de empréstimos, calculando os pagamentos mensais, taxas de juros, e enviando os resultados por e-mail para os usuários.

## Tecnologias Utilizadas

- **NestJS** - Framework que utiliza TypeScript para criar Servidores.
- **Jest** - Framework de testes.
- **Nodemailer** - Biblioteca para envio de e-mails.
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática ao código.
  
## Funcionalidades

- Simulação de múltiplos empréstimos.
- Envio de simulações por e-mail.
- Cálculo de pagamentos mensais, total de juros e valor total a ser pago.

## Requisitos

Antes de instalar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)

## Configuração

1. Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
```

2. Navegue até a pasta do projeto:

```bash
cd seu-projeto
```

3. Instale as dependências:

```bash
npm install
```

## Variáveis de Ambiente

O projeto usa o Nodemailer para enviar e-mails. Crie um arquivo \`.env\` na raiz do projeto e adicione suas credenciais de e-mail (como o exemplo abaixo):

```
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha
```

## Como Rodar a Aplicação

1. Para rodar a aplicação em modo de desenvolvimento, use o comando:

```bash
npm run start:dev
```

A aplicação estará rodando em \`http://localhost:3000\`.

2. Para rodar a aplicação em modo de produção:

```bash
npm run build
npm run start
```

## Como Rodar os Testes

Os testes são escritos com **Jest**. Para rodar todos os testes unitários, use o comando:

```bash
npm run test
```

Você também pode rodar os testes em modo de observação contínua:

```bash
npm run test:watch
```

## Endpoints da API

Aqui está um resumo dos principais endpoints da API:

### Simular Empréstimo

- **URL**: `/loan/simulate`
- **Método**: `POST`
- **Body**:

```json
{
  "loanAmount": 10000,
  "birthDate": "1990-01-01",
  "months": 12,
  "email": "usuario@exemplo.com"
}
```

- **Resposta**:

```json
{
  "loanAmount": "R$ 10.000,00",
  "monthlyPayment": "R$ 856,07",
  "totalAmount": "R$ 10.272,87",
  "totalInterest": "R$ 272,87",
  "interestRate": "3.00% ao ano"
}
```

### Simular Múltiplos Empréstimos

- **URL**: `/loan/simulate-multiple`
- **Método**: `POST`
- **Body**:

```json
[
  {
    "loanAmount": 5000,
    "birthDate": "1995-02-15",
    "months": 24,
    "email": "usuario1@exemplo.com"
  },
  {
    "loanAmount": 15000,
    "birthDate": "1980-08-25",
    "months": 36,
    "email": "usuario2@exemplo.com"
  }
]
```

- **Resposta**: Um array com os resultados de cada simulação.

## Estrutura do Projeto

Aqui está um resumo da estrutura de pastas do projeto:

```
src/
├── loan/
│   ├── dto/
│   │   └── simulate.loan.dto.ts     # Definição do DTO para a simulação de empréstimo
│   ├── loan.service.ts              # Serviço principal de simulação de empréstimos
│   └── loan.controller.ts           # Controlador que lida com os endpoints de empréstimo
├── mail/
│   └── mail.service.ts              # Serviço responsável pelo envio de e-mails
└── main.ts                          # Arquivo principal da aplicação
```

## Como Contribuir

Contribuições são bem-vindas! Siga os passos abaixo para contribuir com o projeto:

1. Faça um fork do repositório.
2. Crie uma nova branch para suas alterações: `git checkout -b minha-feature`.
3. Faça suas alterações e faça commit: `git commit -m 'Minha nova feature'`.
4. Envie suas alterações: `git push origin minha-feature`.
5. Crie um Pull Request.

---
