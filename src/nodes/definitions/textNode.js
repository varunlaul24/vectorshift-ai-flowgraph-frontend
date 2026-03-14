// textNode.js

import { createNodeComponent, getInitialDataFromFields } from '../factory/createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

const fields = [
  {
    key: 'textName',
    label: 'Name',
    type: FIELD_TYPES.TEXT,
    defaultValue: ({ id }) => id.replace('text-', 'text_'),
  },
  {
    key: 'text',
    label: 'Text',
    type: 'textarea',
    autoResize: true,
    placeholder: 'Type "{{" to utilize variables',
  },
];

export const TextNode = createNodeComponent({
  title: 'Text',
  subtitle: 'Freeform text node with auto-resize and variable suggestions.',
  accent: '#ec4899',
  fields,
  outputs: [{ key: 'output' }],
});

export const textNodeDefinition = {
  type: 'text',
  label: 'Text',
  category: NODE_CATEGORIES.UTILITIES,
  icon: NODE_ICONS.TEXT,
  description: 'Freeform text with custom rendering.',
  accent: '#ec4899',
  component: TextNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'text',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};
