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
            <TaskBar onHide={this.quit} task="TestPlugin" title="Test Plugin">
                <div role="body" style={{ padding: '20px' }}>
                    <h2>Test Plugin Works!</h2>
                    <p>This plugin is successfully activated.</p>
                    <button onClick={this.quit}>Close</button>
                </div>
            </TaskBar>
        );
    }

    quit = () => {
        this.props.setCurrentTask(null);
    };
}

export default (cfg) => connect(state => ({
    active: state.task.id === "TestPlugin"
}), {
    setCurrentTask: setCurrentTask
})(TestPlugin);
