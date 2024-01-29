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

  txtJiraIssue: 'Enter the JIRA task prefix',
  txtType: 'Select the type of change that you\'re committing',
  txtScope: 'What is the scope of this change (e.g. component or file name)',
  txtScopeListConfirmation: 'select from the list',
  txtScopeInputConfirmation: 'press enter to skip',
  txtCustomScope: 'Type custom scope (press enter to skip)',
  txtSubject: 'Write a short, imperative tense description of the change',
  txtSubjectMinCharacters: 'The subject must have at least {MIN_VALUE} characters',
};
