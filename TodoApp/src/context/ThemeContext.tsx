import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from '../constants/colors';
import { ThemeColors } from 'src/types/themeColorType';


export type ThemePreference = 'light' | 'dark' | 'sist' | null;

interface ThemeContextType {
    currentColors: ThemeColors;
    configTheme: ThemePreference;
    setConfigTheme: (value: ThemePreference) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentColors, setCurrentColorsState] = useState<ThemeColors>(() => {
        const initialScheme = Appearance.getColorScheme();
        return initialScheme === 'dark' ? darkColors : lightColors;
    });

    const [configTheme, setconfigThemeState] = useState<ThemePreference>(null);

    const setConfigTheme = async (value: ThemePreference) => {
        if (value) await AsyncStorage.setItem('configTheme', value);
        setconfigThemeState(value);
    };

    const getConfigTheme = async () => {
        const resp = await AsyncStorage.getItem('configTheme');
        setconfigThemeState(resp as ThemePreference);
    };

    useEffect(() => {
        getConfigTheme();
    }, []);

    useEffect(() => {
        let listener: { remove: () => void } | null = null;

        switch (configTheme) {
            case 'dark':
                setCurrentColorsState(darkColors);
                break;
            case 'light':
                setCurrentColorsState(lightColors);
                break;
            case 'sist':
            default:
                const initialScheme: ColorSchemeName = Appearance.getColorScheme();
                setCurrentColorsState(initialScheme === 'dark' ? darkColors : lightColors);

                listener = Appearance.addChangeListener(({ colorScheme }) => {
                    setCurrentColorsState(colorScheme === 'dark' ? darkColors : lightColors);
                });
                break;
        }

        return () => {
            if (listener) listener.remove();
        };
    }, [configTheme]);

    return (
        <ThemeContext.Provider value={{ currentColors, configTheme, setConfigTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};

export default ThemeContext;
