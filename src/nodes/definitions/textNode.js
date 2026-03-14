// textNode.js

import { useRef, useEffect } from 'react';
import { BaseNode } from '../shared/BaseNode';
import { buildNodeHandles } from '../factory/createNodeComponent';
import { useStore } from '../../hooks/useStore';
import { NODE_CATEGORIES } from '../nodeSchema';
import { NODE_ICONS } from '../shared/icons';

const selector = (state) => ({
  updateNodeField: state.updateNodeField,
});

export const TextNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);
  const text = data?.text ?? '{{input}}';
  const textareaRef = useRef(null);

  const adjustSize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // pushing the execution to the end of the event loop's task queue.
  useEffect(() => {
    const timeoutId = setTimeout(adjustSize, 0);
    return () => clearTimeout(timeoutId);
  }, [text]);

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
          ref={textareaRef}
          className="node-field__control node-field__control--textarea"
          value={text}
          onChange={(event) => updateNodeField(id, 'text', event.target.value)}
          style={{ overflow: 'hidden', resize: 'none' }}
        />
      </label>
    </BaseNode>
  );
};

export const textNodeDefinition = {
  type: 'text',
  label: 'Text',
  category: NODE_CATEGORIES.UTILITIES,
  icon: NODE_ICONS.TEXT,
  description: 'Freeform text with custom rendering.',
  accent: '#ec4899',
  component: TextNode,
  getInitialData: (id) => ({
    id,
    nodeType: 'text',
    text: '{{input}}',
  }),
};
