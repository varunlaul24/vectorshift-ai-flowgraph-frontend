// draggableNode.js

export const DraggableNode = ({ type, label, description, icon, accent, onClick }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="blender-node-item"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        onClick={onClick}
        draggable
        title={description}
        style={{ '--node-accent': accent }}
      >
          <div className="blender-node-item__icon">
            {icon}
          </div>
          <span className="blender-node-item__label">{label}</span>
      </div>
    );
  };
  