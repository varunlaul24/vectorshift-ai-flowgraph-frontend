// llmNode.js

import { createNodeComponent } from './createNodeComponent';

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
  description: 'Run a large language model step.',
  accent: '#6366f1',
  component: LLMNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'llm',
  }),
};
