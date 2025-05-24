import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { EmptyMessage } from '../../src/components/EmptyMessage';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon'); // Mock do Ionicons

jest.mock('../../src/context/ThemeContext', () => ({
    useTheme: () => ({
        currentColors: {
            background: '#fff',
            contextText: '#000',
        },
    }),
}));

describe('EmptyMessage component', () => {
    it('should render title and description correctly', () => {
        const title = 'EmptyMessage Title';
        const description = 'EmptyMessage Description';

        render(<EmptyMessage title={title} description={description} />);

        expect(screen.getByText(title)).toBeTruthy();
        expect(screen.getByText(description)).toBeTruthy();

        expect(screen.getByTestId('icon')).toBeTruthy();
    });
});
