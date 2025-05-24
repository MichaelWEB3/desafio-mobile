import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ErroMessageApi } from '../../src/components/ErrorMessageApi';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon'); // Mock do Ionicons

jest.mock('../../src/context/ThemeContext', () => ({
    useTheme: () => ({
        currentColors: {
            background: '#fff',
            contextText: '#000',
        },
    }),
}));

describe('ErroMessageApi component', () => {
    it('should render title and description correctly', () => {
        const title = 'Error Title';
        const description = 'Error Description';

        render(<ErroMessageApi title={title} description={description} />);

        expect(screen.getByText(title)).toBeTruthy();
        expect(screen.getByText(description)).toBeTruthy();

        expect(screen.getByTestId('icon')).toBeTruthy();
    });
});
