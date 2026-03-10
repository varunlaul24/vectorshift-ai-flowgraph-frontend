import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';

const fields = [
  {
    key: 'strategy',
    label: 'Strategy',
    type: 'select',
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
    type: 'text',
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
  description: 'Combine multiple branches.',
  accent: '#f59e0b',
  component: MergeNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'merge',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};