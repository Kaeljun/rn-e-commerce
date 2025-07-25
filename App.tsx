import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  DefaultTheme,
  PaperProvider,
  Provider,
  MD3DarkTheme,
  MD3LightTheme,
  ThemeProvider,
} from 'react-native-paper';
import { Routes } from './src/routes/routes';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './src/utils/adapt-navigation-theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider
      theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      <Routes />
    </PaperProvider>
  );
}

export default App;
