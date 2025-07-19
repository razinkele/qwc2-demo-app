// Simple debug script to test basic functionality
console.log('=== DEBUG SCRIPT LOADED ===');

// Test if we can access the document
setTimeout(() => {
    console.log('Document ready state:', document.readyState);
    console.log('Document body:', document.body);
    
    // Find all buttons on the page
    const buttons = document.querySelectorAll('button');
    console.log('Found buttons:', buttons.length);
    buttons.forEach((btn, index) => {
        console.log(`Button ${index}:`, {
            text: btn.textContent?.trim(),
            title: btn.title,
            className: btn.className
        });
    });
    
    // Check for QWC2 framework
    console.log('=== CHECKING QWC2 FRAMEWORK ===');
    console.log('window.qwc2:', window.qwc2);
    
    if (window.qwc2) {
        console.log('QWC2 store:', window.qwc2.store);
        console.log('QWC2 setCurrentTask:', window.qwc2.setCurrentTask);
        
        // Check for alternative store access methods
        console.log('QWC2 getStore:', window.qwc2.getStore);
        console.log('QWC2 redux:', window.qwc2.redux);
        console.log('QWC2 _store:', window.qwc2._store);
        console.log('All QWC2 properties:', Object.keys(window.qwc2));
        
        if (window.qwc2.store) {
            console.log('Current Redux state:', window.qwc2.store.getState());
            console.log('Task state:', window.qwc2.store.getState().task);
        } else {
            console.log('⚠️ QWC2 store not available during initial check');
        }
    }
    
    // Also check for global Redux store
    console.log('window.__REDUX_STORE__:', window.__REDUX_STORE__);
    console.log('window.store:', window.store);
    console.log('document.getElementById store or redux elements:', 
        document.getElementById('store'), 
        document.getElementById('redux-store'));
}, 3000);

