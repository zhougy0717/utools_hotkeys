const UIAdapter = require('../src/adapter/ui_adapter.js');

/**
 * Unit Test for UIAdapter
 */
function testUIAdapter() {
    console.log('--- Testing UIAdapter ---');
    
    let lastOutput = null;
    const mockCallback = (list) => {
        lastOutput = list;
    };

    const ui = new UIAdapter(mockCallback);

    // Test showLoading
    ui.showLoading('Title', 'Desc');
    if (lastOutput[0].title === 'Title' && lastOutput[0].icon === 'icons/loading.gif') {
        console.log('✅ showLoading passed');
    } else {
        console.error('❌ showLoading failed', lastOutput);
    }

    // Test showSuccess
    ui.showSuccess('Success', 'Done');
    if (lastOutput[0].title === 'Success' && lastOutput[0].action === 'noop') {
        console.log('✅ showSuccess passed');
    } else {
        console.error('❌ showSuccess failed', lastOutput);
    }

    // Test showError
    ui.showError('Error', 'Failed');
    if (lastOutput[0].title === 'Error' && lastOutput[0].action === 'noop') {
        console.log('✅ showError passed');
    } else {
        console.error('❌ showError failed', lastOutput);
    }
}

testUIAdapter();
