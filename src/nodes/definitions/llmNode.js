// llmNode.js

import { createNodeComponent } from '../factory/createNodeComponent';
import { NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

export const LLMNode = createNodeComponent({
  type: 'llm',
  category: NODE_CATEGORIES.AI,
  icon: NODE_ICONS.LLM,
  title: 'LLM',
  subtitle: 'Generate a response from system and prompt inputs.',
  description: 'Run a large language model step.',
  accent: '#6366f1',
  inputs: [{ key: 'system' }, { key: 'prompt' }],
  outputs: [{ key: 'response' }],
});

export const llmNodeDefinition = LLMNode.definition;
