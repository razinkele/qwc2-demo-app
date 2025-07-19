/**
 * Debug Plugin for testing task activation
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TaskBar from 'qwc2/components/TaskBar';
import {setCurrentTask} from 'qwc2/actions/task';

class DebugTest extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        setCurrentTask: PropTypes.func,
        task: PropTypes.object
    };

    render() {
        console.log('DebugPlugin render called:', {
            active: this.props.active,
            task: this.props.task,
            allProps: this.props
        });

        if (!this.props.active) {
            console.log('DebugPlugin: Not active, returning null');
            return null;
        }

        console.log('DebugPlugin: ACTIVE! Rendering TaskBar');
        alert('DebugPlugin is ACTIVE and rendering!');

        return (
            <TaskBar onHide={this.quit} task="DebugPlugin" title="Debug Test">
                <div role="body" style={{ 
                    padding: '20px', 
                    backgroundColor: '#ff0000', 
                    color: 'white',
                    fontSize: '18px'
                }}>
                    <h2>DEBUG PLUGIN WORKING!</h2>
                    <p>Task ID: {this.props.task?.id}</p>
                    <p>Active: {String(this.props.active)}</p>
                    <p>Time: {new Date().toISOString()}</p>
                    <button onClick={this.quit} style={{
                        padding: '10px',
                        fontSize: '16px',
                        backgroundColor: 'white',
                        color: 'black'
                    }}>
                        Close Debug Plugin
                    </button>
                </div>
            </TaskBar>
        );
    }

    quit = () => {
        console.log('DebugPlugin quit called');
        alert('DebugPlugin quit called');
        this.props.setCurrentTask(null);
    };
}

export default (cfg) => connect(state => {
    console.log('DebugPlugin connect mapStateToProps:', {
        currentTaskId: state.task?.id,
        isDebugPlugin: state.task?.id === "DebugPlugin",
        fullTaskState: state.task
    });
    
    return {
        active: state.task.id === "DebugPlugin",
        task: state.task
    };
}, {
    setCurrentTask: setCurrentTask
})(DebugTest);
