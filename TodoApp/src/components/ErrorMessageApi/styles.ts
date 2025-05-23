import { ThemeColors } from '@/types/themeColorType';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary,
            padding: 10
        },
        errorBox: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
        },
        errorTitle: {
            fontSize: 22,
            fontWeight: '700',
            color: '#FF4D4F',
            marginTop: 12,
            marginBottom: 8,
            textAlign: 'center',
        },
        errorMessage: {
            fontSize: 16,
            color: colors.text,
            textAlign: 'center',
            lineHeight: 22,
        },
    });
