// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => (
  {
    nodes: [],
    edges: [],

    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },

    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },

    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
      
      // Cleanup edges on nodee removal
      const removedNodeIds = changes
        .filter(change => change.type === 'remove')
        .map(change => change.id);
      
      if (removedNodeIds.length > 0) {
        set({
          edges: get().edges.filter(edge => 
            !removedNodeIds.includes(edge.source) && 
            !removedNodeIds.includes(edge.target)
          )
        });
      }
    },

    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },

    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },

    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
          return node;
        }),
      });
    },

    isNameUnique: (nodeId, name) => {
      if (!name) return true;
      const normalized = name.trim().toLowerCase();
      const isNameInUse = get().nodes.some((node) => {
        if (node.id === nodeId) return false;
        const nodeData = node.data || {};
        return Object.keys(nodeData).some(key =>
          key.toLowerCase().includes('name') &&
          String(nodeData[key] || '').trim().toLowerCase() === normalized
        );
      });
      return !isNameInUse;
    },
  }
));
