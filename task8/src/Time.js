import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';

const PerformanceModal = ({ isOpen, onRequestClose }) => {
    const [pageLoadTime, setPageLoadTime] = useState(0);
    const [resourceTimings, setResourceTimings] = useState([]);

    useEffect(() => {
        const measurePageLoadTime = () => {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            setPageLoadTime(loadTime);
        };

        const measureResourceTimings = () => {
            const resources = window.performance.getEntriesByType('resource');
            setResourceTimings(resources);
        };

        measurePageLoadTime();
        measureResourceTimings();
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="Modal"
            overlayClassName="ModalOverlay"
            contentLabel="Performance Analysis Modal"
        >
            <h2 className="ModalTitle">Analysis</h2>
            <p>Page Load Time: {pageLoadTime} ms</p>
            <h3>Resource Timings:</h3>
            <ul>
                {resourceTimings.map((resource, index) => (
                    <li key={index} className="ResourceItem">
                        {resource.name}: {resource.duration.toFixed(2)} ms
                    </li>
                ))}
            </ul>
            <button className="close-button" onClick={onRequestClose}>X</button>
        </Modal>
    );
};

export default PerformanceModal;
