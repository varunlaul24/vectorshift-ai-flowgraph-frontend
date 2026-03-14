import { useRef, useState } from 'react';
import { useStore } from '../hooks/useStore';

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

  const availableInputNodes = nodes.filter(n => 
    n.type === 'customInput' && !connectedSourceIds.includes(n.id)
  );

  const handleTextChange = (event) => {
    const newVal = event.target.value;
    updateNodeField(id, fieldKey, newVal);

    // Detect "{{"
    const cursor = event.target.selectionEnd;
    const lastTwo = newVal.slice(Math.max(0, cursor - 2), cursor);
    
    if (lastTwo === '{{' && availableInputNodes.length > 0) {
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
    const varName = node.data?.inputName || node.id;
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
      const connection = {
        source: node.id,
        sourceHandle: `${node.id}-value`,
        target: id,
        targetHandle: `${id}-${fieldKey}`,
      };
      onConnect(connection);
    }

    setShowPopup(false);
    
    requestAnimationFrame(() => {
      textarea.focus();
    });
  };

  const VariablePopup = () => {
    if (!showPopup || availableInputNodes.length === 0) return null;

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
        {availableInputNodes.map(node => (
          <div 
            key={node.id} 
            className="variable-popup__item"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertVariable(node);
            }}
          >
            <span>{node.data?.inputName || node.id}</span>
            <span className="variable-popup__badge">Input</span>
          </div>
        ))}
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