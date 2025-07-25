import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export function ShoppingCart() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Carrinho</Text>
      <Button onPress={() => navigation.goBack()}>Voltar</Button>
    </View>
  );
}
