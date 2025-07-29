import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useLoginMutation } from '../services/api.service';

export const LoginPage = () => {
  const [email, setEmail] = useState('felipe@email.com');
  const [password, setPassword] = useState('abcdef');
  const [login, result] = useLoginMutation();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Login Page</Text>
      <TextInput value={email} onChange={e => setEmail(e.nativeEvent.text)} />
      <TextInput
        secureTextEntry
        value={password}
        onChange={e => setPassword(e.nativeEvent.text)}
      />
      <Button onPress={() => login({ email, password })}>Entrar</Button>
    </View>
  );
};
