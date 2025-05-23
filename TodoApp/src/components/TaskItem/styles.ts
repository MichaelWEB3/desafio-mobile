import { ThemeColors } from '@/types/themeColorType';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.primary,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        text: {
            fontSize: 16,
            color: colors.text,
            marginBottom: 12,
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 12,
        },
        iconBtn: {
            backgroundColor: '#EDEDED',
            padding: 10,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
        },
        alertBox: {
            backgroundColor: '#f44336',
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
        },

    });
