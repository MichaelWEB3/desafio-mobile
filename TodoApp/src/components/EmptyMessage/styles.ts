import { ThemeColors } from '@/types/themeColorType';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        emptyBox: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
            paddingHorizontal: 24,
        },
        emptyTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
            marginTop: 12,
        },
        emptyMessage: {
            fontSize: 14,
            color: colors.contextText,
            textAlign: 'center',
            marginTop: 8,
            lineHeight: 20,
        },
    });
