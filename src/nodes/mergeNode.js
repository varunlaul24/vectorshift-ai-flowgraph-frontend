import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from './nodeSchema';
import { NODE_ICONS } from './icons';

const fields = [
  {
    key: 'strategy',
    label: 'Strategy',
    type: FIELD_TYPES.SELECT,
    defaultValue: 'Append',
    options: [
      { label: 'Append', value: 'Append' },
      { label: 'Interleave', value: 'Interleave' },
      { label: 'Overwrite', value: 'Overwrite' },
    ],
  },
  {
    key: 'separator',
    label: 'Separator',
    type: FIELD_TYPES.TEXT,
    defaultValue: '\\n---\\n',
  },
];

export const MergeNode = createNodeComponent({
  title: 'Merge',
  subtitle: 'Combine two upstream results.',
  accent: '#f59e0b',
  fields,
  inputs: [{ key: 'primary' }, { key: 'secondary' }],
  outputs: [{ key: 'merged' }],
});

export const mergeNodeDefinition = {
  type: 'merge',
  label: 'Merge',
  category: NODE_CATEGORIES.UTILITIES,
  icon: NODE_ICONS.MERGE,
  description: 'Combine multiple branches.',
  accent: '#f59e0b',
  component: MergeNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'merge',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};