import {
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import { darkColors, lightColors } from '../themes/colors';

export const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
  materialDark: {
    ...MD3DarkTheme,
    colors: darkColors,
  },
  materialLight: {
    ...MD3LightTheme,
    colors: lightColors,
  },
});
