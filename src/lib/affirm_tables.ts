import { CliUx } from '@oclif/core';
const componentTable: CliUx.Table.table.Columns<any> = {
  'componentType': { header: 'Type' },
  'fullName': { header: 'Name' },
  'fileName': { header: 'File' },
  'success': { header: 'Success' },
  'deleted': { header: 'Deleted' },
  'changed': { header: 'changed' },
  'problem': { header: 'Problem' },
  'problemType': { header: 'Problem Type' }
};
const codeCoverageTable: CliUx.Table.table.Columns<any> = {
  'name': { header: 'Class' },
  'numLocations': { header: 'Covered Lines' },
  'numLocationsNotCovered': { header: 'Not Covered Lines' },
  'listLocationsNotCovered': { header: 'Lines not Covered' }
};

const failuresTable: CliUx.Table.table.Columns<any> = {
  'name': { header: 'Class Name' },
  'methodName': { header: 'Method' },
  'type': { header: 'Type' },
  'time': { header: 'Run Time' },
  'message': { header: 'Error' },
  'stackTrace': { header: 'Stack Trace' }
};

const successesTable: CliUx.Table.table.Columns<any> = {
  'name': { header: 'Class Name' },
  'methodName': { header: 'Method' },
  'time': { header: 'Run Time' }
};
export { componentTable, codeCoverageTable, successesTable, failuresTable };
