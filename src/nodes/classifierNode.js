import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';

const fields = [
  {
    key: 'labelSet',
    label: 'Labels',
    type: 'select',
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
    type: 'select',
    defaultValue: '0.80',
    options: [
      { label: '0.60', value: '0.60' },
      { label: '0.80', value: '0.80' },
      { label: '0.95', value: '0.95' },
    ],
  },
];

export const ClassifierNode = createNodeComponent({
  title: 'Classifier',
  subtitle: 'Route text into labeled outcomes.',
  accent: '#8b5cf6',
  fields,
  inputs: [{ key: 'text' }],
  outputs: [{ key: 'match' }, { key: 'fallback' }],
});

export const classifierNodeDefinition = {
  type: 'classifier',
  label: 'Classifier',
  description: 'Branch flow by label confidence.',
  accent: '#8b5cf6',
  component: ClassifierNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'classifier',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};