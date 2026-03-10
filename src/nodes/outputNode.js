// outputNode.js

import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';

const fields = [
  {
    key: 'outputName',
    label: 'Name',
    type: 'text',
    defaultValue: ({ id }) => id.replace('customOutput-', 'output_'),
  },
  {
    key: 'outputType',
    label: 'Type',
    type: 'select',
    defaultValue: 'Text',
    options: [
      { label: 'Text', value: 'Text' },
      { label: 'Image', value: 'Image' },
    ],
  },
];

export const OutputNode = createNodeComponent({
  title: 'Output',
  subtitle: 'Collect the final pipeline result.',
  accent: '#22c55e',
  fields,
  inputs: [{ key: 'value' }],
});

export const outputNodeDefinition = {
  type: 'customOutput',
  label: 'Output',
  description: 'Expose a result from the flow.',
  accent: '#22c55e',
  component: OutputNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'customOutput',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};
