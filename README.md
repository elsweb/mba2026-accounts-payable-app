# Nova Tarefa – Implementação da Listagem de Contas

## Objetivo

Atualmente o sistema já está realizando o cadastro e persistindo corretamente as contas no LocalStorage.

O próximo passo é implementar a tela de **Listagem de Contas**, exibindo todos os registros salvos e disponibilizando ações para gerenciamento de cada conta.

---

# Funcionalidades

## Listar Contas

Criar uma tabela dinâmica que carregue automaticamente todas as contas cadastradas.

### Colunas

* Descrição
* Fornecedor
* Categoria
* Valor
* Data de Vencimento
* Data de Pagamento
* Status
* Ações

Caso não existam registros, exibir uma mensagem amigável:

```
Nenhuma conta cadastrada.
```

A listagem deve ser atualizada automaticamente sempre que uma conta for:

* cadastrada;
* editada;
* excluída;
* restaurada;
* marcada como paga;
* cancelada.

Sem recarregar a página.

---

# Ações

Cada linha da tabela deverá possuir botões de ação.

## Editar

Abre o formulário preenchido com os dados da conta.

Após salvar, atualizar imediatamente a tabela.

---

## Excluir

Solicitar confirmação antes da exclusão.

Após confirmar:

* remover do StorageService;
* atualizar a listagem;
* atualizar os indicadores do Dashboard.

---

## Duplicar

Criar uma nova conta copiando todos os dados da original.

Gerar um novo ID.

Atualizar:

* createdAt
* updatedAt

A nova conta deverá iniciar como:

```
Status = Pendente
```

---

## Marcar como Paga

Atualizar:

```
status = Pago
data_pagamento = data atual
updatedAt = data atual
```

Atualizar automaticamente:

* Dashboard
* Listagem

---

## Cancelar

Atualizar:

```
status = Cancelado
updatedAt
```

---

## Restaurar

Caso a conta esteja cancelada ou vencida, permitir restaurar para:

```
status = Pendente
```

---

# Status

Exibir badges coloridas.

### Pendente

Amarelo

### Pago

Verde

### Vencido

Vermelho

### Cancelado

Cinza

---

# Pesquisa

Adicionar um campo de pesquisa acima da tabela.

Pesquisar por:

* descrição
* fornecedor
* categoria
* observações

A pesquisa deverá ocorrer em tempo real.

---

# Ordenação

Permitir ordenar por:

* descrição
* fornecedor
* categoria
* valor
* vencimento
* status

Alternando entre crescente e decrescente.

---

# Atualização Automática

Sempre que houver qualquer alteração nos dados:

* atualizar a tabela;
* atualizar os cards do Dashboard;
* persistir imediatamente no StorageService.

Sem recarregar a página.

---

# Organização

Criar um componente responsável apenas pela tabela.

Exemplo:

```
/js/views/accountListView.js
```

Responsabilidades:

* renderizar tabela;
* renderizar badges;
* renderizar ações;
* atualizar linhas;
* tratar eventos dos botões.

Toda regra de negócio deverá permanecer no:

```
AccountService
```

A View apenas renderiza e dispara eventos.

---

# Fluxo esperado

```
Cadastro

↓

StorageService.save()

↓

AccountService

↓

Atualiza Dashboard

↓

Atualiza Listagem

↓

Tabela renderizada automaticamente
```

---

# Resultado esperado

Ao finalizar esta etapa o sistema deverá possuir:

* Listagem completa das contas.
* Atualização automática após qualquer alteração.
* CRUD completo funcionando.
* Botões de Editar.
* Excluir.
* Duplicar.
* Marcar como Pago.
* Cancelar.
* Restaurar.
* Pesquisa em tempo real.
* Ordenação.
* Badges de status.
* Código modular seguindo a arquitetura já existente.

Esse README pode ser enviado como uma nova subtarefa para a IA, mantendo o foco apenas na implementação da listagem e das ações sem alterar a arquitetura já construída.
