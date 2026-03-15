import { useRef, useState } from 'react';
import { useStore } from '../hooks/useStore';
import { getNodeDefinition } from '../nodes/nodeRegistry';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  updateNodeField: state.updateNodeField,
  onConnect: state.onConnect,
});

export const useVariableSuggest = (id, fieldKey) => {
  const { nodes, edges, updateNodeField, onConnect } = useStore(selector);
  const textareaRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 10 });

  const connectedSourceIds = edges
    .filter(edge => edge.target === id)
    .map(edge => edge.source);

  const availableNodes = nodes.filter(n => {
    if (n.id === id) return false;
    if (connectedSourceIds.includes(n.id)) return false;
    const hasNameField = Object.keys(n.data || {}).some(key => key.toLowerCase().includes('name'));
    if (!hasNameField) return false;
    const definition = getNodeDefinition(n.type);
    const hasOutputs = definition?.outputs && definition.outputs.length > 0;
    return hasOutputs;
  });

  const handleTextChange = (event) => {
    const newVal = event.target.value;
    updateNodeField(id, fieldKey, newVal);

    // detect "{{"
    const cursor = event.target.selectionEnd;
    const lastTwo = newVal.slice(Math.max(0, cursor - 2), cursor);
    
    if (lastTwo === '{{' && availableNodes.length > 0) {
      const textarea = textareaRef.current;
      const textBeforeCursor = newVal.substring(0, cursor);
      const lines = textBeforeCursor.split('\n');
      const currentLineIndex = lines.length - 1;
      
      const style = window.getComputedStyle(textarea);
      const lineHeight = parseFloat(style.lineHeight) || 16;
      const paddingTop = parseFloat(style.paddingTop) || 0;
      
      const topOffset = (currentLineIndex + 1) * lineHeight + paddingTop + 20;


      setPopupPos({ 
        top: topOffset, 
        left: 10 
      }); 
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  const insertVariable = (node) => {
    const nameKey = Object.keys(node.data || {}).find(key => key.toLowerCase().includes('name'));
    const varName = node.data?.[nameKey] || node.id;
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const newText = currentText.substring(0, start) + varName + '}}' + currentText.substring(end);
    
    updateNodeField(id, fieldKey, newText);

    if (onConnect) {
      // duplicate connection handling
      const alreadyConnected = edges.some(e => 
        e.source === node.id && 
        e.target === id && 
        e.targetHandle === `${id}-${fieldKey}`
      );
      
      if (!alreadyConnected) {
        const connection = {
          source: node.id,
          sourceHandle: `${node.id}-value`,
          target: id,
          targetHandle: `${id}-${fieldKey}`,
        };
        onConnect(connection);
      }
    }

    setShowPopup(false);
    
    requestAnimationFrame(() => {
      textarea.focus();
    });
  };

  const VariablePopup = () => {
    if (!showPopup || availableNodes.length === 0) return null;

    return (
      <div 
        className="variable-popup nodrag nopan"
        style={{
          top: popupPos.top,
          left: popupPos.left,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="variable-popup__header">Nodes</div>
        {availableNodes.map(node => {
          const nameKey = Object.keys(node.data || {}).find(key => key.toLowerCase().includes('name'));
          const nodeName = node.data?.[nameKey] || node.id;
          return (
            <div 
              key={node.id} 
              className="variable-popup__item"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                insertVariable(node);
              }}
            >
              <span>{nodeName}</span>
              <span className="variable-popup__badge">{node.type}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return {
    textareaRef,
    handleTextChange,
    VariablePopup,
    showPopup
  };
};