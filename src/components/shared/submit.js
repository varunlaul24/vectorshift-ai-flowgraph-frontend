import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Modal } from './modal';
import './shared.css';

export const SubmitButton = () => {
    const [modalData, setModalData] = useState({ isOpen: false, title: '', content: '' });
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }));
    const closeModal = () => setModalData(prev => ({ ...prev, isOpen: false }));
    const handleSubmit = async () => {
        const minimalistNodes = nodes.map(node => ({ id: node.id }));
        const minimalistEdges = edges.map(edge => ({ 
            source: edge.source, 
            target: edge.target 
        }));
        try {
            const formData = new FormData();
            formData.append('nodes', JSON.stringify(minimalistNodes));
            formData.append('edges', JSON.stringify(minimalistEdges));
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }
            const data = await response.json();
            const message = `Pipeline Summary
-------------------
• Total Nodes: ${data.num_nodes}
• Total Edges: ${data.num_edges}
• Structure: ${data.is_dag ? 'Valid DAG' : 'Contains Cycles'}

${data.is_dag 
    ? 'Your pipeline is valid and ready for execution!' 
    : 'Please check your connections to ensure there are no infinite loops.'}`;
            setModalData({
                isOpen: true,
                title: 'Submission Success',
                content: message
            });
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setModalData({
                isOpen: true,
                title: 'Submission Error',
                content: 'Connection Error: Could not reach the backend server.'
            });
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button className="submit-button" onClick={handleSubmit}>
                Submit Pipeline
            </button>
            <Modal 
                isOpen={modalData.isOpen} 
                title={modalData.title} 
                onClose={closeModal}
            >
                {modalData.content}
            </Modal>
        </div>
    );
};

