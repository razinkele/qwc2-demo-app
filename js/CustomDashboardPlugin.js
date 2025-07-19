/**
 * Copyright 2025 MARBEFES
 * Custom Dashboard Plugin for QWC2
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TaskBar from 'qwc2/components/TaskBar';
import {setCurrentTask} from 'qwc2/actions/task';

class CustomDashboard extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        setCurrentTask: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            widgets: {
                oceanTemp: { value: 18.5, trend: '+0.3°C', status: 'normal' },
                speciesCount: { value: 342, trend: '+12', status: 'good' },
                dataQuality: { value: 94, trend: '+2%', status: 'excellent' },
                systemStatus: { value: 'Operational', uptime: '99.8%', status: 'active' },
                recentActivity: [
                    { time: '14:30', action: 'Data collection started', location: 'Station A-12' },
                    { time: '13:45', action: 'Quality check completed', location: 'Dataset #847' },
                    { time: '12:20', action: 'New species identified', location: 'Grid B-5' },
                    { time: '11:15', action: 'Sensor calibration', location: 'Buoy Network' }
                ],
                researchProgress: { completion: 67, milestone: 'Phase 2 Analysis' }
            },
            refreshInterval: null,
            lastUpdated: new Date().toLocaleTimeString()
        };
    }

    componentDidMount() {
        if (this.props.active) {
            this.startAutoRefresh();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.active && !prevProps.active) {
            this.startAutoRefresh();
        } else if (!this.props.active && prevProps.active) {
            this.stopAutoRefresh();
        }
    }

    componentWillUnmount() {
        this.stopAutoRefresh();
    }

    startAutoRefresh = () => {
        const interval = setInterval(() => {
            this.updateWidgetData();
        }, 30000); // Update every 30 seconds
        this.setState({ refreshInterval: interval });
    };

    stopAutoRefresh = () => {
        if (this.state.refreshInterval) {
            clearInterval(this.state.refreshInterval);
            this.setState({ refreshInterval: null });
        }
    };

    updateWidgetData = () => {
        // Simulate real-time data updates
        this.setState(prevState => ({
            widgets: {
                ...prevState.widgets,
                oceanTemp: {
                    ...prevState.widgets.oceanTemp,
                    value: +(prevState.widgets.oceanTemp.value + (Math.random() - 0.5) * 0.2).toFixed(1)
                },
                speciesCount: {
                    ...prevState.widgets.speciesCount,
                    value: Math.max(300, prevState.widgets.speciesCount.value + Math.floor(Math.random() * 3 - 1))
                },
                dataQuality: {
                    ...prevState.widgets.dataQuality,
                    value: Math.min(100, Math.max(90, prevState.widgets.dataQuality.value + Math.floor(Math.random() * 3 - 1)))
                }
            },
            lastUpdated: new Date().toLocaleTimeString()
        }));
    };

    render() {
        if (!this.props.active) {
            return null;
        }

        return (
            <TaskBar onHide={this.quit} task="CustomDashboardPlugin" title="Research Dashboard">
                <div role="body" style={{
                    padding: '20px',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    fontFamily: 'Arial, sans-serif',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px'
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '25px',
                        padding: '15px',
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <h2 style={{
                            margin: '0',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: '600'
                        }}>Marine Research Dashboard</h2>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                        }}>
                            <div style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '12px'
                            }}>
                                Last updated: {this.state.lastUpdated}
                            </div>
                            <button
                                onClick={this.updateWidgetData}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Widget Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {/* Ocean Temperature Widget */}
                        {this.renderWidget(
                            'Ocean Temperature',
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3' }}>
                                        {this.state.widgets.oceanTemp.value}°C
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#4CAF50', marginTop: '5px' }}>
                                        {this.state.widgets.oceanTemp.trend}
                                    </div>
                                </div>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '24px'
                                }}>
                                    🌊
                                </div>
                            </div>
                        )}

                        {/* Species Count Widget */}
                        {this.renderWidget(
                            'Species Identified',
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>
                                        {this.state.widgets.speciesCount.value}
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#FF9800', marginTop: '5px' }}>
                                        {this.state.widgets.speciesCount.trend}
                                    </div>
                                </div>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '24px'
                                }}>
                                    🐟
                                </div>
                            </div>
                        )}

                        {/* Data Quality Widget */}
                        {this.renderWidget(
                            'Data Quality Score',
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#9C27B0' }}>
                                        {this.state.widgets.dataQuality.value}%
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#4CAF50' }}>
                                        {this.state.widgets.dataQuality.trend}
                                    </div>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${this.state.widgets.dataQuality.value}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #9C27B0, #E91E63)',
                                        transition: 'width 0.3s ease'
                                    }} />
                                </div>
                            </div>
                        )}

                        {/* System Status Widget */}
                        {this.renderWidget(
                            'System Status',
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        backgroundColor: '#4CAF50',
                                        animation: 'pulse 2s infinite'
                                    }} />
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                                        {this.state.widgets.systemStatus.value}
                                    </span>
                                </div>
                                <div style={{ fontSize: '14px', color: '#666' }}>
                                    Uptime: {this.state.widgets.systemStatus.uptime}
                                </div>
                            </div>
                        )}

                        {/* Recent Activity Widget */}
                        {this.renderWidget(
                            'Recent Activity',
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {this.state.widgets.recentActivity.map((activity, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            padding: '8px 0',
                                            borderBottom: index < this.state.widgets.recentActivity.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none'
                                        }}
                                    >
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
                                            {activity.time}
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#333', marginBottom: '2px' }}>
                                            {activity.action}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#9C27B0' }}>
                                            {activity.location}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Research Progress Widget */}
                        {this.renderWidget(
                            'Research Progress',
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>
                                        {this.state.widgets.researchProgress.completion}%
                                    </span>
                                    <span style={{ fontSize: '12px', color: '#666' }}>
                                        {this.state.widgets.researchProgress.milestone}
                                    </span>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '6px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${this.state.widgets.researchProgress.completion}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #FF9800, #FFC107)',
                                        transition: 'width 0.3s ease'
                                    }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Control Panel */}
                    <div style={{
                        marginTop: '25px',
                        padding: '20px',
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <h3 style={{
                            color: 'white',
                            marginBottom: '15px',
                            fontSize: '18px'
                        }}>Quick Actions</h3>
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap'
                        }}>
                            {['Export Data', 'Generate Report', 'Start Analysis', 'Configure Alerts'].map(action => (
                                <button
                                    key={action}
                                    onClick={() => this.handleQuickAction(action)}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        color: 'white',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </TaskBar>
        );
    }

    renderWidget = (title, content) => {
        return (
            <div style={{
                background: 'rgba(255, 255, 255, 0.25)',
                borderRadius: '16px',
                padding: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}>
                <h3 style={{
                    margin: '0 0 15px 0',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600'
                }}>
                    {title}
                </h3>
                {content}
            </div>
        );
    };

    handleQuickAction = (action) => {
        alert(`Executing: ${action}\n\nThis would perform the actual action in a real implementation.`);
    };

    quit = () => {
        this.stopAutoRefresh();
        this.props.setCurrentTask(null);
    };
}

export default (cfg) => connect(state => ({
    active: state.task.id === "CustomDashboardPlugin"
}), {
    setCurrentTask: setCurrentTask
})(CustomDashboard);
