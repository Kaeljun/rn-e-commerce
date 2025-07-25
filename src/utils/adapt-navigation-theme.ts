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
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(
  { ...MD3LightTheme, colors: lightColors },
  LightTheme,
);

export const CombinedDarkTheme = merge(
  { ...MD3DarkTheme, colors: darkColors },
  DarkTheme,
);
