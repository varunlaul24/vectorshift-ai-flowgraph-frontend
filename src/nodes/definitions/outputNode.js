// outputNode.js

import { createNodeComponent } from '../factory/createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

const fields = [
  {
    key: 'outputName',
    label: 'Name',
    type: FIELD_TYPES.TEXT,
    defaultValue: ({ id }) => id.replace('customOutput-', 'output_'),
  },
  {
    key: 'outputType',
    label: 'Type',
    type: FIELD_TYPES.SELECT,
    defaultValue: 'Text',
    options: [
      { label: 'Text', value: 'Text' },
      { label: 'Image', value: 'Image' },
    ],
  },
  {
    key: 'outputText',
    label: 'Output',
    type: FIELD_TYPES.TEXTAREA,
    autoResize: true,
    placeholder: 'Type "{{" to utilize variables.',
  },
];

export const OutputNode = createNodeComponent({
  type: 'customOutput',
  category: NODE_CATEGORIES.IO,
  icon: NODE_ICONS.OUTPUT,
  title: 'Output',
  subtitle: 'Collect the final pipeline result.',
  description: 'Expose a result from the flow.',
  accent: '#22c55e',
  fields,
  inputs: [{ key: 'value' }],
});

export const outputNodeDefinition = OutputNode.definition;
