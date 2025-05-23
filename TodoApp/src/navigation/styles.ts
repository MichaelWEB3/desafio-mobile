import { ThemeColors } from '@/types/themeColorType';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: ThemeColors) => StyleSheet.create({
    consentSafeArea: {
        flex: 1,
        backgroundColor:colors.primary,
    },
});




