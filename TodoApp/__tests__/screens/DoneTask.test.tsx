import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { DoneTaskScreen } from '../../src/screens/DoneTask';
import { useGetTasksQuery } from '../../src/redux/features/task';

const mockNavigate = jest.fn();
const mockRefetch = jest.fn();
const mockUpdateMutation = jest.fn();
const mockDeleteMutation = jest.fn();

jest.mock('../../src/redux/features/task', () => ({
    useGetTasksQuery: jest.fn(),
    useDeleteTaskMutation: () => [
        mockDeleteMutation,
        { isError: false, error: null },
    ],
    useUpdateTaskMutation: () => [
        mockUpdateMutation,
        { isError: false, error: null },
    ],
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
    useFocusEffect: (callback: any) => callback(),
}));

jest.mock('../../src/context/ThemeContext', () => ({
    useTheme: () => ({
        currentColors: {
            background: '#fff',
            contextText: '#ccc',
        },
    }),
}));

jest.mock('@shopify/flash-list', () => {
    const React = require('react');
    const { View } = require('react-native');

    const MockFlashList = ({ data, renderItem }: any) => (
        <View>
            {data?.map((item: any, index: number) => (
                <React.Fragment key={item.id}>
                    {renderItem({ item, index })}
                </React.Fragment>
            ))}
        </View>
    );

    return {
        __esModule: true,
        FlashList: MockFlashList,
        default: MockFlashList,
    };
});

describe('DoneTaskScreen', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render SkeletonPlaceholder during loading', () => {
        (useGetTasksQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
            refetch: mockRefetch,
        });

        render(<DoneTaskScreen />);
        expect(screen.getByText('Tarefas')).toBeTruthy();
    });

    it('should render error message when isError is true', () => {
        (useGetTasksQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
            refetch: mockRefetch,
        });

        render(<DoneTaskScreen />);
        expect(screen.getByText('Ops! Algo deu errado.')).toBeTruthy();
    });

    it('should render empty message when there are no completed tasks', () => {
        const mockTasks = [
            { id: '1', title: 'Tarefa 1', description: 'Desc 1', done: false },
            { id: '2', title: 'Tarefa 2', description: 'Desc 2', done: false },
        ];
        (useGetTasksQuery as jest.Mock).mockReturnValue({
            data: { tasks: mockTasks },
            isLoading: false,
            isError: false,
            refetch: mockRefetch,
        });

        render(<DoneTaskScreen />);
        expect(screen.getByText('Nenhuma tarefa por aqui!')).toBeTruthy();
    });

    it('should render only completed tasks', async () => {
        const mockTasks = [
            { id: '1', title: 'Tarefa Concluída 1', description: 'Desc 1', done: true },
            { id: '3', title: 'Tarefa Concluída 2', description: 'Desc 3', done: true },
        ];
        (useGetTasksQuery as jest.Mock).mockReturnValue({
            data: { tasks: mockTasks },
            isLoading: false,
            isError: false,
            refetch: mockRefetch,
        });

        render(<DoneTaskScreen />);

        await waitFor(() => {
            expect(screen.getByText(/Tarefa Concluída 1/)).toBeTruthy();
            expect(screen.getByText(/Tarefa Concluída 2/)).toBeTruthy();
        });
    });
});
