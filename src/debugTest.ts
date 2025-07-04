import { TaskManager } from './services/TaskManager';

console.log('🔍 STARTING DEBUG TEST');

const manager = new TaskManager();

// Edge Case: undo/redo with no commands
console.log('\n--- Undo with no commands ---');
manager.undo();

console.log('\n--- Redo with no commands ---');
manager.redo();

// Add two tasks
console.log('\n--- Add Task A and B ---');
const idA = manager.addTask({ title: 'Task A', priority: 'high' });
const idB = manager.addTask({ title: 'Task B', priority: 'medium' });
console.log(manager.getTasks());

// Update B
console.log('\n--- Update Task B ---');
manager.updateTask(idB, { priority: 'low', title: 'Task B Updated' });
console.log(manager.getTasks());

// Undo update B
console.log('\n--- Undo Update Task B ---');
manager.undo();
console.log(manager.getTasks());

// Redo update B
console.log('\n--- Redo Update Task B ---');
manager.redo();
console.log(manager.getTasks());

// Complete A, then complete A as false
console.log('\n--- Complete A: true, then false ---');
manager.completeTask(idA, true);
manager.completeTask(idA, false);
console.log(manager.getTasks());

// Undo twice: should revert to true, then to false
console.log('\n--- Undo complete A (x2) ---');
manager.undo();
console.log(manager.getTasks());
manager.undo();
console.log(manager.getTasks());

// Redo complete A: should go to true
console.log('\n--- Redo complete A ---');
manager.redo();
console.log(manager.getTasks());

// Test redo lost after new command
console.log('\n--- Undo update B, then add Task C (should lose redo) ---');
manager.undo();
const idC = manager.addTask({ title: 'Task C', priority: 'low' });
console.log(manager.getTasks());

console.log('\n--- Try redo (should do nothing) ---');
manager.redo();
console.log(manager.getTasks());

// Mass undo/redo
console.log('\n--- Mass Add Tasks ---');
const ids = Array.from({ length: 5 }, (_, i) =>
  manager.addTask({ title: `Mass ${i + 1}`, priority: 'medium' })
);
console.log(manager.getTasks());

console.log('\n--- Mass Undo ---');
for (let i = 0; i < 5; i++) manager.undo();
console.log(manager.getTasks());

console.log('\n--- Mass Redo ---');
for (let i = 0; i < 5; i++) manager.redo();
console.log(manager.getTasks());

console.log('\n✅ DEBUG TEST COMPLETED');