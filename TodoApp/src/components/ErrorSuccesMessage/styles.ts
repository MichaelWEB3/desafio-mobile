import { ThemeColors } from '@/types/themeColorType';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: ThemeColors, type: 'error' | 'success' = 'error') =>
    StyleSheet.create({
        container: {
            backgroundColor:
                type === 'error'
                    ? colors.error ?? '#f44336'
                    : colors.success ?? '#4CAF50',
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
            alignSelf: 'center',
            maxWidth: '90%',
        },
        text: {
            color: colors.text,
            textAlign: 'center',
            fontWeight: 'bold',
        },
    });
