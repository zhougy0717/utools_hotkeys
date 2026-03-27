const actionRegistry = require('../src/core/action_registry.js');
const UIAdapter = require('../src/adapter/ui_adapter.js');

/**
 * Simulation Test for Preload Refactor
 */
function testPreloadRefactorSimulation() {
    console.log('--- Simulation: Preload Action Dispatch ---');

    let uiOutput = null;
    const lastCallbackSetList = (list) => {
        uiOutput = list;
        console.log('UI Render:', JSON.stringify(list, null, 2));
    };

    // 1. Mock a Registry with Handlers
    const mockHandler = {
        handle: (itemData, ui, context) => {
            console.log('Handler triggered for:', itemData.action);
            ui.showLoading('Mock Loading', `ID: ${itemData.id}`);
            return 'handled';
        }
    };
    actionRegistry.register('test_action', mockHandler);

    // 2. Simulate preload.js select() logic
    const simulateSelect = (itemData) => {
        if (actionRegistry.has(itemData.action)) {
            const ui = new UIAdapter(lastCallbackSetList);
            return actionRegistry.handle(itemData.action, itemData, ui, { someContext: true });
        }
        return 'fallback';
    };

    // 3. Run test cases
    console.log('\nCase A: Unknown action');
    const resA = simulateSelect({ action: 'unknown' });
    console.log('Result:', resA); // Should be fallback

    console.log('\nCase B: Registered action');
    const resB = simulateSelect({ action: 'test_action', id: 'app123' });
    console.log('Result:', resB); // Should be handled
    if (uiOutput[0].title === 'Mock Loading') {
        console.log('✅ Action Dispatcher simulation passed');
    } else {
        console.error('❌ Action Dispatcher simulation failed');
    }
}

testPreloadRefactorSimulation();
