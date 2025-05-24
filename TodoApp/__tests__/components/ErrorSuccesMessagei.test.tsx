import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import { Message } from '../../src/components/ErrorSuccesMessage';

jest.mock('@/context/ThemeContext', () => ({
    useTheme: () => ({
        currentColors: {
            background: '#fff',
            contextText: '#000',
        },
    }),
}));


jest.mock('react-native/Libraries/Animated/Animated', () => {
    const ActualAnimated = jest.requireActual('react-native/Libraries/Animated/Animated');
    return {
        ...ActualAnimated,
        timing: () => ({
            start: (callback?: () => void) => {
                if (callback) callback();
            },
        }),
        sequence: (animations: any[]) => ({
            start: (callback?: () => void) => {
                if (callback) callback();
            },
        }),
        parallel: (animations: any[]) => ({
            start: (callback?: () => void) => {
                if (callback) callback();
            },
        }),
        delay: () => ({
            start: (callback?: () => void) => {
                if (callback) callback();
            },
        }),
    };
});

jest.useFakeTimers();

describe('Message component', () => {
    it('should render message initially and disappear after duration', () => {
        const testMessage = 'Test message';

        const { queryByText } = render(<Message message={testMessage} duration={1000} />);

        expect(queryByText(testMessage)).toBeTruthy();

        act(() => {
            jest.advanceTimersByTime(300 + 1000 + 300); // entrada + duração + saída
        });

        expect(queryByText(testMessage)).toBeNull();
    });

    it('should render message with success type styles', () => {
        const testMessage = 'Success message';

        const { getByText } = render(<Message message={testMessage} type="success" />);

        expect(getByText(testMessage)).toBeTruthy();
    });
});
