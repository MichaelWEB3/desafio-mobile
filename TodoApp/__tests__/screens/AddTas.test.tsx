import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import CreateTaskScreen from '../../src/screens/AddTask';
import { useAddTaskMutation, useUpdateTaskMutation } from '../../src/redux/features/task';

const mockedNavigateBack = jest.fn();

jest.mock('../../src/redux/features/task', () => ({
    useAddTaskMutation: jest.fn(),
    useUpdateTaskMutation: jest.fn(),
}));

jest.mock('../../src/context/ThemeContext', () => ({
    useTheme: () => ({
        currentColors: {
            background: '#fff',
            contextText: '#ccc',
        },
    }),
}));

let mockRouteReturn = {
    key: 'default-key',
    name: 'CreateTask',
    params: {},
};

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            goBack: mockedNavigateBack,
        }),
        useRoute: () => mockRouteReturn,
    };
});

const mockAddTask = jest.fn().mockResolvedValue({
    unwrap: () => Promise.resolve(),
});

const mockUpdateTask = jest.fn().mockResolvedValue({
    unwrap: () => Promise.resolve(),
});

(useAddTaskMutation as jest.Mock).mockReturnValue([
    mockAddTask,
    { isLoading: false },
]);

(useUpdateTaskMutation as jest.Mock).mockReturnValue([
    mockUpdateTask,
    { isLoading: false },
]);

describe('AddTask Screen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockRouteReturn = {
            key: 'default-key',
            name: 'CreateTask',
            params: {},
        };
    });

    it('send title and description when creating new task', async () => {
        render(<CreateTaskScreen />);

        await waitFor(() => {
            expect(screen.getByTestId('title')).toBeTruthy();
            expect(screen.getByTestId('description')).toBeTruthy();
        });

        await act(async () => {
            fireEvent.changeText(screen.getByTestId('title'), 'title');
            fireEvent.changeText(screen.getByTestId('description'), 'description');
        });

        fireEvent.press(screen.getByTestId('add-or-update-task-button'));

        await waitFor(() => {
            expect(mockAddTask).toHaveBeenCalledWith({
                title: 'title',
                description: 'description',
            });
        });
    });

});
