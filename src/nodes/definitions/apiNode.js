import { createNodeComponent } from '../factory/createNodeComponent';
import { FIELD_TYPES, NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

const fields = [
  {
    key: 'method',
    label: 'Method',
    type: FIELD_TYPES.SELECT,
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
    type: FIELD_TYPES.TEXT,
    defaultValue: 'https://api.example.com/run',
  },
];

export const ApiNode = createNodeComponent({
  type: 'apiRequest',
  category: NODE_CATEGORIES.INTEGRATION,
  icon: NODE_ICONS.API,
  title: 'API Request',
  subtitle: 'Call an external HTTP endpoint.',
  accent: '#f97316',
  fields,
  inputs: [{ key: 'payload' }, { key: 'auth' }],
  outputs: [{ key: 'response' }],
});

export const apiNodeDefinition = ApiNode.definition;