/**
 * Data Portal Plugin for QWC2
 * Provides access to marine biodiversity data and research tools
 */

window.addEventListener("QWC2ApiReady", () => {
    const {React, PropTypes, connect} = window.qwc2.libs;
    const {TaskBar, Spinner} = window.qwc2.components;

    class DataPortal extends React.Component {
        static propTypes = {
            active: PropTypes.bool
        };

        constructor(props) {
            super(props);
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
            if (!this.props.active) {
                return null;
            }

            return React.createElement(TaskBar, {
                onHide: this.quit,
                task: "DataPortal",
                title: "Data Portal"
            },
                React.createElement('div', {
                    role: 'body',
                    style: {
                        padding: '20px',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        fontFamily: 'Arial, sans-serif'
                    }
                },
                    // Header
                    React.createElement('div', {
                        style: {
                            marginBottom: '20px',
                            borderBottom: '2px solid #4CAF50',
                            paddingBottom: '10px'
                        }
                    },
                        React.createElement('h2', {
                            style: {
                                margin: '0',
                                color: '#2E7D32',
                                fontSize: '24px'
                            }
                        }, 'Marine Data Portal'),
                        React.createElement('p', {
                            style: {
                                margin: '5px 0 0 0',
                                color: '#666',
                                fontSize: '14px'
                            }
                        }, 'Access and download marine research datasets')
                    ),

                    // Filters
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            gap: '15px',
                            marginBottom: '20px',
                            padding: '15px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px'
                        }
                    },
                        React.createElement('div', null,
                            React.createElement('label', {
                                style: { fontSize: '12px', fontWeight: 'bold', color: '#333' }
                            }, 'Data Type:'),
                            React.createElement('select', {
                                value: this.state.filters.type,
                                onChange: this.handleFilterChange,
                                name: 'type',
                                style: {
                                    marginLeft: '5px',
                                    padding: '5px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }
                            },
                                React.createElement('option', { value: 'all' }, 'All Types'),
                                React.createElement('option', { value: 'Biodiversity' }, 'Biodiversity'),
                                React.createElement('option', { value: 'Environmental' }, 'Environmental'),
                                React.createElement('option', { value: 'Ecological' }, 'Ecological'),
                                React.createElement('option', { value: 'Chemical' }, 'Chemical'),
                                React.createElement('option', { value: 'Commercial' }, 'Commercial')
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', {
                                style: { fontSize: '12px', fontWeight: 'bold', color: '#333' }
                            }, 'Date Range:'),
                            React.createElement('select', {
                                value: this.state.filters.dateRange,
                                onChange: this.handleFilterChange,
                                name: 'dateRange',
                                style: {
                                    marginLeft: '5px',
                                    padding: '5px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }
                            },
                                React.createElement('option', { value: 'all' }, 'All Dates'),
                                React.createElement('option', { value: 'week' }, 'Last Week'),
                                React.createElement('option', { value: 'month' }, 'Last Month'),
                                React.createElement('option', { value: 'year' }, 'Last Year')
                            )
                        )
                    ),

                    // Dataset List
                    React.createElement('div', {
                        style: { marginBottom: '20px' }
                    },
                        React.createElement('h3', {
                            style: {
                                color: '#2E7D32',
                                marginBottom: '15px',
                                fontSize: '18px'
                            }
                        }, 'Available Datasets'),
                        ...this.getFilteredDatasets().map(dataset =>
                            React.createElement('div', {
                                key: dataset.id,
                                style: {
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    marginBottom: '10px',
                                    backgroundColor: this.state.selectedDataset === dataset.id ? '#e8f5e8' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                },
                                onClick: () => this.selectDataset(dataset.id)
                            },
                                React.createElement('div', {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start'
                                    }
                                },
                                    React.createElement('div', null,
                                        React.createElement('h4', {
                                            style: {
                                                margin: '0 0 5px 0',
                                                color: '#333',
                                                fontSize: '16px'
                                            }
                                        }, dataset.name),
                                        React.createElement('p', {
                                            style: {
                                                margin: '0',
                                                color: '#666',
                                                fontSize: '14px'
                                            }
                                        }, `Type: ${dataset.type} | Size: ${dataset.size} | Updated: ${dataset.updated}`)
                                    ),
                                    React.createElement('button', {
                                        onClick: (e) => this.downloadDataset(e, dataset),
                                        style: {
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }
                                    }, 'Download')
                                )
                            )
                        )
                    ),

                    // Statistics
                    React.createElement('div', {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '15px',
                            marginTop: '20px'
                        }
                    },
                        React.createElement('div', {
                            style: {
                                textAlign: 'center',
                                padding: '15px',
                                backgroundColor: '#e3f2fd',
                                borderRadius: '8px'
                            }
                        },
                            React.createElement('div', {
                                style: { fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }
                            }, '127'),
                            React.createElement('div', {
                                style: { fontSize: '12px', color: '#666' }
                            }, 'Total Datasets')
                        ),
                        React.createElement('div', {
                            style: {
                                textAlign: 'center',
                                padding: '15px',
                                backgroundColor: '#e8f5e9',
                                borderRadius: '8px'
                            }
                        },
                            React.createElement('div', {
                                style: { fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }
                            }, '45.2 TB'),
                            React.createElement('div', {
                                style: { fontSize: '12px', color: '#666' }
                            }, 'Total Data Size')
                        ),
                        React.createElement('div', {
                            style: {
                                textAlign: 'center',
                                padding: '15px',
                                backgroundColor: '#fff3e0',
                                borderRadius: '8px'
                            }
                        },
                            React.createElement('div', {
                                style: { fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }
                            }, '1,247'),
                            React.createElement('div', {
                                style: { fontSize: '12px', color: '#666' }
                            }, 'Downloads This Month')
                        )
                    )
                )
            );
        }

        getFilteredDatasets = () => {
            let filtered = this.state.datasets;
            
            if (this.state.filters.type !== 'all') {
                filtered = filtered.filter(dataset => dataset.type === this.state.filters.type);
            }
            
            // Add date filtering logic here if needed
            
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
            window.qwc2.setCurrentTask(null);
        };
    }

    const DataPortalPlugin = connect(state => ({
        active: state.task.id === "DataPortal"
    }))(DataPortal);

    window.qwc2.addPlugin("DataPortalPlugin", DataPortalPlugin);
});
