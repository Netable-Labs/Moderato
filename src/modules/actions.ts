// Module Name (required for the Modulesystem)
export const name = "actions";

function executeAction(name: string, value: any) {}

// exports all implementations (required to be exported like this to work with the modulesystem)
export const implementation = {
  executeAction,
};
