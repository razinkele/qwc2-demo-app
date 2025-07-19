// Simple test script to verify plugin connections
console.log('Testing QWC2 Plugin Integration...');

// Test if plugins are registered
if (window.qwc2) {
    console.log('QWC2 API available');
    
    // Try to activate DataPortal plugin programmatically
    if (window.qwc2.setCurrentTask) {
        console.log('Testing DataPortal activation...');
        window.qwc2.setCurrentTask('DataPortal');
        
        setTimeout(() => {
            console.log('Testing plugin deactivation...');
            window.qwc2.setCurrentTask(null);
        }, 2000);
    } else {
        console.log('setCurrentTask not available yet, plugins may not be loaded');
    }
} else {
    console.log('QWC2 API not available yet');
}
