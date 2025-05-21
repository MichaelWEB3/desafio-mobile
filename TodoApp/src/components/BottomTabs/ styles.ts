import { StyleSheet } from 'react-native';
import { ThemeColors } from 'src/types/themeColorType';
import styled from 'styled-components/native';

export const getStyles = (colors: ThemeColors) => StyleSheet.create({
    tabBar: {
        height: 70,
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        elevation: colors.mode === 'light' ? 5 : 0,
        borderTopWidth: 0,
        borderTopColor: 'transparent',

        paddingHorizontal: 20,

        shadowColor: colors.mode === 'light' ? '#000000' : 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
    },
    addButton: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: colors.mode === 'light' ? 5 : 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


