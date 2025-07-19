/**
 * Copyright 2025 MARBEFES
 * Data Portal Plugin for QWC2
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TaskBar from 'qwc2/components/TaskBar';
import {setCurrentTask} from 'qwc2/actions/task';

class DataPortal extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        setCurrentTask: PropTypes.func,
        task: PropTypes.object
    };

    constructor(props) {
        super(props);
        console.log('DataPortalPlugin constructor called - plugin is loading!');
        this.state = {
            loading: false,
            selectedDataset: null,
            datasets: [
                { id: 1, name: "Marine Species Distribution", type: "Biodiversity", size: "2.3 GB", updated: "2025-01-15" },
                { id: 2, name: "Ocean Temperature Readings", type: "Environmental", size: "1.8 GB", updated: "2025-01-12" },
                { id: 3, name: "Benthos Community Data", type: "Ecological", size: "945 MB", updated: "2025-01-10" },
                { id: 4, name: "Water Quality Metrics", type: "Chemical", size: "1.2 GB", updated: "2025-01-08" },
                { id: 5, name: "Fisheries Assessment", type: "Commercial", size: "3.1 GB", updated: "2025-01-05" }
            ],
            filters: {
                type: "all",
                dateRange: "all"
            }
        };
    }

    render() {
        // Debug logging to verify props
        console.log('DataPortal render - active:', this.props.active, 'task.id:', this.props.task?.id);
        
        if (!this.props.active) {
            return null;
        }

        return (
            <TaskBar onHide={this.quit} task="DataPortalPlugin" title="Data Portal">
                <div role="body" style={{
                    padding: '20px',
                    maxHeight: '70vh',
                    overflowY: 'auto',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    {/* Header */}
                    <div style={{
                        marginBottom: '20px',
                        borderBottom: '2px solid #4CAF50',
                        paddingBottom: '10px'
                    }}>
                        <h2 style={{
                            margin: '0',
                            color: '#2E7D32',
                            fontSize: '24px'
                        }}>Marine Data Portal</h2>
                        <p style={{
                            margin: '5px 0 0 0',
                            color: '#666',
                            fontSize: '14px'
                        }}>Access and download marine research datasets</p>
                    </div>

                    {/* Filters */}
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        marginBottom: '20px',
                        padding: '15px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px'
                    }}>
                        <div>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
                                Data Type:
                            </label>
                            <select
                                value={this.state.filters.type}
                                onChange={this.handleFilterChange}
                                name="type"
                                style={{
                                    marginLeft: '5px',
                                    padding: '5px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            >
                                <option value="all">All Types</option>
                                <option value="Biodiversity">Biodiversity</option>
                                <option value="Environmental">Environmental</option>
                                <option value="Ecological">Ecological</option>
                                <option value="Chemical">Chemical</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
                                Date Range:
                            </label>
                            <select
                                value={this.state.filters.dateRange}
                                onChange={this.handleFilterChange}
                                name="dateRange"
                                style={{
                                    marginLeft: '5px',
                                    padding: '5px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            >
                                <option value="all">All Dates</option>
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                                <option value="year">Last Year</option>
                            </select>
                        </div>
                    </div>

                    {/* Dataset List */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{
                            color: '#2E7D32',
                            marginBottom: '15px',
                            fontSize: '18px'
                        }}>Available Datasets</h3>
                        {this.getFilteredDatasets().map(dataset => (
                            <div
                                key={dataset.id}
                                style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    marginBottom: '10px',
                                    backgroundColor: this.state.selectedDataset === dataset.id ? '#e8f5e8' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => this.selectDataset(dataset.id)}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                    <div>
                                        <h4 style={{
                                            margin: '0 0 5px 0',
                                            color: '#333',
                                            fontSize: '16px'
                                        }}>{dataset.name}</h4>
                                        <p style={{
                                            margin: '0',
                                            color: '#666',
                                            fontSize: '14px'
                                        }}>
                                            Type: {dataset.type} | Size: {dataset.size} | Updated: {dataset.updated}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => this.downloadDataset(e, dataset)}
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Statistics */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '15px',
                        marginTop: '20px'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            padding: '15px',
                            backgroundColor: '#e3f2fd',
                            borderRadius: '8px'
                        }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
                                127
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                                Total Datasets
                            </div>
                        </div>
                        <div style={{
                            textAlign: 'center',
                            padding: '15px',
                            backgroundColor: '#e8f5e9',
                            borderRadius: '8px'
                        }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>
                                45.2 TB
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                                Total Data Size
                            </div>
                        </div>
                        <div style={{
                            textAlign: 'center',
                            padding: '15px',
                            backgroundColor: '#fff3e0',
                            borderRadius: '8px'
                        }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>
                                1,247
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                                Downloads This Month
                            </div>
                        </div>
                    </div>
                </div>
            </TaskBar>
        );
    }

    getFilteredDatasets = () => {
        let filtered = this.state.datasets;
        
        if (this.state.filters.type !== 'all') {
            filtered = filtered.filter(dataset => dataset.type === this.state.filters.type);
        }
        
        return filtered;
    };

    handleFilterChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            filters: {
                ...this.state.filters,
                [name]: value
            }
        });
    };

    selectDataset = (datasetId) => {
        this.setState({
            selectedDataset: this.state.selectedDataset === datasetId ? null : datasetId
        });
    };

    downloadDataset = (event, dataset) => {
        event.stopPropagation();
        alert(`Downloading ${dataset.name}...\n\nThis would initiate a download in a real implementation.`);
    };

    quit = () => {
        this.props.setCurrentTask(null);
    };
}

export default (cfg) => connect(state => {
    console.log('DataPortalPlugin connect mapStateToProps:', {
        currentTaskId: state.task?.id,
        isDataPortalPlugin: state.task?.id === "DataPortalPlugin",
        fullTaskState: state.task,
        allState: state
    });
    
    return {
        active: state.task.id === "DataPortalPlugin",
        task: state.task
    };
}, {
    setCurrentTask: setCurrentTask
})(DataPortal);
