// inputNode.js

import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';

const fields = [
  {
    key: 'inputName',
    label: 'Name',
    type: 'text',
    defaultValue: ({ id }) => id.replace('customInput-', 'input_'),
  },
  {
    key: 'inputType',
    label: 'Type',
    type: 'select',
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
  description: 'Introduce data into the flow.',
  accent: '#0ea5e9',
  component: InputNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'customInput',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};
