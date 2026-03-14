// textNode.js

import { createNodeComponent } from '../factory/createNodeComponent';
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
  type: 'text',
  category: NODE_CATEGORIES.UTILITIES,
  icon: NODE_ICONS.TEXT,
  title: 'Text',
  description: 'Freeform text node with auto-resize and variable suggestions.',
  accent: '#ec4899',
  fields,
  outputs: [{ key: 'output' }],
});

export const textNodeDefinition = TextNode.definition;
