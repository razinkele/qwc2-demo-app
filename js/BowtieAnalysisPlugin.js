/**
 * Copyright 2025 MARBEFES
 * Bowtie Analysis Plugin for QWC2
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TaskBar from 'qwc2/components/TaskBar';

class BowtieAnalysis extends React.Component {
    static propTypes = {
        active: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'overview',
            analysisData: {
                threats: [
                    { id: 1, name: "Oil Spill", severity: "High", probability: "Medium", impact: "Critical" },
                    { id: 2, name: "Overfishing", severity: "Medium", probability: "High", impact: "High" },
                    { id: 3, name: "Plastic Pollution", severity: "High", probability: "High", impact: "High" },
                    { id: 4, name: "Climate Change", severity: "Critical", probability: "High", impact: "Critical" },
                    { id: 5, name: "Ship Collision", severity: "Medium", probability: "Low", impact: "Medium" }
                ],
                barriers: [
                    { id: 1, name: "Early Warning System", effectiveness: "85%", status: "Active" },
                    { id: 2, name: "Marine Protected Areas", effectiveness: "72%", status: "Active" },
                    { id: 3, name: "Monitoring Network", effectiveness: "68%", status: "Maintenance" },
                    { id: 4, name: "Response Teams", effectiveness: "91%", status: "Active" }
                ],
                consequences: [
                    { id: 1, name: "Ecosystem Damage", severity: "Critical", mitigation: "Restoration Program" },
                    { id: 2, name: "Economic Loss", severity: "High", mitigation: "Insurance Coverage" },
                    { id: 3, name: "Species Extinction", severity: "Critical", mitigation: "Conservation Program" },
                    { id: 4, name: "Water Contamination", severity: "High", mitigation: "Cleanup Protocol" }
                ]
            },
            selectedThreat: null
        };
    }

    render() {
        if (!this.props.active) {
            return null;
        }

        return (
            <TaskBar onHide={this.quit} task="BowtieAnalysis" title="Bowtie Risk Analysis">
                <div role="body" style={{
                    padding: '20px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    {/* Header */}
                    <div style={{
                        marginBottom: '20px',
                        borderBottom: '2px solid #FF5722',
                        paddingBottom: '10px'
                    }}>
                        <h2 style={{
                            margin: '0',
                            color: '#D84315',
                            fontSize: '24px'
                        }}>Bowtie Risk Analysis</h2>
                        <p style={{
                            margin: '5px 0 0 0',
                            color: '#666',
                            fontSize: '14px'
                        }}>Comprehensive risk assessment for marine environments</p>
                    </div>

                    {/* Tab Navigation */}
                    <div style={{
                        display: 'flex',
                        marginBottom: '20px',
                        borderBottom: '1px solid #ddd'
                    }}>
                        {['overview', 'threats', 'barriers', 'consequences'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => this.setActiveTab(tab)}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    backgroundColor: this.state.activeTab === tab ? '#FF5722' : 'transparent',
                                    color: this.state.activeTab === tab ? 'white' : '#666',
                                    cursor: 'pointer',
                                    borderBottom: this.state.activeTab === tab ? '2px solid #FF5722' : 'none',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {this.renderTabContent()}
                </div>
            </TaskBar>
        );
    }

    renderTabContent = () => {
        switch (this.state.activeTab) {
            case 'overview':
                return this.renderOverview();
            case 'threats':
                return this.renderThreats();
            case 'barriers':
                return this.renderBarriers();
            case 'consequences':
                return this.renderConsequences();
            default:
                return this.renderOverview();
        }
    };

    renderOverview = () => {
        return (
            <div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: '#ffebee',
                        borderRadius: '8px',
                        border: '1px solid #ffcdd2'
                    }}>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#c62828' }}>
                            5
                        </div>
                        <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                            Active Threats
                        </div>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: '#e8f5e9',
                        borderRadius: '8px',
                        border: '1px solid #c8e6c9'
                    }}>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2e7d32' }}>
                            4
                        </div>
                        <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                            Protection Barriers
                        </div>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: '#fff3e0',
                        borderRadius: '8px',
                        border: '1px solid #ffcc02'
                    }}>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef6c00' }}>
                            79%
                        </div>
                        <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                            Overall Effectiveness
                        </div>
                    </div>
                </div>

                {/* Bowtie Diagram Visualization */}
                <div style={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#333', marginBottom: '20px' }}>
                        Bowtie Risk Model
                    </h3>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'relative'
                    }}>
                        {/* Threats */}
                        <div style={{ flex: '1', textAlign: 'left' }}>
                            <h4 style={{ color: '#c62828' }}>Threats</h4>
                            {this.state.analysisData.threats.slice(0, 3).map(threat => (
                                <div
                                    key={threat.id}
                                    style={{
                                        padding: '5px 10px',
                                        margin: '5px 0',
                                        backgroundColor: '#ffcdd2',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                    }}
                                >
                                    {threat.name}
                                </div>
                            ))}
                        </div>

                        {/* Central Event */}
                        <div style={{
                            padding: '20px',
                            backgroundColor: '#FF5722',
                            color: 'white',
                            borderRadius: '50px',
                            margin: '0 20px',
                            minWidth: '120px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontWeight: 'bold' }}>Marine</div>
                            <div style={{ fontWeight: 'bold' }}>Incident</div>
                        </div>

                        {/* Consequences */}
                        <div style={{ flex: '1', textAlign: 'right' }}>
                            <h4 style={{ color: '#ef6c00' }}>Consequences</h4>
                            {this.state.analysisData.consequences.slice(0, 3).map(consequence => (
                                <div
                                    key={consequence.id}
                                    style={{
                                        padding: '5px 10px',
                                        margin: '5px 0',
                                        backgroundColor: '#ffcc02',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                    }}
                                >
                                    {consequence.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    renderThreats = () => {
        return (
            <div>
                <h3 style={{ color: '#c62828', marginBottom: '15px' }}>
                    Identified Threats
                </h3>
                {this.state.analysisData.threats.map(threat => (
                    <div
                        key={threat.id}
                        style={{
                            border: '1px solid #ffcdd2',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '10px',
                            backgroundColor: 'white'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h4 style={{ margin: '0', color: '#333' }}>
                                {threat.name}
                            </h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span style={{
                                    padding: '4px 8px',
                                    backgroundColor: this.getSeverityColor(threat.severity),
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>
                                    Severity: {threat.severity}
                                </span>
                                <span style={{
                                    padding: '4px 8px',
                                    backgroundColor: this.getProbabilityColor(threat.probability),
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>
                                    Probability: {threat.probability}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    renderBarriers = () => {
        return (
            <div>
                <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>
                    Protection Barriers
                </h3>
                {this.state.analysisData.barriers.map(barrier => (
                    <div
                        key={barrier.id}
                        style={{
                            border: '1px solid #c8e6c9',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '10px',
                            backgroundColor: 'white'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h4 style={{ margin: '0', color: '#333' }}>
                                {barrier.name}
                            </h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span style={{
                                    padding: '4px 8px',
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>
                                    Effectiveness: {barrier.effectiveness}
                                </span>
                                <span style={{
                                    padding: '4px 8px',
                                    backgroundColor: barrier.status === 'Active' ? '#2e7d32' : '#ff9800',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>
                                    {barrier.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    renderConsequences = () => {
        return (
            <div>
                <h3 style={{ color: '#ef6c00', marginBottom: '15px' }}>
                    Potential Consequences
                </h3>
                {this.state.analysisData.consequences.map(consequence => (
                    <div
                        key={consequence.id}
                        style={{
                            border: '1px solid #ffcc02',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '10px',
                            backgroundColor: 'white'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h4 style={{ margin: '0', color: '#333' }}>
                                {consequence.name}
                            </h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span style={{
                                    padding: '4px 8px',
                                    backgroundColor: this.getSeverityColor(consequence.severity),
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>
                                    Severity: {consequence.severity}
                                </span>
                                <span style={{
                                    padding: '4px 8px',
                                    backgroundColor: '#2196f3',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>
                                    {consequence.mitigation}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    getSeverityColor = (severity) => {
        switch (severity) {
            case 'Critical': return '#d32f2f';
            case 'High': return '#f57c00';
            case 'Medium': return '#fbc02d';
            case 'Low': return '#388e3c';
            default: return '#666';
        }
    };

    getProbabilityColor = (probability) => {
        switch (probability) {
            case 'High': return '#d32f2f';
            case 'Medium': return '#f57c00';
            case 'Low': return '#388e3c';
            default: return '#666';
        }
    };

    setActiveTab = (tab) => {
        this.setState({ activeTab: tab });
    };

    quit = () => {
        this.props.setCurrentTask(null);
    };
}

const BowtieAnalysisPlugin = connect(state => ({
    active: state.task.id === "BowtieAnalysis"
}), {
    setCurrentTask: (task) => ({type: 'SET_CURRENT_TASK', task})
})(BowtieAnalysis);

export default BowtieAnalysisPlugin;
