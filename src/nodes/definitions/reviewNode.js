import { createNodeComponent } from '../factory/createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

const fields = [
  {
    key: 'focus',
    label: 'Focus',
    type: FIELD_TYPES.SELECT,
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
    type: FIELD_TYPES.SELECT,
    defaultValue: 'Balanced',
    options: [
      { label: 'Light', value: 'Light' },
      { label: 'Balanced', value: 'Balanced' },
      { label: 'Strict', value: 'Strict' },
    ],
  },
];

export const ReviewNode = createNodeComponent({
  type: 'review',
  category: NODE_CATEGORIES.UTILITIES,
  icon: NODE_ICONS.REVIEW,
  title: 'Review',
  subtitle: 'Evaluate content before it leaves the flow.',
  description: 'Score and revise generated output.',
  accent: '#ef4444',
  fields,
  inputs: [{ key: 'draft' }],
  outputs: [{ key: 'approved' }, { key: 'changes' }],
});

export const reviewNodeDefinition = ReviewNode.definition;