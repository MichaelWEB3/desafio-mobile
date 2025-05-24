import { ThemeColors } from '../../src/types/themeColorType'; // ajuste o caminho

describe('ThemeColors type tests', () => {
    const validTheme: ThemeColors = {
        primary: '#000000',
        documentDrodown: '#111111',
        secondary: '#222222',
        error: '#FF0000',
        background: '#FFFFFF',
        text: '#333333',
        contextText: '#444444',
        mode: 'light',
        documentContainer: '#555555',
        success: '#00FF00',
    };

    it('should have all required properties with correct types', () => {
        expect(typeof validTheme.primary).toBe('string');
        expect(typeof validTheme.documentDrodown).toBe('string');
        expect(typeof validTheme.secondary).toBe('string');
        expect(typeof validTheme.error).toBe('string');
        expect(typeof validTheme.background).toBe('string');
        expect(typeof validTheme.text).toBe('string');
        expect(typeof validTheme.contextText).toBe('string');
        expect(['light', 'dark']).toContain(validTheme.mode);
        expect(typeof validTheme.documentContainer).toBe('string');
        expect(typeof validTheme.success).toBe('string');
    });
});
