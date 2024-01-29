'format cjs';

const engine = require('./engine');
const conventionalCommitTypes = require('./types');
const defaults = require('./defaults');
const configLoader = require('commitizen').configLoader;

const config = configLoader.load();

function getEnvOrConfig(env, configVar, defaultValue) {
  const isEnvSet = Boolean(env);
  const isConfigSet = typeof configVar === 'boolean';

  if (isEnvSet) return env === 'true';
  if (isConfigSet) return configVar;
  return defaultValue;
}

const options = {
  types: conventionalCommitTypes,
  scopes: config.scopes,
  jiraMode: getEnvOrConfig(
    process.env.CZ_JIRA_MODE,
    config.jiraMode,
    defaults.jiraMode
  ),
  skipScope: getEnvOrConfig(
    process.env.CZ_SKIP_SCOPE,
    config.skipScope,
    defaults.skipScope
  ),
  skipType: getEnvOrConfig(
    process.env.CZ_SKIP_TYPE,
    config.skipType,
    defaults.skipType
  ),
  skipDescription: getEnvOrConfig(
    process.env.CZ_SKIP_DESCRIPTION,
    config.skipDescription,
    defaults.skipDescription
  ),
  skipBreaking: getEnvOrConfig(
    process.env.CZ_SKIP_BREAKING,
    config.skipBreaking,
    defaults.skipBreaking
  ),
  customScope: getEnvOrConfig(
    process.env.CZ_CUSTOM_SCOPE,
    config.customScope,
    defaults.customScope
  ),
  defaultType: process.env.CZ_TYPE || config.defaultType,
  defaultScope: process.env.CZ_SCOPE || config.defaultScope,
  defaultSubject: process.env.CZ_SUBJECT || config.defaultSubject,
  defaultBody: process.env.CZ_BODY || config.defaultBody,
  defaultIssues: process.env.CZ_ISSUES || config.defaultIssues,
  maxHeaderWidth:
    (process.env.CZ_MAX_HEADER_WIDTH &&
      parseInt(process.env.CZ_MAX_HEADER_WIDTH)) ||
    config.maxHeaderWidth ||
    defaults.maxHeaderWidth,
  minHeaderWidth:
    (process.env.CZ_MIN_HEADER_WIDTH &&
      parseInt(process.env.CZ_MIN_HEADER_WIDTH)) ||
    config.minHeaderWidth ||
    defaults.minHeaderWidth,
  maxLineWidth:
    (process.env.CZ_MAX_LINE_WIDTH &&
      parseInt(process.env.CZ_MAX_LINE_WIDTH)) ||
    config.maxLineWidth ||
    defaults.maxLineWidth,
  jiraOptional: getEnvOrConfig(
    process.env.CZ_JIRA_OPTIONAL,
    config.jiraOptional,
    defaults.jiraOptional
  ),
  jiraPrefix:
    process.env.CZ_JIRA_PREFIX || config.jiraPrefix || defaults.jiraPrefix,
  jiraLocation:
    process.env.CZ_JIRA_LOCATION ||
    config.jiraLocation ||
    defaults.jiraLocation,
  jiraPrepend:
    process.env.CZ_JIRA_PREPEND || config.jiraPrepend || defaults.jiraPrepend,
  jiraAppend:
    process.env.CZ_JIRA_APPEND || config.jiraAppend || defaults.jiraAppend,
  exclamationMark: getEnvOrConfig(
    process.env.CZ_EXCLAMATION_MARK,
    config.exclamationMark,
    defaults.exclamationMark
  ),

  txtJiraIssue: 'Enter the JIRA task prefix',
  txtType: 'Select the type of change that you\'re committing',
  txtScope: 'What is the scope of this change (e.g. component or file name)',
  txtScopeListConfirmation: 'select from the list',
  txtScopeInputConfirmation: 'press enter to skip',
  txtCustomScope: 'Type custom scope (press enter to skip)',
  txtSubject: 'Write a short, imperative tense description of the change',
  txtSubjectMinCharacters: 'The subject must have at least {MIN_VALUE} characters',
  txtBody: 'Provide a longer description of the change: (press enter to skip)',
  txtConfirmBreaking: 'Are there any breaking changes?',
  txtDescribeBreaking: 'Describe the breaking changes',
  txtConfirmIssueAffected: 'Does this change affect any open issues?',
  txtIssuesBody: 'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
  txtIssuesRef: 'Add issue references (e.g. "fix #123", "re #123".)',
  txtDoCommit: 'Are you sure that you want to commit?'


};

(function(options) {
  try {
    var commitlintLoad = require('@commitlint/load');
    commitlintLoad().then(function(clConfig) {
      if (clConfig.rules) {
        var maxHeaderLengthRule = clConfig.rules['header-max-length'];
        if (
          typeof maxHeaderLengthRule === 'object' &&
          maxHeaderLengthRule.length >= 3 &&
          !process.env.CZ_MAX_HEADER_WIDTH &&
          !config.maxHeaderWidth
        ) {
          options.maxHeaderWidth = maxHeaderLengthRule[2];
        }
      }
    });
  } catch (err) {}
})(options);

module.exports = engine(options);
