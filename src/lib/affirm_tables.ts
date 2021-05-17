import { TableOptions } from '@salesforce/command';
const componentSuccesses: TableOptions = {
  columns: [
    { key: 'componentType', label: 'Type' },
    { key: 'fullName', label: 'Name' },
    { key: 'fileName', label: 'File' },
    { key: 'id', label: 'Id' }
  ]
};
const runTestResultSuccess: TableOptions = {
  columns: [
    { key: 'name', label: 'Class' },
    { key: 'methodName', label: 'Method' },
    { key: 'time', label: 'Run Time (ms)' }
  ]
};

const runTestResultFailure: TableOptions = {
  columns: [
    { key: 'name', label: 'Class' },
    { key: 'methodName', label: 'Method' },
    { key: 'time', label: 'Run Time (ms)' },
    { key: 'stackTrace', label: 'Stack Trace' },
    { key: 'message', label: 'Message' }
  ]
};
const componentFailures: TableOptions = {
  columns: [
    { key: 'componentType', label: 'Type' },
    { key: 'fullName', label: 'Name' },
    { key: 'fileName', label: 'File' },
    { key: 'problem', label: 'Problem' },
    { key: 'problemType', label: 'Problem Type' }
  ]
};
const codeCoverageWarnings: TableOptions = {
  columns: [
    { key: 'name', label: 'Class' },
    { key: 'message', label: 'Message' },
    { key: 'id', label: 'Id' }
  ]
};
export default { componentSuccesses, runTestResultSuccess, runTestResultFailure, componentFailures, codeCoverageWarnings };
