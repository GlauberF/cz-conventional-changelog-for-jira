var conventionalCommitTypes = require('./types');

module.exports = {
  types: conventionalCommitTypes,
  jiraMode: true,
  skipScope: true,
  skipType: true,
  skipDescription: false,
  skipBreaking: false,
  customScope: false,
  maxHeaderWidth: 72,
  minHeaderWidth: 2,
  maxLineWidth: 100,
  jiraPrefix: 'STOR',
  jiraOptional: false,
  jiraLocation: 'pre-description',
  jiraPrepend: '',
  jiraAppend: '',
  exclamationMark: false,

  txtJiraIssue: 'Insira o prefixo da tarefa do JIRA',
  txtType: 'Selecione o tipo de alteração',
  txtScope: 'What is the scope of this change (e.g. component or file name)',
  txtScopeListConfirmation: 'select from the list',
  txtScopeInputConfirmation: 'press enter to skip',
};
