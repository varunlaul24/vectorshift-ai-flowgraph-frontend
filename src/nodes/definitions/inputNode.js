// inputNode.js

import { createNodeComponent } from '../factory/createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

const fields = [
  {
    key: 'inputName',
    label: 'Name',
    type: FIELD_TYPES.TEXT,
    defaultValue: ({ id }) => id.replace('customInput-', 'input_'),
  },
  {
    key: 'inputType',
    label: 'Type',
    type: FIELD_TYPES.SELECT,
    defaultValue: 'Text',
    options: [
      { label: 'Text', value: 'Text' },
      { label: 'File', value: 'File' },
    ],
  },
];

export const InputNode = createNodeComponent({
  type: 'customInput',
  category: NODE_CATEGORIES.IO,
  icon: NODE_ICONS.INPUT,
  title: 'Input',
  subtitle: 'Expose external values to the pipeline.',
  description: 'Introduce data into the flow.',
  accent: '#0ea5e9',
  fields,
  outputs: [{ key: 'value' }],
});

export const inputNodeDefinition = InputNode.definition;
