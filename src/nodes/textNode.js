// textNode.js

import { BaseNode } from './BaseNode';
import { buildNodeHandles } from './createNodeComponent';
import { useStore } from '../store';

const selector = (state) => ({
  updateNodeField: state.updateNodeField,
});

export const TextNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);
  const text = data?.text ?? '{{input}}';

  return (
    <BaseNode
      title="Text"
      subtitle="Custom body example: freeform text node with a custom editor."
      accent="#ec4899"
      handles={buildNodeHandles({ id, outputs: [{ key: 'output' }] })}
    >
      <label className="node-field">
        <span className="node-field__label">Text</span>
        <textarea
          className="node-field__control node-field__control--textarea"
          value={text}
          rows={4}
          onChange={(event) => updateNodeField(id, 'text', event.target.value)}
        />
      </label>
    </BaseNode>
  );
};

export const textNodeDefinition = {
  type: 'text',
  label: 'Text',
  description: 'Freeform text with custom rendering.',
  accent: '#ec4899',
  component: TextNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'text',
    text: '{{input}}',
  }),
};
