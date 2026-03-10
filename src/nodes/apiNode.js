import { createNodeComponent, getInitialDataFromFields } from './createNodeComponent';

const fields = [
  {
    key: 'method',
    label: 'Method',
    type: 'select',
    defaultValue: 'POST',
    options: [
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' },
    ],
  },
  {
    key: 'endpoint',
    label: 'Endpoint',
    type: 'text',
    defaultValue: 'https://api.example.com/run',
  },
];

export const ApiNode = createNodeComponent({
  title: 'API Request',
  subtitle: 'Call an external HTTP endpoint.',
  accent: '#f97316',
  fields,
  inputs: [{ key: 'payload' }, { key: 'auth' }],
  outputs: [{ key: 'response' }],
});

export const apiNodeDefinition = {
  type: 'apiRequest',
  label: 'API',
  description: 'Call external services.',
  accent: '#f97316',
  component: ApiNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'apiRequest',
    ...getInitialDataFromFields(fields, { id, data: {} }),
  }),
};