// toolbar.js

import { DraggableNode } from './draggableNode';
import { toolbarNodes } from '../../nodes/nodeRegistry';
import './toolbar.css';

export const PipelineToolbar = () => {
    const groupedNodes = toolbarNodes.reduce((acc, node) => {
        const category = node.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(node);
        return acc;
    }, {});

    return (
        <aside className="blender-sidebar">
            <div className="blender-sidebar__header">
                <span className="blender-sidebar__title">Node Catalog</span>
            </div>
            <div className="blender-sidebar__content">
                {Object.entries(groupedNodes).map(([category, nodes]) => (
                    <details key={category} open className="blender-category">
                        <summary className="blender-category__summary">{category}</summary>
                        <div className="blender-node-list">
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
                    </details>
                ))}
            </div>
        </aside>
    );
};
