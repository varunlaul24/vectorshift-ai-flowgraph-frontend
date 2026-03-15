import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Modal } from './modal';
import { NODE_ICONS } from '../../nodes/shared/icons';
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
            const message = (
                <div className="submit-modal-content">
                    <div className="submit-modal-line highlight">
                        {NODE_ICONS.SUBMIT} Pipeline Summary
                    </div>
                    <div className="submit-modal-line">
                        • Total Nodes: {data.num_nodes}
                    </div>
                    <div className="submit-modal-line">
                        • Total Edges: {data.num_edges}
                    </div>
                    <div className="submit-modal-line">
                        • Structure: {data.is_dag ? (
                            <><span className="icon-success">{NODE_ICONS.SUCCESS}</span> Valid DAG</>
                        ) : (
                            <><span className="icon-error">{NODE_ICONS.ERROR}</span> Contains Cycles</>
                        )}
                    </div>
                    <div className="submit-modal-footer-msg">
                        {data.is_dag ? (
                            <><span className="icon-success">{NODE_ICONS.SUCCESS}</span> Your pipeline is valid and ready for execution!</>
                        ) : (
                            <><span className="icon-warning">{NODE_ICONS.WARNING}</span> Please check your connections to ensure there are no infinite loops.</>
                        )}
                    </div>
                </div>
            );
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
                content: `${NODE_ICONS.ERROR} Connection Error: Could not reach the backend server.`
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

