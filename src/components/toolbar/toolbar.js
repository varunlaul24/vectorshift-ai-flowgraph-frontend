// toolbar.js

import { DraggableNode } from './draggableNode';
import { toolbarNodes, getInitialNodeData } from '../../nodes/nodeRegistry';
import { useStore } from '../../hooks/useStore';
import './toolbar.css';

export const PipelineToolbar = () => {
    const isCollapsed = useStore(state => state.isSidebarCollapsed);
    const setCollapsed = useStore(state => state.setSidebarCollapsed);
    const addNode = useStore(state => state.addNode);
    const getNodeID = useStore(state => state.getNodeID);
    const nodes = useStore(state => state.nodes);
    
    const onNodeClick = (type) => {
        const nodeID = getNodeID(type);
        const offset = 20;
        const basePosition = { x: 100, y: 100 };
        const nodesAtBase = nodes.filter(n => 
            n.position.x >= basePosition.x && 
            n.position.x <= basePosition.x + (nodes.length * offset)
        ).length;
        const newNode = {
            id: nodeID,
            type,
            position: { 
                x: basePosition.x + (nodesAtBase * offset), 
                y: basePosition.y + (nodesAtBase * offset) 
            },
            data: getInitialNodeData(type, nodeID),
        };
        addNode(newNode);
    };

    const groupedNodes = toolbarNodes.reduce((acc, node) => {
        const category = node.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(node);
        return acc;
    }, {});

    return (
        <aside className={`blender-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="blender-sidebar__header">
                {!isCollapsed && <span className="blender-sidebar__title">Node Catalog</span>}
                <button 
                    className="sidebar-toggle" 
                    onClick={() => setCollapsed(!isCollapsed)}
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>
            {!isCollapsed && (
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
                                        onClick={() => onNodeClick(node.type)}
                                    />
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            )}
        </aside>
    );
};