// Monitor all button clicks on the page
document.addEventListener('click', function(event) {
    console.log('=== CLICK DETECTED ===', event.target);
    
    if (event.target.tagName === 'BUTTON' || event.target.closest('button')) {
        const button = event.target.tagName === 'BUTTON' ? event.target : event.target.closest('button');
        console.log('Button clicked:', {
            button: button,
            text: button.textContent || button.innerText,
            title: button.title,
            className: button.className
        });
        
        // Check if this is a plugin button based on actual button titles
        const isPluginButton = button.title?.includes('DataPortalPlugin') || 
                              button.title?.includes('BowtieAnalysisPlugin') || 
                              button.title?.includes('CustomDashboardPlugin') || 
                              button.title?.includes('TestPlugin') ||
                              button.title?.includes('DebugPlugin');
        
        if (isPluginButton) {
            console.log('=== PLUGIN BUTTON CLICKED ===');
            console.log('Button title:', button.title);
            console.log('QWC2 available?', !!window.qwc2);
            console.log('setCurrentTask available?', !!(window.qwc2 && window.qwc2.setCurrentTask));
            
            // Try to manually activate the task
            setTimeout(() => {
                if (window.qwc2 && window.qwc2.setCurrentTask) {
                    console.log('=== ATTEMPTING MANUAL TASK ACTIVATION ===');
                    
                    let taskId = null;
                    if (button.title?.includes('DataPortalPlugin')) {
                        taskId = 'DataPortalPlugin';
                    } else if (button.title?.includes('BowtieAnalysisPlugin')) {
                        taskId = 'BowtieAnalysisPlugin';
                    } else if (button.title?.includes('CustomDashboardPlugin')) {
                        taskId = 'CustomDashboardPlugin';
                    } else if (button.title?.includes('TestPlugin')) {
                        taskId = 'TestPlugin';
                    } else if (button.title?.includes('DebugPlugin')) {
                        taskId = 'DebugPlugin';
                    }
                    
                    if (taskId) {
                        console.log(`Calling setCurrentTask('${taskId}')`);
                        
                        // Get state BEFORE calling setCurrentTask
                        let stateBefore = null;
                        if (window.qwc2.store) {
                            stateBefore = window.qwc2.store.getState();
                            console.log('BEFORE setCurrentTask - task state:', stateBefore.task);
                        } else {
                            console.log('⚠️ QWC2 store not available before setCurrentTask');
                        }
                        
                        try {
                            const result = window.qwc2.setCurrentTask(taskId);
                            console.log(`✅ Successfully called setCurrentTask('${taskId}')`);
                            console.log('setCurrentTask returned:', result);
                            
                            // Check state IMMEDIATELY after
                            if (window.qwc2.store) {
                                const stateImmediate = window.qwc2.store.getState();
                                console.log('IMMEDIATELY AFTER setCurrentTask - task state:', stateImmediate.task);
                                
                                // Check if state actually changed
                                if (stateBefore) {
                                    const stateChanged = JSON.stringify(stateBefore.task) !== JSON.stringify(stateImmediate.task);
                                    console.log('State changed immediately?', stateChanged);
                                }
                            } else {
                                console.log('⚠️ QWC2 store not available immediately after setCurrentTask');
                            }
                            
                            // Multiple delayed checks
                            [100, 200, 500, 1000].forEach(delay => {
                                setTimeout(() => {
                                    if (window.qwc2 && window.qwc2.store) {
                                        const state = window.qwc2.store.getState();
                                        console.log(`=== STATE AFTER ${delay}ms ===`);
                                        console.log('Current task:', state.task);
                                        console.log('Task current:', state.task?.current);
                                        console.log('Task id:', state.task?.id);
                                        console.log('Full task object:', JSON.stringify(state.task, null, 2));
                                        
                                        // Check if there are any visible task panels
                                        const taskPanels = document.querySelectorAll('[class*="task"], [class*="panel"], [class*="window"]');
                                        console.log(`Found potential task panels (${delay}ms):`, taskPanels.length);
                                        taskPanels.forEach((panel, i) => {
                                            console.log(`Panel ${i}:`, {
                                                element: panel,
                                                className: panel.className,
                                                id: panel.id,
                                                visible: panel.style.display !== 'none' && panel.offsetParent !== null
                                            });
                                        });
                                    } else {
                                        console.log(`⚠️ QWC2 store not available after ${delay}ms`);
                                    }
                                }, delay);
                            });
                        } catch (error) {
                            console.error(`❌ Error calling setCurrentTask('${taskId}'):`, error);
                        }
                    } else {
                        console.log('❌ Could not determine task ID from button title:', button.title);
                    }
                } else {
                    console.log('❌ QWC2.setCurrentTask not available');
                    console.log('window.qwc2:', window.qwc2);
                }
            }, 100);
        }
    } else {
        console.log('Non-button element clicked:', event.target.tagName);
    }
}, true);

// Monitor QWC2 availability
const checkQWC2 = setInterval(() => {
    if (window.qwc2) {
        console.log('=== QWC2 FRAMEWORK AVAILABLE ===');
        console.log('QWC2 object:', window.qwc2);
        console.log('Available methods:', Object.keys(window.qwc2));
        
        if (window.qwc2.store) {
            console.log('=== REDUX STORE AVAILABLE ===');
            console.log('Initial state:', window.qwc2.store.getState());
            
            // Subscribe to state changes with more detailed logging
            let subscriptionCount = 0;
            window.qwc2.store.subscribe(() => {
                subscriptionCount++;
                const state = window.qwc2.store.getState();
                console.log(`=== REDUX STATE CHANGED #${subscriptionCount} ===`);
                console.log('New task state:', state.task);
                console.log('Task current:', state.task?.current);
                console.log('Task id:', state.task?.id);
                console.log('Full task object:', JSON.stringify(state.task, null, 2));
            });
            
            console.log('Redux subscription set up successfully');
            
            // Test the subscription by dispatching a test action
            setTimeout(() => {
                console.log('Testing Redux subscription...');
                try {
                    if (window.qwc2 && window.qwc2.store) {
                        // Try to dispatch a simple action to test if subscription works
                        window.qwc2.store.dispatch({type: 'DEBUG_TEST_ACTION', payload: 'test'});
                        console.log('Test action dispatched');
                    } else {
                        console.log('QWC2 store not available for test dispatch');
                    }
                } catch (e) {
                    console.log('Error dispatching test action:', e);
                }
            }, 1000);
        }
        
        clearInterval(checkQWC2);
    }
}, 500);
