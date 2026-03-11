// llmNode.js

import { createNodeComponent } from './createNodeComponent';
import { NODE_CATEGORIES } from './nodeSchema';
import { NODE_ICONS } from './icons';

export const LLMNode = createNodeComponent({
  title: 'LLM',
  subtitle: 'Generate a response from system and prompt inputs.',
  accent: '#6366f1',
  inputs: [{ key: 'system' }, { key: 'prompt' }],
  outputs: [{ key: 'response' }],
});

export const llmNodeDefinition = {
  type: 'llm',
  label: 'LLM',
  category: NODE_CATEGORIES.AI,
  icon: NODE_ICONS.LLM,
  description: 'Run a large language model step.',
  accent: '#6366f1',
  component: LLMNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'llm',
  }),
};
