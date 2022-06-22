import { TableOptions } from '@salesforce/command';
const componentTable: TableOptions = {
  columns: [
    { key: 'componentType', label: 'Type' },
    { key: 'fullName', label: 'Name' },
    { key: 'fileName', label: 'File' },
    { key: 'success', label: 'Success' },
    { key: 'deleted', label: 'Deleted' },
    { key: 'changed', label: 'Changed' },
    { key: 'problem', label: 'Problem' },
    { key: 'problemType', label: 'Problem Type' }
  ]
};
const codeCoverageTable: TableOptions = {
  columns: [
    { key: 'name', label: 'Class' },
    { key: 'numLocations', label: 'Covered Lines' },
    { key: 'numLocationsNotCovered', label: 'Not Covered Lines' },
    { key: 'listLocationsNotCovered', label: 'Lines not Covered' }
  ]
};
const failuresTable: TableOptions = {
  columns: [
    { key: 'name', label: 'Class Name' },
    { key: 'methodName', label: 'Method' },
    { key: 'type', label: 'Type' },
    { key: 'time', label: 'Run Time' },
    { key: 'message', label: 'Error' },
    { key: 'stackTrace', label: 'Stack Trace' }
  ]
};
// const flowCoverageTable: TableOptions = {
//   columns: [
//     { key: 'componentType', label: 'Type' }
//   ]
// };
// const codeCoverageWarningsTable: TableOptions = {
//   columns: [
//     { key: 'componentType', label: 'Type' }
//   ]
// };
const successesTable: TableOptions = {
  columns: [
    { key: 'name', label: 'Class Name' },
    { key: 'methodName', label: 'Method' },
    { key: 'time', label: 'Run Time' }
  ]
};
export { componentTable, codeCoverageTable, successesTable, failuresTable };
