import { StatusBar, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Routes } from './src/routes/routes';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './src/utils/adapt-navigation-theme';

import { Provider } from 'react-redux';
import { store } from './src/state/store';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Routes />
      </PaperProvider>
    </Provider>
  );
}

export default App;
