import { inputNodeDefinition } from './inputNode';
import { llmNodeDefinition } from './llmNode';
import { outputNodeDefinition } from './outputNode';
import { textNodeDefinition } from './textNode';
import { promptNodeDefinition } from './promptNode';
import { apiNodeDefinition } from './apiNode';
import { classifierNodeDefinition } from './classifierNode';
import { mergeNodeDefinition } from './mergeNode';
import { reviewNodeDefinition } from './reviewNode';
import { validateNodeDefinition } from './nodeSchema';

const rawNodeRegistry = [
  inputNodeDefinition,
  llmNodeDefinition,
  outputNodeDefinition,
  textNodeDefinition,
  promptNodeDefinition,
  apiNodeDefinition,
  classifierNodeDefinition,
  mergeNodeDefinition,
  reviewNodeDefinition,
];

export const nodeRegistry = rawNodeRegistry.filter(validateNodeDefinition);

export const nodeTypes = Object.fromEntries(
  nodeRegistry.map((definition) => [definition.type, definition.component])
);

export const toolbarNodes = nodeRegistry.map((definition) => ({
  type: definition.type,
  label: definition.label,
  category: definition.category || 'General',
  icon: definition.icon || '📦',
  description: definition.description,
  accent: definition.accent,
}));

export const getNodeDefinition = (type) => {
  return nodeRegistry.find((definition) => definition.type === type);
};

export const getInitialNodeData = (type, id) => {
  const definition = getNodeDefinition(type);
  if (!definition) {
    return { id, nodeType: type };
  }
  return definition.getInitialData(id);
};