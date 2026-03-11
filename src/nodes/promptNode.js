import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from './nodeSchema';
import { NODE_ICONS } from './icons';

const fields = [
  {
    key: 'templateName',
    label: 'Name',
    type: FIELD_TYPES.TEXT,
    defaultValue: ({ id }) => id.replace('promptTemplate-', 'prompt_'),
  },
  {
    key: 'format',
    label: 'Format',
    type: FIELD_TYPES.SELECT,
    defaultValue: 'Chat',
    options: [
      { label: 'Chat', value: 'Chat' },
      { label: 'Instruction', value: 'Instruction' },
      { label: 'Bullet', value: 'Bullet' },
    ],
  },
];

export const PromptNode = createNodeComponent({
  title: 'Prompt Template',
  subtitle: 'Shape prompts from reusable inputs.',
  accent: '#14b8a6',
  fields,
  inputs: [{ key: 'context' }, { key: 'tone' }],
  outputs: [{ key: 'prompt' }],
});

export const promptNodeDefinition = {
  type: 'promptTemplate',
  label: 'Prompt',
  category: NODE_CATEGORIES.AI,
  icon: NODE_ICONS.TEXT,
  description: 'Compose reusable prompt blocks.',
  accent: '#14b8a6',
  component: PromptNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'promptTemplate',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};