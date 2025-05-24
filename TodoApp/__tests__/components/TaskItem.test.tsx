import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskItem } from '../../src/components/TaskItem';

// Mocks necessários para os hooks, mas sem lógica complexa
const mockDeleteTask = jest.fn();
const mockUpdateTask = jest.fn();

jest.mock('@/redux/features/task', () => ({
    useDeleteTaskMutation: () => [mockDeleteTask],
    useUpdateTaskMutation: () => [mockUpdateTask],
}));

jest.mock('@/context/ThemeContext', () => ({
    useTheme: () => ({
        currentColors: {
            background: '#fff',
            contextText: '#000',
            text: '#333',
        },
    }),
}));

describe('TaskItem - Renderização básica', () => {
    const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Task description',
        done: false,
    };

    it('should render task title and description', () => {
        render(<TaskItem task={mockTask} onEdit={() => { }} />);
        expect(screen.getByText(/ID #1 - Test Task/)).toBeTruthy();
        expect(screen.getByText(/Task description/)).toBeTruthy();
    });

    it('should render buttons (edit, delete, complete)', () => {
        render(<TaskItem task={mockTask} onEdit={() => { }} />);
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
});
