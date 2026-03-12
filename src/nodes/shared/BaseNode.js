import { Handle } from 'reactflow';
import './BaseNode.css';

export const BaseNode = ({ title, subtitle, accent, handles = [], children, className = '' }) => {
  return (
    <div
      className={`node-card ${className}`.trim()}
      style={{
        '--node-accent': accent,
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
        {subtitle ? <span className="node-card__subtitle">{subtitle}</span> : null}
      </div>
      <div className="node-card__body">{children}</div>
    </div>
  );
};