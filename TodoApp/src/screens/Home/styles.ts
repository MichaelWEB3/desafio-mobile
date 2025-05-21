import { StyleSheet } from 'react-native';
import { ThemeColors } from 'src/types/themeColorType';

export const getStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: colors.text,
    },
});




