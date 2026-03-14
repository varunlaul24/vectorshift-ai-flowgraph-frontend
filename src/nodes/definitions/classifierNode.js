import { createNodeComponent } from '../factory/createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

const fields = [
  {
    key: 'labelSet',
    label: 'Labels',
    type: FIELD_TYPES.SELECT,
    defaultValue: 'Sentiment',
    options: [
      { label: 'Sentiment', value: 'Sentiment' },
      { label: 'Intent', value: 'Intent' },
      { label: 'Priority', value: 'Priority' },
    ],
  },
  {
    key: 'confidence',
    label: 'Min Confidence',
    type: FIELD_TYPES.SELECT,
    defaultValue: '0.80',
    options: [
      { label: '0.60', value: '0.60' },
      { label: '0.80', value: '0.80' },
      { label: '0.95', value: '0.95' },
    ],
  },
];

export const ClassifierNode = createNodeComponent({
  type: 'classifier',
  category: NODE_CATEGORIES.AI,
  icon: NODE_ICONS.CLASSIFIER,
  title: 'Classifier',
  description: 'Branch flow by label confidence.',
  accent: '#8b5cf6',
  fields,
  inputs: [{ key: 'text' }],
  outputs: [{ key: 'match' }, { key: 'fallback' }],
});

export const classifierNodeDefinition = ClassifierNode.definition;