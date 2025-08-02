import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useLoginMutation } from '../services/api.service';
import { useNavigation } from '@react-navigation/native';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useLoginMutation();
  const navigation = useNavigation();
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
      <Button onPress={() => login({ email, password })}>Entrar</Button>
      <Text>Não tem uma conta?</Text>
      <Button onPress={() => navigation.navigate('Cadastrar')}>
        Criar conta
      </Button>
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
