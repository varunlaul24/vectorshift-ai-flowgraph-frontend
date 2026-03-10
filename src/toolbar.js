// toolbar.js

import { DraggableNode } from './draggableNode';
import { toolbarNodes } from './nodes/nodeRegistry';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar-shell">
            <div className="toolbar-shell__copy">
                <span className="toolbar-shell__eyebrow">Node Catalog</span>
                <h1 className="toolbar-shell__title">Build pipelines from reusable node definitions</h1>
                <p className="toolbar-shell__text">
                    
                </p>
            </div>
            <div className="toolbar-grid">
                {toolbarNodes.map((node) => (
                    <DraggableNode
                        key={node.type}
                        type={node.type}
                        label={node.label}
                        description={node.description}
                        accent={node.accent}
                    />
                ))}
            </div>
        </div>
    );
};
