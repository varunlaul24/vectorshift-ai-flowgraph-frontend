/*
    Defines the technical shapes and metadata types for the node system. 
    This formalizes what properties are required or optional for node definitions.
*/

export const FIELD_TYPES = {
  TEXT: 'text',
  SELECT: 'select',
  TEXTAREA: 'textarea',
};

export const HANDLE_TYPES = {
  SOURCE: 'source',
  TARGET: 'target',
};

export const NODE_CATEGORIES = {
  IO: 'Input/Output',
  AI: 'AI Logic',
  INTEGRATION: 'Integration',
  UTILITIES: 'Utilities',
  GENERAL: 'General'
};

export const validateNodeDefinition = (definition) => {
  const required = ['type', 'label', 'component', 'getInitialData'];
  const missing = required.filter(key => !definition[key]);
  if (missing.length > 0) {
    console.warn(`Node definition "${definition.type || 'unknown'}" is missing required fields: ${missing.join(', ')}`);
    return false;
  }
  return true;
};
