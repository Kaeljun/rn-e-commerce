import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Routes from './src/routes/routes';
import { DarkTheme, LightTheme } from './src/utils/adapt-navigation-theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Routes />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
