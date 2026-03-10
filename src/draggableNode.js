// draggableNode.js

export const DraggableNode = ({ type, label, description, accent }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="toolbar-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ '--node-accent': accent }}
        draggable
      >
          <span className="toolbar-node__label">{label}</span>
          <span className="toolbar-node__description">{description}</span>
      </div>
    );
  };
  