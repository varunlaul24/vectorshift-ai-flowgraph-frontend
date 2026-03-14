import { createNodeComponent } from '../factory/createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

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
  type: 'merge',
  category: NODE_CATEGORIES.UTILITIES,
  icon: NODE_ICONS.MERGE,
  title: 'Merge',
  subtitle: 'Combine two upstream results.',
  description: 'Combine multiple branches.',
  accent: '#f59e0b',
  fields,
  inputs: [{ key: 'primary' }, { key: 'secondary' }],
  outputs: [{ key: 'merged' }],
});

export const mergeNodeDefinition = MergeNode.definition;