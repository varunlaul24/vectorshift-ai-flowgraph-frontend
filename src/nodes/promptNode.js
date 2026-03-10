import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';

const fields = [
  {
    key: 'templateName',
    label: 'Name',
    type: 'text',
    defaultValue: ({ id }) => id.replace('promptTemplate-', 'prompt_'),
  },
  {
    key: 'format',
    label: 'Format',
    type: 'select',
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
  description: 'Compose reusable prompt blocks.',
  accent: '#14b8a6',
  component: PromptNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'promptTemplate',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};