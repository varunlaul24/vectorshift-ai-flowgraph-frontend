import { createNodeComponent } from '../factory/createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

const fields = [
  {
    key: 'templateName',
    label: 'Name',
    type: FIELD_TYPES.TEXT,
    defaultValue: ({ id }) => id.replace('prompt-', 'prompt_'),
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
  type: 'prompt',
  category: NODE_CATEGORIES.AI,
  icon: NODE_ICONS.PROMPT,
  title: 'Prompt Template',
  label: 'Prompt',
  description: 'Compose reusable prompt blocks.',
  accent: '#14b8a6',
  fields,
  inputs: [{ key: 'input' }],
  outputs: [{ key: 'output' }],
});

export const promptNodeDefinition = PromptNode.definition;