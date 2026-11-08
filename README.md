# Espaço do Médico · Lastro.Labs (demo)

Demonstração navegável da plataforma **Lastro.Labs**: a tela inicial do médico, que permite localizar pacientes, enviar laudos e acompanhar o status de envio.

> **Todos os dados são fictícios.** Nada é enviado para servidores: a "API" é simulada no próprio navegador.

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:5173.

Para gerar a versão estática (pasta `dist/`, pronta para publicar em qualquer hospedagem estática):

```bash
npm run build
npm run preview
```

## O que dá para fazer na demo

- Buscar pacientes por nome (sem diferenciar acentos), CPF ou tipo de exame
- Filtrar as colunas **Laudo** e **Status** e ordenar as colunas **Tipo de exame**, **Laudo** e **Status**
- Paginar a lista, com 4, 10 ou 20 pacientes por página
- **Enviar** um laudo
- **Editar** e **excluir** pacientes
- **Restaurar dados iniciais**, clicando no ícone de engrenagem no rodapé da barra lateral

As alterações ficam salvas no `localStorage` do navegador, então continuam lá depois de recarregar a página até alguém restaurar os dados pela engrenagem.

## Dados mockados

| Arquivo | Para que serve |
|---|---|
| [`src/mocks/seed.js`](src/mocks/seed.js) | Dados iniciais: médico, tipos de exame e pacientes. **Edite aqui para mudar o conteúdo da demo.** |
| [`src/mocks/api.js`](src/mocks/api.js) | API simulada: funções assíncronas com latência artificial (250–600 ms) e persistência no `localStorage`. |

Depois de editar o `seed.js`, clique na engrenagem e restaure os dados (ou limpe o `localStorage`) para ver as mudanças, porque o navegador pode ter guardado o estado anterior.

Para ligar a um backend real, reimplemente as funções de `src/mocks/api.js` (`getDoctor`, `getExamTypes`, `listPatients`, `sendReport`, `updatePatient`, `deletePatient`) usando `fetch`, mantendo as mesmas assinaturas. Os componentes não precisam mudar.

## Stack

React 19 · Vite 8 · Tailwind CSS 4

## Estrutura

```
src/
├── mocks/            dados fictícios + API simulada
├── hooks/            usePatients (regras da lista), useAsync (carregamento)
├── components/
│   ├── layout/       AppLayout, Sidebar, Logo, PageHeader
│   ├── search/       SearchCard, FilterPanel, FormField
│   ├── patients/     PatientsTable, PatientRow, LaudoCell, RowActions,
│   │                 ColumnFilter, SortButton, TableHeaderCell,
│   │                 SkeletonRows, PatientFormModal
│   ├── pagination/   Pagination
│   ├── ui/           Button, IconButton, TextInput, Select, StatusBadge,
│   │                 Card, Modal, ConfirmDialog, Toast
│   └── icons/        Icons
├── utils/            máscara de CPF, normalização de texto
└── index.css         tokens de cor do styleguide (lastro-navy, lastro-cyan…)
```

Outros arquivos na raiz:

- `styleguidelabs.svg`: styleguide de onde vieram a logo e as cores
- `prototipo-html/`: primeira versão em HTML + Tailwind, sem React
