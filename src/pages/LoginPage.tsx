import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import { useLoginMutation } from '../services/api.service';
import { useNavigation } from '@react-navigation/native';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useLoginMutation();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  console.log(result?.error);
  return (
    <View style={styles.container}>
      <Text>Entrar</Text>
      <TextInput
        value={email}
        onChange={e => setEmail(e.nativeEvent.text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        secureTextEntry
        value={password}
        onChange={e => setPassword(e.nativeEvent.text)}
        autoCapitalize="none"
      />
      <Button
        onPress={() => login({ email, password }).then(() => showDialog())}
        disabled={result.isLoading}
        mode="contained-tonal"
      >
        {result.isLoading ? <ActivityIndicator /> : 'Entrar'}
      </Button>
      <Text>Não tem uma conta?</Text>
      <Button onPress={() => navigation.navigate('Cadastrar')} mode="outlined">
        Criar conta
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alerta</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{result?.error?.data?.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 10,
    justifyContent: 'center',
    flex: 1,
  },
});
