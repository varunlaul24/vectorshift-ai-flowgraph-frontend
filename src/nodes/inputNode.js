// inputNode.js

import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from './nodeSchema';
import { NODE_ICONS } from './icons';

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
  title: 'Input',
  subtitle: 'Expose external values to the pipeline.',
  accent: '#0ea5e9',
  fields,
  outputs: [{ key: 'value' }],
});

export const inputNodeDefinition = {
  type: 'customInput',
  label: 'Input',
  category: NODE_CATEGORIES.IO,
  icon: NODE_ICONS.INPUT,
  description: 'Introduce data into the flow.',
  accent: '#0ea5e9',
  component: InputNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'customInput',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};
