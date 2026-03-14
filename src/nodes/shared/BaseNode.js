import { Handle } from 'reactflow';
import './BaseNode.css';

export const BaseNode = ({ title, description, accent, handles = [], children, className = '', style = {} }) => {
  return (
    <div
      className={`node-card ${className}`.trim()}
      style={{
        '--node-accent': accent,
        ...style,
      }}
    >
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
          className="node-handle"
        />
      ))}
      <div className="node-card__header">
        <span className="node-card__title">{title}</span>
      </div>
      {description ? <div className="node-card__description">{description}</div> : null}
      <div className="node-card__body">{children}</div>
    </div>
  );
};