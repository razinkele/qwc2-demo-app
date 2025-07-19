/**
 * Simple test plugin to debug activation
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TaskBar from 'qwc2/components/TaskBar';
import {setCurrentTask} from 'qwc2/actions/task';

class TestPlugin extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        setCurrentTask: PropTypes.func,
        task: PropTypes.object
    };

    componentDidUpdate(prevProps) {
        if (!prevProps.active && this.props.active) {
            alert('TestPlugin activated successfully! Task ID: ' + this.props.task?.id);
        }
    }

    render() {
        console.log('TestPlugin render - active:', this.props.active, 'task.id:', this.props.task?.id);
        
        if (!this.props.active) {
            return null;
        }

        return (
            <TaskBar onHide={this.quit} task="Test" title="Test Plugin">
                <div role="body" style={{ padding: '20px', position: 'relative' }}>
                    {/* Custom close button in top-right corner */}
                    <button 
                        onClick={this.quit}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            zIndex: 1000
                        }}
                        title="Close Plugin"
                    >
                        ×
                    </button>
                    
                    <h2>Test Plugin Works!</h2>
                    <p>This plugin is successfully activated.</p>
                    <p style={{ color: '#666', fontSize: '12px' }}>
                        Task ID: {this.props.task?.id} | Active: {this.props.active ? 'Yes' : 'No'}
                    </p>
                    
                    {/* Additional close button at bottom */}
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <button 
                            onClick={this.quit}
                            style={{
                                background: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Close Plugin
                        </button>
                    </div>
                </div>
            </TaskBar>
        );
    }

    quit = () => {
        this.props.setCurrentTask(null);
    };
}

export default (cfg) => connect(state => ({
    active: state.task.id === "Test"
}), {
    setCurrentTask: setCurrentTask
})(TestPlugin);
