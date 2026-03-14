// llmNode.js

import { createNodeComponent } from '../factory/createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

export const LLMNode = createNodeComponent({
  type: 'llm',
  category: NODE_CATEGORIES.AI,
  icon: NODE_ICONS.LLM,
  title: 'LLM',
  description: 'Generate a response from system and prompt inputs.',
  accent: '#6366f1',
  fields: [
    {
      key: 'model',
      label: 'Model',
      type: FIELD_TYPES.SELECT,
      options: [
        { value: 'gpt-5-mini', label: 'GPT-5 mini' },
        { value: 'gemini-3-flash', label: 'Gemini 3 Flash' },
        { value: 'claude-haiku-4.5', label: 'Claude Haiku 4.5' },
      ],
      defaultValue: 'gpt-5-mini',
    },
    {
      key: 'system',
      label: 'System Prompt',
      type: 'textarea',
      placeholder: 'System instructions...',
    },
    {
      key: 'prompt',
      label: 'Prompt',
      type: 'textarea',
      placeholder: 'User prompt...',
    },
  ],
  inputs: [{ key: 'input' }],
  outputs: [{ key: 'output' }],
});

export const llmNodeDefinition = LLMNode.definition;
