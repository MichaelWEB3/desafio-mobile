import { TaskType, NewTaskType } from '../../src/types/taskType';

describe('TaskType and NewTaskType validation', () => {
    const validTask: TaskType = {
        id: 123,
        title: 'Task title',
        description: 'Task description',
        done: true,
    };

    const validNewTask: NewTaskType = {
        title: 'New task title',
        description: 'New task description',
    };

    it('TaskType should have required properties with correct types', () => {
        expect(typeof validTask.id).toBe('number');
        expect(typeof validTask.title).toBe('string');
        expect(typeof validTask.description).toBe('string');
        if (validTask.done !== undefined) {
            expect(typeof validTask.done).toBe('boolean');
        }
    });

    it('NewTaskType should have title and description as strings', () => {
        expect(typeof validNewTask.title).toBe('string');
        expect(typeof validNewTask.description).toBe('string');
    });

    it('TaskType done property can be undefined', () => {
        const taskWithoutDone: TaskType = {
            id: 999,
            title: 'No done property',
            description: 'Testing without done',
        };
        expect(taskWithoutDone.done).toBeUndefined();
    });
});
