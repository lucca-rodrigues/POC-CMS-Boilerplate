module.exports = {
  types: [
    { value: "feat", name: "feat:     ✨  Adicionar uma nova funcionalidade" },
    { value: "fix", name: "fix:      🐞  Corrigir um bug" },
    { value: "chore", name: "chore:    🧹  Tarefas de manutenção" },
    { value: "docs", name: "docs:     📝  Atualizar a documentação" },
    { value: "style", name: "style:    💄  Ajustes de estilo" },
    { value: "refactor", name: "refactor: 🛠️  Refatorar o código" },
    { value: "test", name: "test:     🧪  Adicionar testes" },
    { value: "perf", name: "perf:     🚀  Melhorar o desempenho" },
  ],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
};
