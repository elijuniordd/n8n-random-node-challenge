# n8n Custom Node - True Random Number Generator

Este repositório contém um conector (custom node) para a plataforma de automação n8n que gera números inteiros verdadeiramente aleatórios utilizando a API pública do **Random.org**. O projeto também inclui a configuração completa via Docker Compose para executar uma instância local do n8n com um banco de dados PostgreSQL.

## Funcionalidades do Conector

* **Operação Única:** "True Random Number Generator".
* **Inputs Dinâmicos:** Permite ao usuário especificar um valor **Mínimo** e **Máximo** para o intervalo do número aleatório.
* **Integração Real:** Utiliza obrigatoriamente o endpoint `GET /integers/` da API do Random.org. Embora, os requisitos teriam que ter inputs, o link disponibilizado limita o range de números random.

## Tech Stack

* **Core:** Node.js 22 (LTS), TypeScript
* **Plataforma:** n8n
* **Infraestrutura:** Docker, Docker Compose, PostgreSQL
* **Build Tools:** Gulp (para processamento de assets)

## Pré-requisitos

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/en/) v22 (LTS) ou superior
* [npm](https://www.npmjs.com/)

## Como Instalar e Rodar

### 1. Clone o Repositório

```bash
git clone <https://github.com/elijuniordd/n8n-random-node-challenge.git>
cd n8n-custom-node-project
```

### 2. Instale as Dependências do Conector

O código-fonte do conector customizado está na pasta `custom-nodes/n8n-nodes-random`. Precisamos instalar suas dependências para poder compilá-lo.

```bash
cd custom-nodes/n8n-nodes-random
npm install
npm install del --save-dev
```

### 3. Compile o Conector

Após instalar as dependências, compile o código de TypeScript para JavaScript.

```bash
npm run build
```
Este comando criará uma pasta `dist` com os arquivos compilados que o n8n irá carregar.

### 4. Inicie o Ambiente n8n

Volte para a raiz do projeto e use o Docker Compose para iniciar o n8n e o banco de dados.

```bash
cd ../.. # volta para a raiz do projeto
docker compose up -d
```
A sua instância do n8n estará disponível em **http://localhost:5678**.
Caso o docker for reiniciado espere de 30 a 60 segundo e atualize o seu navegador.
```bash
docker compose restart n8n #ou
docker compose down # para para o docher 
```


## Como Usar o Conector no n8n

1.  Acesse sua instância do n8n.
2.  Crie um novo workflow.
3.  Clique no botão `+` para adicionar um novo nó.
4.  Pesquise por "Random.org" e adicione-o ao seu workflow.
5.  Configure os parâmetros `Min` e `Max`.
6.  Execute o nó e veja a mágica acontecer!

## 🧪 Executar os Testes

Para este desafio, não foi implementado um framework de testes automatizados. Os testes foram realizados de forma manual verificando requisitos funcionais.

**Passos para o teste manual:**
1.  Na interface do n8n, crie um novo workflow.
2.  Adicione o nó **Random.org**.
3.  Nos parâmetros do nó, defina um valor para `Minimum Value` (ex: 10) e `Maximum Value` (ex: 20).
4.  Execute o nó.
5.  Verifique a saída (output). O resultado deve ser um objeto JSON contendo a chave `randomNumber` com um número inteiro entre 10 e 20 (inclusivo).
6.  Teste o tratamento de erro: defina `Minimum Value` como um valor maior que `Maximum Value` (ex: 30 e 20) e execute. O nó deve retornar um erro claro indicando que o valor mínimo não pode ser maior que o máximo.

## 📂 Informações Adicionais: Estrutura do Projeto

* `docker-compose.yml`: Orquestra os contêineres do n8n e do banco de dados. 
* `.env`:  Arquivo local (ignorado pelo Git) contendo as senhas e configurações reais do ambiente.
* `custom-nodes/n8n-nodes-random/`: O projeto do conector customizado em si, com seu próprio `package.json` e código-fonte em TypeScript.
* `n8n_data/`: Pasta de dados persistentes utilizada pelo contêiner do n8n (criada após a primeira execução).

## Aprendizados e Agradecimentos

Este desafio foi uma excelente oportunidade de aprendizado prático, indo além da simples implementação da funcionalidade do nó.

Um dos pontos mais instrutivos foi, sem dúvida, a implementação do ícone SVG customizado. Investigar e resolver as nuances de paths, dependências e do processo de build com Gulp me proporcionou uma compreensão muito mais profunda da integração de ferramentas em um ecossistema TypeScript. A persistência para solucionar essa questão, que a princípio parecia trivial, reforçou a importância da depuração metódica e da atenção aos detalhes.

Foi uma experiência de aprendizado muito enriquecedora. Agradeço a oportunidade de participar deste processo seletivo.

Atenciosamente,

Eli Júnior D. Dias
