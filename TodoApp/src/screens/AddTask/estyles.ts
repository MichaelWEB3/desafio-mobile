import { ThemeColors } from '@/types/themeColorType';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: colors.background,
        },
        label: {
            color: colors.contextText,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        input: {
            color: colors.text,
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginBottom: 10,
            backgroundColor: 'transparent',
        },
        button: {
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 10,
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
        },
        arrowBackButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.secondary + '22',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
            color:colors.contextText,
        },
    });
