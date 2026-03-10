import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';

const fields = [
  {
    key: 'focus',
    label: 'Focus',
    type: 'select',
    defaultValue: 'Clarity',
    options: [
      { label: 'Clarity', value: 'Clarity' },
      { label: 'Accuracy', value: 'Accuracy' },
      { label: 'Tone', value: 'Tone' },
    ],
  },
  {
    key: 'strictness',
    label: 'Strictness',
    type: 'select',
    defaultValue: 'Balanced',
    options: [
      { label: 'Light', value: 'Light' },
      { label: 'Balanced', value: 'Balanced' },
      { label: 'Strict', value: 'Strict' },
    ],
  },
];

export const ReviewNode = createNodeComponent({
  title: 'Review',
  subtitle: 'Evaluate content before it leaves the flow.',
  accent: '#ef4444',
  fields,
  inputs: [{ key: 'draft' }],
  outputs: [{ key: 'approved' }, { key: 'changes' }],
});

export const reviewNodeDefinition = {
  type: 'review',
  label: 'Review',
  description: 'Score and revise generated output.',
  accent: '#ef4444',
  component: ReviewNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'review',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};