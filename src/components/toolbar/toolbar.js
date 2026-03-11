// toolbar.js

import { DraggableNode } from './draggableNode';
import { toolbarNodes } from '../../nodes/nodeRegistry';

export const PipelineToolbar = () => {
    const groupedNodes = toolbarNodes.reduce((acc, node) => {
        const category = node.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(node);
        return acc;
    }, {});

    return (
        <div className="toolbar-shell">
            <div className="toolbar-shell__copy">
                <span className="toolbar-shell__eyebrow">Node Catalog</span>
                <h1 className="toolbar-shell__title">Build pipelines from reusable node definitions</h1>
                <p className="toolbar-shell__text">
                </p>
            </div>
            <div className="toolbar-container">
                {Object.entries(groupedNodes).map(([category, nodes]) => (
                    <div key={category} className="toolbar-category">
                        <h2 className="toolbar-category__title">{category}</h2>
                        <div className="toolbar-grid">
                            {nodes.map((node) => (
                                <DraggableNode
                                    key={node.type}
                                    type={node.type}
                                    label={node.label}
                                    icon={node.icon}
                                    description={node.description}
                                    accent={node.accent}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
